import { useState, useEffect } from 'react';
import { IconButton, Button, Modal, Box, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddExpense from '../components/Expenses/AddExpense';
import ExpenseList from '../components/Expenses/ExpenseList';
import axios from '../services/api';
import CloseIcon from '@mui/icons-material/Close';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [sortCriteria, setSortCriteria] = useState('date'); 

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

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const exportCSV = () => {
    const csvRows = [];
    const headers = ['Date', 'Category', 'Amount', 'Description'];
    csvRows.push(headers.join(',')); // Add headers to the CSV

    // Loop through expenses and create rows for each expense
    expenses.forEach((expense) => {
      const row = [
        new Date(expense.date).toLocaleDateString(),
        expense.category,
        expense.amount,
        expense.description || '', // Handle empty description
      ];
      csvRows.push(row.join(',')); // Add rows to the CSV
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expenses.csv');
    a.click();
  };

  // Sort expenses based on the selected criteria
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortCriteria === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria === 'amount') {
      return b.amount - a.amount;
    } else if (sortCriteria === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div style={{ marginTop: '5rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <TextField
          label="Filter by Category"
          select
          variant="outlined"
          value={selectedCategory}
          onChange={handleCategoryChange}
          sx={{
            width: { xs: '100%', sm: '30%' }, 
            ml:2
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <FormControl sx={{ width: { xs: '100%', sm: '30%' },pr:2 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortCriteria}
            onChange={handleSortChange}
            label="Sort by"
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="category">Category</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
            ml:2
          }}
        >
          Add Expense
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={exportCSV}
          sx={{
            fontSize: { xs: '0.75rem', sm: '1rem' },
            mr:2
          }}
        >
          Export CSV
        </Button>
      </Box>

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
        expenses={sortedExpenses}
        selectedCategory={selectedCategory} // Pass the selected category to ExpenseList
        onDelete={handleDeleteExpense}
        onEdit={handleEditExpense} // Pass the handleEditExpense function
      />
    </div>
  );
};

export default Expenses;
