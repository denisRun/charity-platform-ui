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
import NotificationCard from "../../Cards/NotificationCard";
import { useNavigate } from "react-router-dom";
import { EventTypeEnum } from "../../../types/enums/EventTypeEnum";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

interface INotificationsFormProps{
    show: boolean;
    onHide: () => void;
}

const NotificationsForm: FC<INotificationsFormProps> = (props) => {

    const store = useStore();
    const navigate = useNavigate()

    const notifactionOnclick = async (id?: string, eventType?: string, eventId?: string) => {

        let ids = [];
        if(id == null){
            store.userStore.user?.transactionNotifications!.forEach(notif => {
                ids.push(notif.id);
            });
        } else {
            ids.push(id);
        }

        await store.userStore.readNotifications(ids)
        if(id != null){
            navigate(`/${EventTypeEnum.toUrlText(eventType)}/${eventId}`);
            props.onHide();
            window.location.reload();
        }
      };

    return (
        <Modal
            className="modal-notifaction"
            show={props.show}
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header className="mt-3 ms-4 me-4">
                <Modal.Title id="contained-modal-title-vleft">
                    <TextFormHeader> Notifications </TextFormHeader>
                </Modal.Title>
                <Modal.Title id="contained-modal-title-vright">
                    <img src={logo} style={{ width: 110, height: 22 }} />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="me-2 text-end">
                    <button  type="button" className="btn fs-7" data-bs-display="static" onClick={() => notifactionOnclick()}>
                        Read all
                    </button>
                </div>
                {store.userStore.user?.transactionNotifications!
                    .map((notification) => (
                        <NotificationCard item={notification} key={notification.id!} onClick={() => notifactionOnclick(notification.id!, notification.eventType, notification.eventID)} />            
                ))}
            </Modal.Body>
        </Modal>
    );
};

export default NotificationsForm;