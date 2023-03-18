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
import { Checkbox } from "@mui/material";

interface IProposalEventTagsFormProps{
    show: boolean;
    isCreate: boolean;
    items?: IProposalEventUpdateResource;
    onHide: () => void;
}

const ProposalEventTagsForm: FC<IProposalEventTagsFormProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const initialValues = props.items ?? new IProposalEventUpdateResource();
    const ageGroupValues = ["Children", "Schollers", "Students", "Middle aged", "Pensioners"];
    const [userAgeGroupsSelected, setUserAgeGroupsSelected] = useState<string[]>(["Children"]);

    const proposalEventSubmit = async (proposalEvent: IProposalEventUpdateResource, helpers: FormikHelpers<IProposalEventUpdateResource>) => {


        alert(userAgeGroupsSelected);
            // await store.proposalEventStore.createEvent(proposalEvent);

            // if(store.proposalEventStore.isError == false){
            //     props.onHide();
            //     enqueueSnackbar("Tags are updated.", { variant: 'success'})
            // } else {
            //     enqueueSnackbar("Failed to setup tags.", { variant: 'error'})
            // }
    };

    const handleAgeGroupChange = async (value: string) => {

        debugger;
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

    return (
        <Modal
            className="modal-xl"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="mt-3 ms-4 me-4">
                <Modal.Title id="contained-modal-title-vleft">
                    <TextFormHeader> Setup Tags </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Formik
                onSubmit={proposalEventSubmit}
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
                            <TextForm> Age group: </TextForm>
                        </Row>
                        <Row className="me-3 ps-0">
                            <div>
                                {ageGroupValues.map((ageGroup) => (
                                    <><input type="checkbox" key={"age-group"+ageGroup} id={"age-group"+ageGroup} value={ageGroup} className="checkbox-hidden me-3" defaultChecked={userAgeGroupsSelected.includes(ageGroup)} onChange={e => handleAgeGroupChange(e.target.value)} /> <label htmlFor={"age-group"+ageGroup} className="checkbox-rounded"> {ageGroup} </label></>
                                ))}
                                {/* <input type="checkbox" id="age-group-mig-age" value={"mid-age"} className="checkbox-hidden" /> <label htmlFor="age-group-mig-age" className="checkbox-rounded"> Mid age </label>
                                <input type="checkbox" id="age-group-adult" value={"adult"} className="checkbox-hidden" /> <label htmlFor="age-group-adult" className="checkbox-rounded ms-3"> Adult </label> */}
                            </div>
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

export default ProposalEventTagsForm;