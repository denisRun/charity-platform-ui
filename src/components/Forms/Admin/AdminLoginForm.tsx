import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../contexts/StoreContext';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import logo from '../../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { IUserLoginRequest } from "../../../types/UserLoginRequest";
import UserLoginValidation from "../../../validations/UserLoginValidatioin";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

interface ILoginFormProps{
    show: boolean;
    onHide: () => void;
}

const AdminLoginForm: FC<ILoginFormProps> = (props) => {

    const store = useStore();
    const initialValues = new IUserLoginRequest();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();

    const loginSubmit = async (credentials: IUserLoginRequest, helpers: FormikHelpers<IUserLoginRequest>) => {

        await store.adminStore.login(credentials)
        if(store.adminStore.user != null && store.adminStore.isError == false){
            props.onHide();
            enqueueSnackbar(t("Login succeed"), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to Login"), { variant: 'error'})
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
                    <h5 className="ms-4 fw-bold">Admin Console</h5>
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
                                placeholder={t("Email")!}
                                value={values.email}
                                onChange={handleChange}
                                required
                            />
                                <ErrorMessage name="email">{msg => <div className="error-color">{t(msg)}</div>}</ErrorMessage>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder={t("Password")!}
                                value={values.password}
                                onChange={handleChange}
                                required
                            />
                                <ErrorMessage name="password">{msg => <div className="error-color">{t(msg)}</div>}</ErrorMessage>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-5">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    {t('Login')}
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

export default AdminLoginForm;