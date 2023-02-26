import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/logo.svg';
import TextLarge from './Text/TextLarge';

interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = (props) => {


  return (
    <Navbar className="ms-2 me-2" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
            <img src={logo} style={{ width: 150, height:30 }} />
        </Navbar.Brand>
        <Navbar>
          <Nav
            className="justify-content-center"
            style={{ maxHeight: '50px' }}
          >
            <Nav.Link href="#action1"> 
                    Need help
            </Nav.Link>
            <Nav.Link href="#action2"> 
                People`s suggestions
            </Nav.Link>
            <Nav.Link href="#action3"> 
                Statistics
            </Nav.Link>
            <Nav.Link href="#action4"> 
                About us
            </Nav.Link>
          </Nav>
       </Navbar>
        <Navbar className="justify-content-end">
          <Button variant="outline-success">Search</Button>
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
