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
import { IProposalEventBasic } from "../../../types/ProposalEventBasic";
import { useSnackbar } from "notistack";
import ProposalEventBasicValidation from "../../../validations/ProposalEventBasicValidation";

interface IProposalEventBasicFormProps{
    show: boolean;
    isCreate: boolean;
    onHide: () => void;
}

const ProposalEventBasicForm: FC<IProposalEventBasicFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const initialValues = new IProposalEventBasic();

    const proposalEventSubmit = async (proposalEvent: IProposalEventBasic, helpers: FormikHelpers<IProposalEventBasic>) => {

        await store.proposalEventStore.createEvent(proposalEvent);
        console.log(proposalEvent);
        if(store.proposalEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Suggestion created.", { variant: 'success'})
        } else {
            enqueueSnackbar("Failed to create suggestion.", { variant: 'error'})
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
                    <TextFormHeader> {props.isCreate == true ? "Create Suggestion" : "Update Suggestion"} </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={proposalEventSubmit}
                initialValues={initialValues}
                validationSchema={ProposalEventBasicValidation}
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
                            <TextForm> Title: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    name="title"
                                    placeholder="Title"
                                    value={values.title}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="title">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> Description: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    type="textarea"
                                    name="description"
                                    placeholder="Description"
                                    value={values.description}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="description">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> Maximum active requests: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    name="maxConcurrentRequests"
                                    placeholder="Not more than 2"
                                    type="number"
                                    value={values.maxConcurrentRequests}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="maxConcurrentRequests">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mt-4 mb-2">
                            <TextForm> Location: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="location.region"
                                    placeholder="Region"
                                    value={values.location?.region}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="location.region">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="location.city"
                                    placeholder="City"
                                    value={values.location?.city}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="location.city">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="ms-3 me-3 mt-3">
                            <Col className="ps-0">
                                <Form.Control
                                    name="location.district"
                                    placeholder="District"
                                    value={values.location?.district}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="location.district">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                            <Col className="pe-0">
                                <Form.Control
                                    name="location.homeLocation"
                                    placeholder="Street"
                                    value={values.location?.homeLocation}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="location.homeLocation">{msg => <div className="error-color">{msg}</div>}</ErrorMessage>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    {props.isCreate == true ? "Submit" : "Update"}
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

export default ProposalEventBasicForm;