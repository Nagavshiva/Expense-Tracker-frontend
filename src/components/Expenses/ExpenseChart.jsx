import PropTypes from 'prop-types';
import { Container, Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const ExpenseChart = ({ expenses }) => {
  const categories = ['Food', 'Transport', 'Entertainment', 'Other'];
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categories.map(
          (category) =>
            expenses
              .filter((expense) => expense.category === category)
              .reduce((acc, curr) => acc + curr.amount, 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Expenses by Category
      </Typography>
      <Box
        sx={{
          maxWidth: {
            xs: '100%', 
            sm: '80%',  
            md: '60%',  
            lg: '50%',  
          },
          margin: '0 auto', 
        }}
      >
        <Pie data={data} />
      </Box>
    </Container>
  );
};

ExpenseChart.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default ExpenseChart;
