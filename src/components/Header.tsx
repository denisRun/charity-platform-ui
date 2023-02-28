import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import LoginForm from './Forms/LoginForm';
import TextLarge from './Text/TextLarge';

interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = (props) => {

  const [loginFormShow, setLoginFormShow] = useState(false);

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
            <Nav.Link as={Link} to="/help"> 

                    Need help
            </Nav.Link>
            <Nav.Link as={Link} to="/propositions"> 
                People`s suggestions
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics"> 
                Statistics
            </Nav.Link>
            <Nav.Link as={Link} to="/about"> 
                About us
            </Nav.Link>
          </Nav>
       </Navbar>
        <Navbar className="justify-content-end">
          {1==1 ? 
            <>
              <Button className="me-3" style={{width:125}}  variant="outline-success" onClick={() => setLoginFormShow(true)}>
                 Login 
              </Button>
              <Button style={{width:125}} variant="success">
                Sign up 
              </Button>
            </> : 
            <TextLarge>denis-polozov</TextLarge>}
          {/*<Navbar.Text>
                Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>*/}
        </Navbar>
      </Container>
      <LoginForm
        show={loginFormShow}
        onHide={() => setLoginFormShow(false)} />
    </Navbar>
  );
};

export default Header;
