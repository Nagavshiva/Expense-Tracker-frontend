import { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import axios from '../../services/api';
import PropTypes from 'prop-types'; 


const AddExpense = ({ onAdd, selectedExpense }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (selectedExpense) {
      setFormData({
        amount: selectedExpense.amount,
        category: selectedExpense.category,
        date: selectedExpense.date.split('T')[0], // Format date for input
        description: selectedExpense.description || '',
      });
    } else {
      setFormData({
        amount: '',
        category: '',
        date: '',
        description: '',
      });
    }
  }, [selectedExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedExpense) {
        response = await axios.put(`/expenses/${selectedExpense._id}`, formData);
      } else {
        response = await axios.post('/expenses', formData);
      }
      onAdd(response.data.expense); // Trigger an update in the parent component
    } catch (error) {
      console.error('Error adding/updating expense:', error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: { xs: 'center', sm: 'left' }, // Center text on small devices
          fontSize: { xs: '1.25rem', sm: '1.5rem' }, // Font size adjustment
        }}
      >
        {selectedExpense ? 'Edit Expense' : 'Add Expense'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Amount"
          name="amount"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.amount}
          onChange={handleChange}
          required
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for small devices
          }}
        />
        <TextField
          label="Category"
          name="category"
          select
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.category}
          onChange={handleChange}
          required
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for small devices
          }}
        >
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Date"
          name="date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for small devices
          }}
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for small devices
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Font size adjustment for small devices
          }}
        >
          {selectedExpense ? 'Update Expense' : 'Add Expense'}
        </Button>
      </form>
    </Container>
  );
};

AddExpense.propTypes = {
  onAdd: PropTypes.func.isRequired,
  selectedExpense: PropTypes.shape({
    _id: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow number or string
    category: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
  }),
};
export default AddExpense;
