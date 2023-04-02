import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { useSnackbar } from "notistack";
import { useStore } from "../../contexts/StoreContext";
import { IProposalEventSearchResource } from "../../types/ProposalEventSearchResource";
import TextFormHeader from "../Text/TextFormHeader";
import TextForm from "../Text/TextForm";
import { IComplainResource } from "../../types/ComplainResource";

interface IComplainFormProps{
    eventId: number;
    eventType: string;
    show: boolean;
    onHide: () => void;
}

const ComplainForm: FC<IComplainFormProps> = (props) => {

    const store = useStore();
    const initialValues = new IComplainResource();
    const { enqueueSnackbar } = useSnackbar()
    
    const createRequestSubmit = async (request: IComplainResource, helpers: FormikHelpers<IComplainResource>) => {

        request.eventId = props.eventId;
        request.eventType = props.eventType;
        //await store.proposalEventStore.addEventRequest(request)
        if(store.proposalEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Request created.", { variant: 'success'})
        } else{
            enqueueSnackbar("Failed to create Request.", { variant: 'error'})
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
                    <TextFormHeader> Complain </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={createRequestSubmit}
                initialValues={initialValues}
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
                            <TextForm> Description: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    type="textarea"
                                    name="comment"
                                    placeholder="Your Request details"
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="comment">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    Submit
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

export default ComplainForm;