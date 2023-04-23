import { FC, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useStore } from '../../../contexts/StoreContext';
import Modal from 'react-bootstrap/Modal';
import logo from '../../../images/logo.svg';
import TextFormHeader from "../../Text/TextFormHeader";
import TextForm from "../../Text/TextForm";
import { useSnackbar } from "notistack";
import { ITransactionResource } from "../../../types/TransactionResource";
import { OwnerRequestStatusEnum } from "../../../types/enums/OwnerRequestStatusEnum";
import fileToBytes from "../../../Helpers/FileToBytes";
import { HelpRequestStatusUpdateResource } from "../../../types/HelpEvent/HelpRequestStatusUpdateResource";
import { NeedRequestResource } from "../../../types/HelpEvent/NeedRequestResource";
import { useTranslation } from "react-i18next";

interface IRequestFormProps{
    item: ITransactionResource;
    needs: NeedRequestResource[];
    show: boolean;
    onHide: () => void;
}

const HelpEventUpdateRequestForm: FC<IRequestFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [requestStatus, setRequestStatus] = useState(props.item.responderStatus);
    const [attachedFile, setAttachedFile] = useState<File>();
    const [needsCompletion, setNeedsCompletion] = useState<NeedRequestResource[]>(props.item.needs?.filter(x => x.amount != x.received) ?? []);
    const [action, setAction] = useState(1);

    const handleNeedChange = async (id:number, recieved: number) => {
        
        let temp = needsCompletion;
        let index = temp.findIndex(x => x.id == id);
        temp![index!].received = recieved;

        setNeedsCompletion(temp);
        setAction(action + 1);
    };

    const updateRequestSubmit = async () => {

        if(requestStatus == OwnerRequestStatusEnum.completed && attachedFile == null){
            enqueueSnackbar("File must be attached.", { variant: 'error'})
            return;
        }

        let request = new HelpRequestStatusUpdateResource();
        request.status = requestStatus;
        if(attachedFile != null){
            request.fileBytes = await fileToBytes(attachedFile);
            request.fileType = attachedFile?.name.split(".")[1];
        }
        request.needs = needsCompletion;

        await store.helpEventStore.updateRequestStatus(props.item.id!, request);
        if(store.helpEventStore.isError == false){
            props.onHide();
            enqueueSnackbar("Request status updated", { variant: 'success'})
        } else{
            enqueueSnackbar("Failed to update Request status", { variant: 'error'})
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
                    <TextFormHeader> {t('Update request status')} </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate>
                    <Container fluid>
                        <Row className="ms-3 me-3 mb-2">
                            <TextForm> {t('Status')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <select className="form-select" value={requestStatus} onChange={x => setRequestStatus(x.target.value)} aria-label="Default select example">
                                <option disabled={requestStatus != OwnerRequestStatusEnum.notStarted} value={OwnerRequestStatusEnum.notStarted}>{t('Not Started')}</option>
                                <option value={OwnerRequestStatusEnum.inProgress}>{t('In Progress')}</option>
                                <option value={OwnerRequestStatusEnum.completed}>{t('Completed')}</option>
                                <option value={OwnerRequestStatusEnum.aborted}>{t('Aborted')}</option>
                            </select>
                        </Row>
                        {requestStatus == OwnerRequestStatusEnum.completed ? 
                        <div className="mt-3">
                            <Row className="ms-3 me-3 mb-2">
                                <TextForm> {t('Needs completion')}: </TextForm>
                            </Row>
                            {needsCompletion
                                .filter(x => x.amount != x.receivedTotal)
                                .map((need) => (
                                    <div className="row ms-3 me-3 ps-0 mb-2">
                                        <div className="col-8">
                                            <div className="row">
                                                <input className="form-control" value={need.title} disabled/>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row ms-1">
                                                <input className="form-control" type="number" step="0.1" value={need.received} onChange={(x) => handleNeedChange(need.id!, Number(x.target.value!))} max={need.amount!-need.receivedTotal!} min={0} />
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row ms-1 mt-2">
                                                {t('of')} {need.amount! - need.receivedTotal!} {t(need.unit!)}
                                            </div>
                                        </div>
                                    </div>
                            ))}
                            <Row className="ms-3 mt-3 me-3 mb-2">
                                <TextForm> {t('Attach file')}: </TextForm>
                            </Row>
                            <Row className="ms-3 me-3 ps-0">
                                <input type="file" className="form-control" onChange={(e) => setAttachedFile(e.target.files![0])} />
                            </Row>
                        </div> 
                        :
                         <></>}
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} onClick={() => updateRequestSubmit()} variant="success">
                                    {t('Submit')}
                                </Button>
                        </Row>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default HelpEventUpdateRequestForm;