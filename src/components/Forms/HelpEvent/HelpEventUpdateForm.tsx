import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../contexts/StoreContext';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../images/logo.svg';
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import TextFormHeader from "../../Text/TextFormHeader";
import TextForm from "../../Text/TextForm";
import { useSnackbar } from "notistack";
import { IHelpEventCreateResource } from "../../../types/HelpEvent/HelpEventCreateResource";
import fileToBytes from "../../../Helpers/FileToBytes";
import HelpEventBasicValidation from "../../../validations/HelpEventBasicValidation";
import { HelpEventStatusEnum } from "../../../types/enums/HelpEventStatusEnum";
import { useTranslation } from "react-i18next";

interface IHelpEventUpdateFormProps{
    show: boolean;
    item?: IHelpEventCreateResource;
    onHide: () => void;
}

const HelpEventUpdateForm: FC<IHelpEventUpdateFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [attachedFile, setAttachedFile] = useState<File>();

    const initialValues = props.item!;

    const helpEventSubmit = async (event: IHelpEventCreateResource, helpers: FormikHelpers<IHelpEventCreateResource>) => {

        if(attachedFile != null){
            event.fileBytes = await fileToBytes(attachedFile);
            event.fileType = attachedFile?.name.split(".")[1];
        }        

        await store.helpEventStore.updateEvent(event);

        if(store.helpEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Request updated", { variant: 'success'})
        } else {
            enqueueSnackbar("Failed to update request", { variant: 'error'})
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
                    <TextFormHeader> {t('Update Help Request')} </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={helpEventSubmit}
                initialValues={initialValues}
                validationSchema={HelpEventBasicValidation}
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
                                    placeholder={t("Title")!}
                                    value={values.title}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="title">{msg => <div className="error-color ps-0">{msg}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> {t('Description')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    type="textarea"
                                    name="description"
                                    placeholder={t("Description")!}
                                    value={values.description}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="description">{msg => <div className="error-color ps-0">{t(msg)}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> {t('Status')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Select
                                    as="select" 
                                    name="status"
                                    placeholder={t("Status")!}
                                    value={values.status}
                                    onChange={handleChange}
                            >
                                <option key={HelpEventStatusEnum.active} value={HelpEventStatusEnum.active}>{t('Active')}</option>
                                <option key={HelpEventStatusEnum.inactive} value={HelpEventStatusEnum.inactive}>{t('Inactive')}</option>
                                <option key={HelpEventStatusEnum.done} value={HelpEventStatusEnum.done}>{t('Done')}</option>
                            </Form.Select>
                            <ErrorMessage name="status">{msg => <div className="error-color ps-0">{t(msg)}</div>}</ErrorMessage>
                        </Row>
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> {t('Request image')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <input type="file" accept="image/jpeg, image/png" className="form-control" onChange={(e) => setAttachedFile(e.target.files![0])} />
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    {t('Update')}
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

export default HelpEventUpdateForm;