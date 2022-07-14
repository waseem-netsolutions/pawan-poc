import { useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import { Store } from "../../App";

const pages = [
  {
    name: "Login",
    path: "/login",
  },
  // {
  //   name: "Signup",
  //   path: "/signup",
  // },
];

const Header = () => {
  const [time, settime] = useState(new Date().toLocaleString());
  const { userData } = useContext(Store);
  let userId = userData?.uid;

  useEffect(() => {
    const timer = setInterval(() => {
      settime(new Date().toLocaleString());   
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function logout() {
    auth.signOut();
  }

  function NavLinks() {
    if (userId) {
      return (
        <>
          <Box sx={{ flexGrow: 3, display: { xs: "none", md: "flex" } }}>
            <NavLink className='nav_link' to='/dashboard'>Dashboard</NavLink>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} onClick={logout}>Logout</Box>
        </>
      );
    } else {
      return (
        <Box sx={{ flexGrow: 3, display: { xs: "none", md: "flex" } }}>
          {pages.map((page, index) => (
            <NavLink key={index} className='nav_link' to={page.path}>
              {page.name}
            </NavLink>
          ))}
        </Box>
      );
    }
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <NavLink to='/' className='nav_link'>
              LOGO
            </NavLink>
          </Typography>
          <NavLinks />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {time}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
