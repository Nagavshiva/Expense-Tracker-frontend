import { useState } from 'react';
import { TextField, Button, Container, Typography, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', formData);
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
   Don&apos;t have an account?
        <MuiLink component={Link} to="/register" color="primary">
          Register here
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default Login;
