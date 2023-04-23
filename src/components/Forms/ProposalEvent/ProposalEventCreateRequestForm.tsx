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
import { ProposalRequestCreateRequest } from "../../../types/ProposalEvent/ProposalRequestCreateRequest";
import { useTranslation } from "react-i18next";

interface IRequestFormProps{
    show: boolean;
    onHide: () => void;
}

const ProposalEventCreateRequestForm: FC<IRequestFormProps> = (props) => {

    const store = useStore();
    const { t } = useTranslation();
    const initialValues = new ProposalRequestCreateRequest();
    const { enqueueSnackbar } = useSnackbar()
    
    const createRequestSubmit = async (request: ProposalRequestCreateRequest, helpers: FormikHelpers<ProposalRequestCreateRequest>) => {

        request.id = store.proposalEventStore.event.id!;
        await store.proposalEventStore.addEventRequest(request)
        if(store.proposalEventStore.isError == false){
            props.onHide();
            enqueueSnackbar(t("Request created"), { variant: 'success'})
        } else{
            enqueueSnackbar(t("Failed to create Request"), { variant: 'error'})
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
                    <TextFormHeader> {t('Create request')} </TextFormHeader>
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
                                    name="comment"
                                    placeholder={t("Description")!}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="comment">{msg => <div className="error-color ps-0">{t(msg)}</div>}</ErrorMessage>
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

export default ProposalEventCreateRequestForm;