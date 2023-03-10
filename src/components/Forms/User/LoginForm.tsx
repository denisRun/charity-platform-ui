import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../contexts/StoreContext';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import logo from '../../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { IUserLogin } from "../../../types/UserLogin";
import UserLoginValidation from "../../../validations/UserLoginValidatioin";

interface ILoginFormProps{
    show: boolean;
    onHide: () => void;
}

const LoginForm: FC<ILoginFormProps> = (props) => {

    const store = useStore();
    const initialValues = new IUserLogin();

    const loginSubmit = async (credentials: IUserLogin, helpers: FormikHelpers<IUserLogin>) => {

        await store.userStore.login(credentials)
        if(store.userStore.user != null && store.userStore.isError == false){
            props.onHide();
            console.log(store.userStore.user)
        }
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
            <Formik
                //validationSchema={schema}
                onSubmit={loginSubmit}
                initialValues={initialValues}
                validationSchema={UserLoginValidation}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Container fluid>
                        <Row className="justify-content-md-center ms-3 me-3 mt-3">
                            <Form.Control
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                required
                            />
                                <ErrorMessage name="email">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                required
                            />
                                <ErrorMessage name="password">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
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
                )}
            </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default LoginForm;