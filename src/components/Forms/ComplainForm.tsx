import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { useSnackbar } from "notistack";
import { useStore } from "../../contexts/StoreContext";
import { IProposalEventSearchResource } from "../../types/ProposalEvent/ProposalEventSearchResource";
import TextFormHeader from "../Text/TextFormHeader";
import TextForm from "../Text/TextForm";
import { useTranslation } from "react-i18next";
import { IComplainCreateResource } from "../../types/ComplainCreateResource";
import { EventTypeEnum } from "../../types/enums/EventTypeEnum";

interface IComplainFormProps{
    eventId: number;
    eventType: string;
    show: boolean;
    onHide: () => void;
}

const ComplainForm: FC<IComplainFormProps> = (props) => {

    const store = useStore();
    const initialValues = new IComplainCreateResource();
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();
    
    const createRequestSubmit = async (request: IComplainCreateResource, helpers: FormikHelpers<IComplainCreateResource>) => {

        request.eventId = props.eventId;
        request.eventType = props.eventType;
        if(request.eventType == EventTypeEnum.proposal){
            await store.proposalEventStore.createComplaint(request);
        } else {
            await store.helpEventStore.createComplaint(request);
        }
        if(store.proposalEventStore.isError == false && store.helpEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Complaint created.", { variant: 'success'})
        } else{
            enqueueSnackbar("Failed to create Complaint.", { variant: 'error'})
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
                    <TextFormHeader> {t('Complain')} </TextFormHeader>
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
                            <TextForm> {t('Description')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    type="textarea"
                                    name="description"
                                    placeholder={t("Description")!}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="description">{msg => <div className="error-color ps-0">{t(msg)}</div>}</ErrorMessage>
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    {t('Submit')}
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