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
          xs: 1, 
          sm: 2,
          md: 3, 
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: {
            xs: 'center', 
            sm: 'left', 
          },
          fontSize: {
            xs: '1.25rem', 
            sm: '1.5rem',  
            md: '1.75rem', 
          },
        }}
      >
        Expenses
      </Typography>
      <Table
        sx={{
          minWidth: {
            xs: 300, 
            sm: 500, 
            md: 700, 
          },
          '& th, & td': {
            padding: {
              xs: 0.5, 
              sm: 1,   
              md: 1.5,
            },
            fontSize: {
              xs: '0.75rem', 
              sm: '0.875rem', 
              md: '1rem', 
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
                      xs: '0.7rem', 
                      sm: '0.875rem', 
                      md: '1rem', 
                    },
                    padding: {
                      xs: 0.5, 
                      sm: 1,   
                      md: 1.5, 
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
                      xs: '0.7rem', 
                      sm: '0.875rem', 
                      md: '1rem', 
                    },
                    padding: {
                      xs: 0.5, 
                      sm: 1,  
                      md: 1.5, 
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
  selectedCategory: PropTypes.string.isRequired, 
};

export default ExpenseList;
