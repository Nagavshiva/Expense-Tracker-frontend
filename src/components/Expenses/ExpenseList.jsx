import PropTypes from 'prop-types';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpenseList = ({ expenses, onDelete, onEdit, selectedCategory }) => {
  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <Container
      sx={{
        padding: {
          xs: 1, // Padding for small devices
          sm: 2, // Padding for medium devices
          md: 3, // Padding for large devices
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: {
            xs: 'center', // Center align for small devices
            sm: 'left', // Left align for medium and larger devices
          },
          fontSize: {
            xs: '1.25rem', // Smaller font size for small devices
            sm: '1.5rem',  // Medium font size for medium devices
            md: '1.75rem', // Larger font size for large devices
          },
        }}
      >
        Expenses
      </Typography>
      <Table
        sx={{
          minWidth: {
            xs: 300, // Minimum width for small devices
            sm: 500, // Minimum width for medium devices
            md: 700, // Minimum width for large devices
          },
          '& th, & td': {
            padding: {
              xs: 0.5, // Smaller padding for small devices
              sm: 1,   // Medium padding for medium devices
              md: 1.5, // Larger padding for large devices
            },
            fontSize: {
              xs: '0.75rem', // Smaller font size for small devices
              sm: '0.875rem', // Medium font size for medium devices
              md: '1rem', // Larger font size for large devices
            },
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(expense)} // Trigger edit mode
                  sx={{
                    fontSize: {
                      xs: '0.7rem', // Smaller icon size for small devices
                      sm: '0.875rem', // Medium icon size for medium devices
                      md: '1rem', // Larger icon size for large devices
                    },
                    padding: {
                      xs: 0.5, // Smaller padding for small devices
                      sm: 1,   // Medium padding for medium devices
                      md: 1.5, // Larger padding for large devices
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => onDelete(expense._id)}
                  sx={{
                    fontSize: {
                      xs: '0.7rem', // Smaller icon size for small devices
                      sm: '0.875rem', // Medium icon size for medium devices
                      md: '1rem', // Larger icon size for large devices
                    },
                    padding: {
                      xs: 0.5, // Smaller padding for small devices
                      sm: 1,   // Medium padding for medium devices
                      md: 1.5, // Larger padding for large devices
                    },
                    marginLeft: '0.5rem',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired, // Add prop type for selectedCategory
};

export default ExpenseList;
