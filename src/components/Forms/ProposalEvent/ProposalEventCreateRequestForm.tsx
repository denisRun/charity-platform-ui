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
import { IUserSignupRequest } from "../../../types/UserSignupRequest";
import UserSignupValidation from "../../../validations/UserSignupValidation";
import { useSnackbar } from "notistack";
import { ProposalRequestCreateRequest } from "../../../types/ProposalRequestCreateRequest";

interface ISignupFormProps{
    show: boolean;
    onHide: () => void;
}

const ProposalEventCreateRequest: FC<ISignupFormProps> = (props) => {

    const store = useStore();
    const initialValues = new ProposalRequestCreateRequest();
    const { enqueueSnackbar } = useSnackbar()
    
    const createRequestSubmit = async (request: ProposalRequestCreateRequest, helpers: FormikHelpers<ProposalRequestCreateRequest>) => {

        request.id = store.proposalEventStore.event.id!;
        await store.proposalEventStore.addEventRequest(request)
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
                    <TextFormHeader> Create request </TextFormHeader>
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
                                    name="description"
                                    placeholder="Your Request details"
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="description">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
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

export default ProposalEventCreateRequest;