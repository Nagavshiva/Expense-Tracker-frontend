import { useState } from 'react';
import { TextField, Button, Container, Typography, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const { data } = await axios.post('/auth/register', formData);
      localStorage.setItem('authToken', data.token);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <Button type="submit" variant="contained" color="primary" fullWidth>Register</Button>
      </form>
      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <MuiLink component={Link} to="/login" color="primary">
          Login here
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default Register;
