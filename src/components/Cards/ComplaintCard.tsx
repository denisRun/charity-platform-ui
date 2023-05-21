import { FC, useState } from "react";
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { EventTypeEnum } from "../../types/enums/EventTypeEnum";
import { RequestStatusEnum } from "../../types/enums/RequestStatusEnum";
import { INotificationResource } from "../../types/NotificationResource";
import { useTranslation } from "react-i18next";
import { IComplainResource } from "../../types/ComplainSearchResource";
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate } from "react-router-dom";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useStore } from "../../contexts/StoreContext";
import { useSnackbar } from "notistack";

interface ComplaintCardProps{
    onClick: () => void;
    item: IComplainResource;
    key: string;
    className?: string;
}

const ComplaintCard: FC<ComplaintCardProps> = (props) => {

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const store = useStore();
    const { enqueueSnackbar } = useSnackbar();

    const handleOpenKlick = async () => {
        let routeName = props.item.eventType == EventTypeEnum.help ? "helps" : "propositions";
        window.open(`/${routeName}/${props.item.eventID}`, "_blank", "noreferrer");
    }

    const handleUserBan = async () => {
        store.adminStore.banUser(props.item.creatorID!);
        if(store.adminStore.isError == false){
            enqueueSnackbar(t(`User banned`), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to perform action"), { variant: 'error'})
        }
    }

    const handleEventBan = async () => {
        store.adminStore.banEvent(props.item.eventID!, props.item.eventType!);
        if(store.adminStore.isError == false){
            enqueueSnackbar(t(`Event banned`), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to perform action"), { variant: 'error'})
        }
    }

    return (
            <div className="row ms-3 me-3 mb-4 border rounded card-hover" onClick={() => props.onClick()}>
                <div className="col-2 pt-1 d-flex align-items-center">
                    <button 
                        type="button"
                        className="btn btn-success"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                            {t(EventTypeEnum.toContentString(props.item.eventType)) + " #" + props.item.eventID}
                    </button>
                </div>
                <div className="col-5 pt-3 pb-2">
                    <div className="row">
                        <a className="mb-0 pb-0" onClick={() => handleOpenKlick()}>
                            { props.item.eventName }
                        </a>
                        <h6 className="fw-bold">
                            <span style={{fontSize: 12, color:"gray"}}>
                                {dateTimeFormatter(props.item.creationDate!)}
                            </span>
                        </h6>
                    </div>  
                </div>
                <div className="col-3 pt-1 d-flex align-items-center">
                    <button onClick={() => handleEventBan()} type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><EventBusyIcon fontSize='large' /></button>
                    <button onClick={() => handleUserBan()} type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><PersonOffIcon fontSize='large' /></button>
                </div>
                <div className="col-2 pt-1 d-flex align-items-center">
                    {t("Complaints")+": " + props.item.complaints?.length}
                </div>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        {props.item.complaints?.map((complaint) => (
                            <div> 
                                <h6>
                                    <span className="me-3" style={{fontSize: 12, color:"gray"}}>
                                        {dateTimeFormatter(props.item.creationDate!)}
                                    </span>
                                    {complaint.description} 
                                </h6>
                            </div>
                        ))}
                    </div>
                </Collapse>
            </div>
  )};

export default ComplaintCard;