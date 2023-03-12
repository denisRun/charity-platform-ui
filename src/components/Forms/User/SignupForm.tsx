import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../contexts/StoreContext';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import TextLarge from "../../Text/TextLarge";
import TextFormHeader from "../../Text/TextFormHeader";
import TextForm from "../../Text/TextForm";
import { IUserSignup } from "../../../types/UserSignup";
import UserSignupValidation from "../../../validations/UserSignupValidation";
import { useSnackbar } from "notistack";

interface ISignupFormProps{
    show: boolean;
    onHide: () => void;
}

const SignupForm: FC<ISignupFormProps> = (props) => {

    const store = useStore();
    const initialValues = new IUserSignup();
    const { enqueueSnackbar } = useSnackbar()
    
    const signupSubmit = async (credentials: IUserSignup, helpers: FormikHelpers<IUserSignup>) => {

        await store.userStore.signup(credentials);
        console.log(credentials);
        if(store.userStore.isError == false){
            props.onHide();
            enqueueSnackbar("Email has been send.", { variant: 'success'})
        } else{
            enqueueSnackbar("Failed to Sign up.", { variant: 'error'})
        }
      };

    return (
        <Modal
            className="modal-xl"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="mt-3 ms-4 me-4">
                <Modal.Title id="contained-modal-title-vleft">
                    <TextFormHeader> Sign up </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={signupSubmit}
                initialValues={initialValues}
                validationSchema={UserSignupValidation}
                >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Container fluid>
                        <Row className="ms-3 me-3 mb-2">
                            <TextForm> Fullname: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="firstName"
                                    placeholder="First name"
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="firstName">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="secondName"
                                    placeholder="Second name"
                                    value={values.secondName}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="secondName">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> Phone number: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    name="telephone"
                                    placeholder="+380 XX XXX XXXXX"
                                    type="tel"
                                    value={values.telephone}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="telephone">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mt-4 mb-2">
                            <TextForm> Location: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="address.region"
                                    placeholder="Region"
                                    value={values.address?.region}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="address.region">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="address.city"
                                    placeholder="City"
                                    value={values.address?.city}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="address.city">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="ms-3 me-3 mt-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="address.district"
                                    placeholder="District"
                                    value={values.address?.district}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="address.district">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="address.homeLocation"
                                    placeholder="Street"
                                    value={values.address?.homeLocation}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="address.homeLocation">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="ms-3 me-3 mt-4 mb-2">
                            <TextForm> Are you representing a company? </TextForm>
                        </Row>
                        <Row className="ms-3 me-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="companyName"
                                    placeholder="Company name"
                                    value={values.companyName}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="companyName">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="companyLink"
                                    placeholder="https://your-company.com"
                                    value={values.companyLink}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="companyLink">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="ms-3 me-3 mt-4 mb-2">
                            <TextForm> Email and password: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="email">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="password">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    Sign up
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

export default SignupForm;