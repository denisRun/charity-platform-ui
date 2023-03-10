import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import logo from '../images/logo.svg';
import LoginForm from './Forms/User/LoginForm';
import SignupForm from './Forms/User/SignupForm';
import TextLarge from './Text/TextLarge';

interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = observer((props) => {

  const [loginFormShow, setLoginFormShow] = useState(false);
  const [signupFormShow, setSignupFormShow] = useState(false);
  const store = useStore();
  
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
            <TextLarge>{store.userStore.user.firstName + " " + store.userStore.user.secondName}</TextLarge>}
          {/*<Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>*/}
        </Navbar>
      </Container>
      <LoginForm
        show={loginFormShow}
        onHide={() => setLoginFormShow(false)} />
      <SignupForm 
        show={signupFormShow}
        onHide={() => setSignupFormShow(false)}/>
    </Navbar>
  );
});

export default Header;
