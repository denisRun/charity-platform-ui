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
import { Checkbox } from "@mui/material";
import { ITagResource } from "../../../types/TagResource";
import { HelpEventTagsEnum } from "../../../types/enums/HelpEventTagsEnum";
import { EventTypeEnum } from "../../../types/enums/EventTypeEnum";
import { useTranslation } from "react-i18next";

interface IHelpEventTagsFormProps{
    show: boolean;
    isCreate?: boolean;
    isSearch?: boolean;
    items?: ITagResource[];
    onHide: () => void;
}

const HelpEventTagsForm: FC<IHelpEventTagsFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();

    const ageGroupPossibleValues = ["Children", "Schollers", "Students", "Middle aged", "Pensioners"];
    const topicPossibleValues = ["Food", "Cloth", "People tend", "Housing restoration", "Place to live", "Job"];
    
    var userPrevAgeGroups = props.items?.find(x => x.title == HelpEventTagsEnum.ageGroup)?.values ?? [];
    var userPrevTopics = props.items?.find(x => x.title == HelpEventTagsEnum.topic)?.values ?? [];
    const [userAgeGroupsSelected, setUserAgeGroupsSelected] = useState<string[]>(userPrevAgeGroups);
    const [userTopicsSelected, setUserTopicsSelected] = useState<string[]>(userPrevTopics);

    var userPrevLocation = props.items?.find(x => x.title == HelpEventTagsEnum.location)?.values ?? ['', '', '', ''];
    const [region, setRegion] = useState(userPrevLocation[0]);
    const [city, setCity] = useState(userPrevLocation[1]);
    const [district, setDistrict] = useState(userPrevLocation[2]);
    const [street, setStreet] = useState(userPrevLocation[3]);

    const handleTagsSubmit = async () => {

        const result: ITagResource[] = [];

        const location = [region, city, district, street];
        const locationRes = new ITagResource(HelpEventTagsEnum.location, location);
        const ageGroupsRes = new ITagResource(HelpEventTagsEnum.ageGroup, userAgeGroupsSelected);
        const topicsRes = new ITagResource(HelpEventTagsEnum.topic, userTopicsSelected);

        result.push(locationRes);
        result.push(ageGroupsRes);
        result.push(topicsRes);

        if(props.isSearch){
            await store.userStore.upsertUserTags(EventTypeEnum.help, result);

            if(store.userStore.isError == false){
                props.onHide();
                enqueueSnackbar(t("Tags are updated"), { variant: 'success'})
            } else {
                enqueueSnackbar(t("Failed to setup tags"), { variant: 'error'})
            }
        } else {
            await store.helpEventStore.upsertEventTags(EventTypeEnum.help, result);

            if(store.helpEventStore.isError == false){
                props.onHide();
                enqueueSnackbar(t("Tags are updated"), { variant: 'success'})
            } else {
                enqueueSnackbar(t("Failed to setup tags"), { variant: 'error'})
            }
        }
    };

    const handleAgeGroupChange = async (value: string) => {

        const newValues = userAgeGroupsSelected;
        const index = userAgeGroupsSelected.indexOf(value, 0);
        if (index > -1) {
            
            newValues.splice(index, 1);
            setUserAgeGroupsSelected(newValues);
        } else {
            newValues.push(value);
            setUserAgeGroupsSelected(newValues)
        }
    };

    const handleTopicChange = async (value: string) => {

        const newValues = userTopicsSelected;
        const index = userTopicsSelected.indexOf(value, 0);
        if (index > -1) {
            
            newValues.splice(index, 1);
            setUserTopicsSelected(newValues);
        } else {
            newValues.push(value);
            setUserTopicsSelected(newValues)
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
                    <TextFormHeader> {t('Setup Tags')} </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={handleTagsSubmit}
                initialValues={{}}
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
                            <TextForm> {t('Location')}: </TextForm>
                        </Row>
                        <Row className="ms-3 me-3 ps-0">
                            <div className="col-6 ps-0">
                                <input className="form-control" placeholder={t("Region")!} value={region} onChange={(e) => setRegion(e.target.value)}></input>
                            </div>
                            <div className="col-6">
                                <input className="form-control" placeholder={t("City")!} value={city} onChange={(e) => setCity(e.target.value)}></input>
                            </div>
                        </Row>
                        <Row className="ms-3 me-3 mt-3 ps-0">
                            <div className="col-6 ps-0">
                                <input className="form-control" placeholder={t("District")!} value={district} onChange={(e) => setDistrict(e.target.value)}></input>
                            </div>
                            <div className="col-6">
                                <input className="form-control" placeholder={t("Street")!} value={street} onChange={(e) => setStreet(e.target.value)}></input>
                            </div>
                        </Row>
                        <Row className="ms-3 mt-3 me-3 mb-1">
                            <TextForm> {t('Age group')}: </TextForm>
                        </Row>
                        <Row className="ps-0 ms-1 mb-2">
                            <div>
                                {ageGroupPossibleValues.map((ageGroup) => (
                                    <div className="mt-2 me-3" style={{display:"inline-block"}}>
                                        <input type="checkbox" key={"age-group"+ageGroup} id={"age-group"+ageGroup} value={ageGroup} className="checkbox-hidden" defaultChecked={userAgeGroupsSelected.includes(ageGroup)} onChange={e => handleAgeGroupChange(e.target.value)} /> <label htmlFor={"age-group"+ageGroup} className="checkbox-rounded"> {t(ageGroup)} </label>
                                    </div>
                                ))}
                            </div>
                        </Row>
                        <Row className="ms-3 mt-3 me-3 mb-1">
                            <TextForm> {t('Topic')}: </TextForm>
                        </Row>
                        <Row className="ps-0 ms-1 mb-2">
                            <div>
                                {topicPossibleValues.map((topic) => (
                                    <div className="mt-2 me-3" style={{display:"inline-block"}}>
                                        <input type="checkbox" key={"topic"+topic} id={"topic"+topic} value={topic} className="checkbox-hidden" defaultChecked={userTopicsSelected.includes(topic)} onChange={e => handleTopicChange(e.target.value)} /> <label htmlFor={"topic"+topic} className="checkbox-rounded"> {t(topic)} </label>
                                    </div>
                                ))}
                            </div>
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

export default HelpEventTagsForm;