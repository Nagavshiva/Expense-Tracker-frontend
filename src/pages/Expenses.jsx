import { useState, useEffect } from 'react';
import { IconButton, Button, Modal, Box, TextField, MenuItem } from '@mui/material';
import AddExpense from '../components/Expenses/AddExpense';
import ExpenseList from '../components/Expenses/ExpenseList';
import axios from '../services/api';
import CloseIcon from '@mui/icons-material/Close';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // State to hold the expense being edited
  const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category for filtering

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await axios.get('/expenses');
        setExpenses(data.expenses);
      } catch (error) {
        console.error('Error fetching expenses:', error.response.data.message);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = (newExpense) => {
    if (selectedExpense) {
      // If updating an existing expense
      setExpenses(
        expenses.map((expense) => (expense._id === newExpense._id ? newExpense : expense))
      );
    } else {
      // If adding a new expense
      setExpenses([newExpense, ...expenses]);
    }
    handleClose();
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error.response.data.message);
    }
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedExpense(null); // Reset selected expense when closing the modal
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div style={{ marginTop: '5rem', position: 'relative' }}>
      <TextField
        label="Filter by Category"
        select
        variant="outlined"
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{
          pl: 1,
          mb: 2, 
          width: { xs: '100%', sm: '30%' }, 
        }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Food">Food</MenuItem>
        <MenuItem value="Transport">Transport</MenuItem>
        <MenuItem value="Entertainment">Entertainment</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>

      <Button
  variant="contained"
  color="primary"
  onClick={handleOpen}
  sx={{
    position: 'fixed',
    top: { xs: 60, sm: 70 },  
    right: { xs: 10, sm: 20 }, 
    fontSize: { xs: '0.75rem', sm: '1rem' },
  }}
>
  Add Expense
</Button>


      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 }, 
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AddExpense onAdd={handleAddExpense} selectedExpense={selectedExpense} />
        </Box>
      </Modal>

      <ExpenseList
        expenses={expenses}
        selectedCategory={selectedCategory} 
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense} 
      />
    </div>
  );
};

export default Expenses;
