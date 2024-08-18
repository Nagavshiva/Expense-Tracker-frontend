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
          xs: 2, 
          sm: 3, 
          md: 4, 
          lg: 5, 
        },
        maxWidth: 'lg', 
      }}
    >
      <Box
        sx={{
          textAlign: {
            xs: 'center', 
            sm: 'left', 
          },
          marginBottom: {
            xs: 2, 
            sm: 3, 
            md: 4, 
          },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: '1.5rem', 
              sm: '2rem', 
              md: '2.5rem', 
              lg: '3rem', 
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
