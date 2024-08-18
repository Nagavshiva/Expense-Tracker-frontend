import Navbar from './components/Layout/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Layout/PrivateRoute';
import Expenses from './pages/Expenses';
import Placeholder from './components/Layout/Placeholder'; // Import Placeholder

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Expenses />
              </PrivateRoute>
            }
          />
          <Route path="/expensesChart" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Placeholder />} /> {/* Handle unknown routes */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
