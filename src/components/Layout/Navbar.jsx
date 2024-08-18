import  { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
     
        <Typography
          variant="h6"
           component={Link} // Make the title a clickable link
          to="/"
          sx={{
            flexGrow: 1,
            textAlign: {
              xs: "center", // Small devices
              sm: "left", // Medium and larger devices
            },
            marginBottom: {
              xs: 1, // Adds margin at the bottom for small devices
              sm: 0, // No margin for medium and larger devices
            },
            textDecoration: "none", 
            color: "inherit", 
            cursor: "pointer",
          }}
          
        >
            
          Expense Tracker

        </Typography>
     

        {/* Menu Icon for Small Devices */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{
            display: { xs: "block", sm: "none" }, // Show only on small devices
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Right-side Items for Medium and Larger Devices */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on small devices
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button color="inherit" component={Link} to="/">
            Expenses
          </Button>
          <Button color="inherit" component={Link} to="/expensesChart">
            Dashboard
          </Button>
          {localStorage.getItem("authToken") ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>

        {/* Drawer for Small Devices */}
        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={toggleMenu}
          sx={{
            "& .MuiDrawer-paper": {
              width: "250px",
              padding: "10px",
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "10px",
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              aria-label="close"
              onClick={toggleMenu}
              sx={{
                alignSelf: "flex-end",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Button color="inherit" component={Link} to="/" onClick={toggleMenu} sx={{ width: "100%" }}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/expenses" onClick={toggleMenu} sx={{ width: "100%" }}>
              Expenses
            </Button>
            {localStorage.getItem("authToken") ? (
              <Button color="inherit" onClick={() => { handleLogout(); toggleMenu(); }} sx={{ width: "100%" }}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" onClick={toggleMenu} sx={{ width: "100%" }}>
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register" onClick={toggleMenu} sx={{ width: "100%" }}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
