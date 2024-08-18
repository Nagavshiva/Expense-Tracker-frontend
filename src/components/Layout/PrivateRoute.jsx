import Placeholder from './Placeholder';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  
  return authToken ? children : <Placeholder />;
};

export default PrivateRoute;



