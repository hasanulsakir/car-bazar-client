import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './Header.css'

const Header = () => {
    const { user, logOut } = useAuth();
    const active = {
        color: "#000",
    }
    return (
        <>
  <Navbar collapseOnSelect expand="lg" className="navBg" sticky="top" variant="dark">
    <Container>
    <Navbar.Brand as={NavLink} to="/">Artistic Glow</Navbar.Brand>
     <Navbar.Toggle/>
     <Navbar.Collapse className="justify-content-end">
       <Nav.Link as={NavLink} exact to="/home" activeStyle={active} className="navMenu">  Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/product" activeStyle={active} className="navMenu">  Product
              </Nav.Link>
       <Nav.Link as={NavLink} to="/aboutus" activeStyle={active} className="navMenu">  About Us
              </Nav.Link>
       <Nav.Link as={NavLink} to="/contactus" activeStyle={active} className="navMenu">  Contact Us
              </Nav.Link>
       
              {
                user.email &&
                 <Nav.Link as={NavLink} to="/dashboard" activeStyle={active} className="navMenu">  Dashboard
      </Nav.Link>
              }
       
      
                        
<Navbar.Text>

                            {user.email && <span> Hello, {user.displayName}                           
                            </span>}
                            {user.email &&<span> <img src={user.photoURL || `https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png`} className=" mx-3 img-fluid rounded-circle" height="35px" width="35px" alt="thumb" />
                               
                                </span>
                            }
                            {user.email ?
                <Button className="navButton" onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt}/> Log out</Button>
                  :  <Nav.Link as={NavLink} to="/login">  <Button  className="navButton"> <FontAwesomeIcon className="mx-2" icon={faSignInAlt}></FontAwesomeIcon> Login  </Button>
                        </Nav.Link>
                  
    } 
       
      </Navbar.Text>



    </Navbar.Collapse>
    </Container>
            </Navbar>
            </>
    );
};

export default Header;