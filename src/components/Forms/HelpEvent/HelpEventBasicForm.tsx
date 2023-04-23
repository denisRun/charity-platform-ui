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
import { NeedRequestResource } from "../../../types/HelpEvent/NeedRequestResource";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { UnitEnum } from "../../../types/enums/UnitEnum";
import fileToBytes from "../../../Helpers/FileToBytes";
import { useNavigate } from "react-router-dom";
import HelpEventBasicValidation from "../../../validations/HelpEventBasicValidation";
import { useTranslation } from "react-i18next";

interface IHelpEventBasicFormProps{
    show: boolean;
    isCreate: boolean;
    item?: IHelpEventCreateResource;
    onHide: () => void;
}

const HelpEventBasicForm: FC<IHelpEventBasicFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [attachedFile, setAttachedFile] = useState<File>();
    const [needCount, setNeedCount] = useState(2);
    const [action, setAction] = useState(1);

    const helpEvent = props.item ?? new IHelpEventCreateResource();
    helpEvent.needs?.push(new NeedRequestResource());
    const [initialValues, setInitialValues] = useState(helpEvent)

    const handleNeedCreate = async () => {

        if(initialValues.needs?.length == 6){
            enqueueSnackbar("Maximum 6 needs.", { variant: 'error'})
            return;
        }
        
        let temp = initialValues;
        let defaultNeed = new NeedRequestResource();
        defaultNeed.id = needCount;
        defaultNeed.title = "Item " + needCount;
        defaultNeed.amount = 1;
        defaultNeed.unit = UnitEnum.item;
        temp.needs?.push(defaultNeed);
        setInitialValues(temp);
        setNeedCount(needCount + 1);
    };

    const handleNeedDelete = async (id: number) => {
        
        if(initialValues.needs?.length == 1){
            enqueueSnackbar("At least 1 need is required.", { variant: 'error'})
            return;
        }

        let temp = initialValues;
        let index = temp.needs?.findIndex(x => x.id == id);
        temp.needs?.splice(index!, 1);

        setInitialValues(temp);
        setAction(action + 1);
    };

    const handleNeedChange = async (id:number, newTitle: string, newAmount: number, newUnit: string) => {
        
        let temp = initialValues;
        let index = temp.needs?.findIndex(x => x.id == id);
        temp.needs![index!].title = newTitle;
        temp.needs![index!].amount = newAmount;
        temp.needs![index!].unit = newUnit;

        setInitialValues(temp);
        setAction(action + 1);
    };

    const helpEventSubmit = async (event: IHelpEventCreateResource, helpers: FormikHelpers<IHelpEventCreateResource>) => {

        if(attachedFile != null){
            event.fileBytes = await fileToBytes(attachedFile);
            event.fileType = attachedFile?.name.split(".")[1];
        }        

        let createdId = -1;
        createdId = await store.helpEventStore.createEvent(event);

        if(store.helpEventStore.isError == false){
            props.onHide();
            enqueueSnackbar(t("Request created"), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to create request"), { variant: 'error'})
        }

        if(createdId > 0){
            navigate(`${createdId}`);
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
                    <TextFormHeader> {props.isCreate == true ? t("Create Help Request") : t("Update Help Request")} </TextFormHeader>
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
                            <TextForm> {t('Title')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <Form.Control
                                    name="title"
                                    placeholder={t("Title")!}
                                    value={values.title}
                                    onChange={handleChange}
                            />
                            <ErrorMessage name="title">{msg => <div className="error-color ps-0">{t(msg)}</div>}</ErrorMessage>
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
                        <Row className="ms-2 me-3 mb-1 mt-4">
                            <div className="form-inline">
                                <TextForm> {t('Needs')}: </TextForm>
                            </div>
                        </Row>
                        <div>
                            {initialValues.needs!
                                .map((need) => (
                                    <div className="row ms-3 me-3 ps-0 mb-2">
                                        <div className="col-7">
                                            <div className="row">
                                                <input className="form-control" value={need.title} onChange={x => handleNeedChange(need.id!, x.target.value, need.amount!, need.unit!)}/>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row ms-1">
                                                <input className="form-control" type="number" step="0.1" value={need.amount} onChange={x => handleNeedChange(need.id!, need.title!, Number(x.target.value!), need.unit!)}/>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="row ms-1">
                                                <select className="form-select" value={need.unit} onChange={x => handleNeedChange(need.id!, need.title!, need.amount!, x.target.value)} aria-label="Default select example">
                                                    <option value={UnitEnum.item}>{t('item')}</option>
                                                    <option value={UnitEnum.kilogram}>{t('kilogram')}</option>
                                                    <option value={UnitEnum.liter}>{t('liter')}</option>
                                                    <option value={UnitEnum.work}>{t('work')}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-1">
                                            <div className="row ms-1">
                                                <button  type="button" className="btn fs-6 pt-0" onClick={() => handleNeedDelete(need.id!)}><DeleteIcon color="error" fontSize='large' /></button>
                                            </div>
                                        </div>
                                    </div>
                            ))}
                            <div className="text-end me-1">
                                <button  type="button" className="btn fs-6 pt-0" onClick={() => handleNeedCreate()}><AddBoxIcon style={{color:"#00A6BD"}} fontSize='large' /></button>
                            </div>
                        </div>
                        <Row className="ms-3 me-3 mb-2">
                            <TextForm> {t('Request image')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <input type="file" accept="image/jpeg, image/png" className="form-control" onChange={(e) => setAttachedFile(e.target.files![0])} />
                        </Row>
                        <Row className="justify-content-md-center ms-3 me-3 mt-4 mb-3">
                                <Button style={{fontSize:"1.3rem"}} variant="success" type="submit">
                                    {props.isCreate == true ? t("Submit") : t("Update")}
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

export default HelpEventBasicForm;