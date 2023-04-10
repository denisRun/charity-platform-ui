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
import { ITransactionResource } from "../../../types/TransactionResource";
import { ProposalOwnerRequestStatusEnum } from "../../../types/enums/ProposalOwnerRequestStatusEnum";
import { ProposalRequestStatusUpdateResource } from "../../../types/ProposalEvent/ProposalRequestStatusUpdateResource";
import fileToBytes from "../../../Helpers/FileToBytes";

interface IRequestFormProps{
    item: ITransactionResource;
    show: boolean;
    onHide: () => void;
}

const ProposalEventUpdateRequestForm: FC<IRequestFormProps> = (props) => {

    const store = useStore();
    const initialValues = new ProposalRequestCreateRequest();
    const { enqueueSnackbar } = useSnackbar()
    const [requestStatus, setRequestStatus] = useState(props.item.responderStatus);
    const [attachedFile, setAttachedFile] = useState<File>();
    
    const updateRequestSubmit = async () => {

        let request = new ProposalRequestStatusUpdateResource();
        request.status = requestStatus;
        if(attachedFile != null){
            request.fileBytes = await fileToBytes(attachedFile);
            request.fileType = attachedFile?.name.split(".")[1];
        }

        await store.proposalEventStore.updateRequestStatus(props.item.id!, request);
        if(store.proposalEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Request status updated.", { variant: 'success'})
        } else{
            enqueueSnackbar("Failed to update Request status.", { variant: 'error'})
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
                    <TextFormHeader> Update request status </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate>
                    <Container fluid>
                        <Row className="ms-3 me-3 mb-2">
                            <TextForm> Status: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <select className="form-select" value={requestStatus} onChange={x => setRequestStatus(x.target.value)} aria-label="Default select example">
                                <option disabled={requestStatus != ProposalOwnerRequestStatusEnum.notStarted} value={ProposalOwnerRequestStatusEnum.notStarted}>Not started</option>
                                <option value={ProposalOwnerRequestStatusEnum.inProgress}>In Progress</option>
                                <option value={ProposalOwnerRequestStatusEnum.completed}>Completed</option>
                                <option value={ProposalOwnerRequestStatusEnum.aborted}>Aborted</option>
                            </select>
                        </Row>
                        {requestStatus == ProposalOwnerRequestStatusEnum.completed ? 
                        <>
                            <Row className="ms-3 mt-3 me-3 mb-2">
                                <TextForm> Attach file: </TextForm>
                            </Row>
                            <Row className="ms-3 me-3 ps-0">
                                <input type="file" className="form-control" onChange={(e) => setAttachedFile(e.target.files![0])} />
                            </Row>
                        </> 
                        :
                         <></>}
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} onClick={() => updateRequestSubmit()} variant="success">
                                    Submit
                                </Button>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProposalEventUpdateRequestForm;