import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

interface ILoginFormProps{
    show: boolean;
    onHide: () => void;
}

const LoginForm: FC<ILoginFormProps> = (props) => {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            alert("logged in")
        }

        setValidated(true);
      };

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="mt-5" style={{ paddingLeft: "35%" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <img src={logo} style={{ width: 200, height: 40 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Container fluid>
                        <Row className="justify-content-md-center ms-3 me-3 mt-3">
                            <Form.Control
                                id="login-username"
                                placeholder="Username"
                                required
                            />
                                <Form.Control.Feedback type="invalid">
                                    Enter your username or email
                                </Form.Control.Feedback>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4">
                            <Form.Control
                                id="login-password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                                <Form.Control.Feedback type="invalid">
                                    Enter password
                                </Form.Control.Feedback>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4">
                            <a onClick={() => alert("link has been send on email")} className="link-secondary">
                                Reset password
                            </a>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-5">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    Login
                                </Button>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginForm;