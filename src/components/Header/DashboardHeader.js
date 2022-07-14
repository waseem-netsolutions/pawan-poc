import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";


const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name:'Map',
    path:'/dashboard/map'

  },
  {
    name:'groupCall',
    path:'/dashboard/groupCall'

  },
  {
    path:'/dashboard/calander',
    name:'calander'
  },

  {
    path:'/dashboard/oneToone',
    name:'oneToone'
  },
  
  {
    path:'/dashboard/ChatVersionTwo',
    name:'ChatVersionTwo'
  }
  
];
  
  
  const DashboardHeaderHeader = () => {
    let navigate = useNavigate();

    function logout(){
      auth.signOut()
      navigate('/')

}
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/" className="nav_link">
              LOGO
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 6, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link key={index} className="nav_link" to={page.path}>
                {page.name}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} onClick={logout}>
            
            Logout
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default DashboardHeaderHeader;
