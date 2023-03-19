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
import { useSnackbar } from "notistack";
import ProposalEventBasicValidation from "../../../validations/ProposalEventBasicValidation";
import { IProposalEventUpdateResource } from "../../../types/ProposalEventUpdateResource";

interface IProposalEventBasicFormProps{
    show: boolean;
    isCreate: boolean;
    item?: IProposalEventUpdateResource;
    onHide: () => void;
}

const ProposalEventBasicForm: FC<IProposalEventBasicFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const [picture, setPicture] = useState<File>();
    const initialValues = props.item ?? new IProposalEventUpdateResource();

    function readFileAsync(file: File) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
      
          reader.onload = () => {
            resolve(reader.result);
          };
      
          reader.onerror = reject;
      
          reader.readAsArrayBuffer(file);
        })
      }

    const proposalEventSubmit = async (proposalEvent: IProposalEventUpdateResource, helpers: FormikHelpers<IProposalEventUpdateResource>) => {

        let fileType: string = '';
        let fileByteArray: number[] = []
        if(picture != null){
            const arrayBuffer:number[] = await readFileAsync(picture!) as number[];
            const array = new Uint8Array(arrayBuffer);
            fileByteArray = Array.from(array);
            fileType = picture?.name.split(".")[1];
            console.log(array);
        }
        
        if(props.isCreate){
            proposalEvent.fileBytes = fileByteArray;
            proposalEvent.fileType = fileType;
            await store.proposalEventStore.createEvent(proposalEvent);

            if(store.proposalEventStore.isError == false){
                props.onHide();
                enqueueSnackbar("Suggestion created.", { variant: 'success'})
            } else {
                enqueueSnackbar("Failed to create suggestion.", { variant: 'error'})
            }
        } else {
            proposalEvent.fileBytes = fileByteArray;
            proposalEvent.fileType = fileType;
            await store.proposalEventStore.updateEvent(proposalEvent);

            if(store.proposalEventStore.isError == false){
                props.onHide();
                enqueueSnackbar("Suggestion updated.", { variant: 'success'})
            } else {
                enqueueSnackbar("Failed to update suggestion.", { variant: 'error'})
            }
        }
      };

    //   const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { files } = event.target;
    //     const selectedFiles = files as FileList;
    //     setCurrentFile(selectedFiles?.[0]);
    //     setProgress(0);
    //   };

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
                        <Row className="ms-3 me-3 mb-2 mt-4">
                            <TextForm> Suggestion image: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            {/* <label className="form-label" htmlFor="customFile">Default file input example</label> */}
                            <input type="file" accept="image/jpeg, image/png" className="form-control" onChange={(e) => setPicture(e.target.files![0])} />
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