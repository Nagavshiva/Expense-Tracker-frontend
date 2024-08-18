import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from '../services/api';
import ExpenseChart from '../components/Expenses/ExpenseChart';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <Container
      sx={{
        padding: {
          xs: 2, // Padding for extra-small devices
          sm: 3, // Padding for small devices
          md: 4, // Padding for medium devices
          lg: 5, // Padding for large devices
        },
        maxWidth: 'lg', // Maximum width to limit container on large screens
      }}
    >
      <Box
        sx={{
          textAlign: {
            xs: 'center', // Center text on small devices
            sm: 'left', // Left align on medium and larger devices
          },
          marginBottom: {
            xs: 2, // Margin bottom for extra-small devices
            sm: 3, // Margin bottom for small devices
            md: 4, // Margin bottom for medium devices
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.5rem', // Font size for extra-small devices
              sm: '2rem', // Font size for small devices
              md: '2.5rem', // Font size for medium devices
              lg: '3rem', // Font size for large devices
            },
          }}
        >
          Dashboard
        </Typography>
      </Box>
      <ExpenseChart expenses={expenses} />
    </Container>
  );
};

export default Dashboard;
