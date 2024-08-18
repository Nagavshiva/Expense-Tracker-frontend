import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Placeholder = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <img src="https://www.actitime.com/wp-content/uploads/2024/03/aT-Blog_-Expenses-Tracker.webp" alt="Access Denied" style={{ maxWidth: '100%', height: 'auto' }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Please log in to access your expenses.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLoginRedirect}
        sx={{ mt: 2 }}
      >
        Go to Login
      </Button>
    </Container>
  );
};

export default Placeholder;
