import { Badge } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import logo from '../images/logo.svg';
import LoginForm from './Forms/User/LoginForm';
import SignupForm from './Forms/User/SignupForm';
import TextLarge from './Text/TextLarge';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsForm from './Forms/User/NotificationsForm';
import { useSnackbar } from 'notistack';

interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = observer((props) => {

  const [loginFormShow, setLoginFormShow] = useState(false);
  const [signupFormShow, setSignupFormShow] = useState(false);
  const [notificationsShow, setNotificationsShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const store = useStore();

  const handleLogout = async () => {

    await store.userStore.logout()
    if(store.userStore.user == null){
        enqueueSnackbar("You are logged out.", { variant: 'success'})
    } else {
        enqueueSnackbar("Failed to logout.", { variant: 'error'})
    }
  };

  const handleChangePassword = async () => {
    if(store.userStore.user == null){
        enqueueSnackbar("Login first.", { variant: 'error'})
    } else {

        await store.userStore.changePassword()
        if(store.userStore.isError){
          enqueueSnackbar("Failed to send email.", { variant: 'error'})
        } else {
          enqueueSnackbar("Email has been send.", { variant: 'success'})
        }
    }
  };

  const handleOpenProfile = async () => {

    if(store.userStore.user == null){
        enqueueSnackbar("Login first.", { variant: 'error'})
    } else {
        navigate("/profile")
    }
  };
  
  return (
    <Navbar className="ms-4 me-4" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
            <img src={logo} style={{ width: 150, height:30 }} />
        </Navbar.Brand>
        <Navbar>
          <Nav
            className="justify-content-center"
            style={{ maxHeight: '50px' }}
          >
            <NavLink className="nav-link" to="/help"> 
                Need help
            </NavLink>
            <NavLink className="nav-link" to="/propositions"> 
                People`s suggestions
            </NavLink>
            <NavLink className="nav-link" to="/statistics"> 
                Statistics
            </NavLink>
            <NavLink className="nav-link" to="/about"> 
                About us
            </NavLink>
          </Nav>
       </Navbar>
        <Navbar className="justify-content-end">
          {store.userStore.user == null ? 
            <>
              <Button className="me-3" style={{width:125}}  variant="outline-success" onClick={() => setLoginFormShow(true)}>
                 Login 
              </Button>
              <Button style={{width:125}} variant="success" onClick={() => setSignupFormShow(true)}>
                Sign up 
              </Button>
            </> : 
            <div>
              <button type="button" onClick={() => setNotificationsShow(true)} className="btn fs-5">
                <Badge color="primary" className="me-4" variant="dot">
                  <EmailIcon fontSize='large' />
                </Badge>
              </button>
              <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="rounded-circle me-2" style={{width:40, height:40}} alt="Avatar" />
              <div className="btn-group">
                <button type="button" id="userProfileActions" className="btn dropdown-toggle fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">{store.userStore.user.firstName + " " + store.userStore.user.secondName + "   "}</button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="userProfileActions">
                  <li><button className="dropdown-item" type="button" onClick={() => handleOpenProfile()}>Profile</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => handleChangePassword()}>Change password</button></li>
                  <li><button className="dropdown-item" type="button" onClick={() => handleLogout()}>Logout</button></li>
                </ul>
              </div>
            </div>
          }
        </Navbar>
      </Container>
      <LoginForm
        show={loginFormShow}
        onHide={() => setLoginFormShow(false)} />
      <SignupForm 
        show={signupFormShow}
        onHide={() => setSignupFormShow(false)}/>
      <NotificationsForm 
        show={notificationsShow}
        onHide={() => setNotificationsShow(false)}/>
    </Navbar>
  );
});

export default Header;
