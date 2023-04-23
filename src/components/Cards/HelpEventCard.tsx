import { FC, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from "notistack";
import ComplainForm from "../Forms/ComplainForm";
import { EventStatusEnum } from "../../types/enums/EventStatusEnum";
import { EventTypeEnum } from "../../types/enums/EventTypeEnum";
import { IHelpEventSearchResource } from "../../types/HelpEvent/HelpEventSearchResource";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { useTranslation } from "react-i18next";

interface HelpEventCardProps{
    onClick: () => void;
    isOwn: boolean;
    item: IHelpEventSearchResource;
    key: number;
}

const HelpEventCard: FC<HelpEventCardProps> = (props) => {

    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [complainFormShow, setComplainFormShow] = useState(false);


    const handleCopyClick = async () => {
        navigator.clipboard.writeText(`http://localhost:3000${location.pathname}/${props.item.id}`);
        enqueueSnackbar(t("Link copied"), { variant: 'success'})
    }

    return (
        <div className="card w-100 mb-3 card-hover" style={{height:160}}>
            <div className="row h-100 ms-2 me-2" style={{marginTop: "auto", marginBottom: "auto", overflow:"hidden"}}>
                <div className="col-2" style={{height:135,overflow:"hidden",marginTop: "auto", marginBottom: "auto"}} onClick={() => props.onClick()}>
                    <img src={props.item.imageURL} style={{height: 135, width: 230}} className="img-fluid rounded-1 border border-2"  alt="Avatar" />
                </div>
                <div className="col-7 mt-3" onClick={() => props.onClick()}>
                    <div className="row h-30" >
                        <div className="col-12" >
                            <h3>{props.item.title!.length > 55 ? props.item.title!.slice(0,55)+" ..." : props.item.title}</h3>
                        </div>
                    </div>
                    <div className="row h-70 mt-1" >
                        <div className="col-12">
                            <h6>{props.item.description!.length > 400 ? props.item.description!.slice(0,400)+" ..." : props.item.description}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-2-5 mt-3" >
                    <div className="ms-2" hidden={props.isOwn}>
                        <h6 className="mb-0">
                            {props.item.authorInfo?.username}
                            <img src={props.item.authorInfo?.profileImageURL} className="rounded-circle ms-2" style={{width:40, height:40}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="mt-1 mb-3 ms-2" style={{width:50}} hidden={props.isOwn}>
                        <CircularProgressbar
                                value={props.item.completionPercentages!}
                                text={`${props.item.completionPercentages}%`}
                                styles={buildStyles({
                                    pathColor: "#00A6BD",
                                    strokeLinecap: "butt",
                                    textSize: "25px"
                                }) }
                            />
                    </div>
                    <div className="mb-1 mt-2 ms-2" style={{width:50}} hidden={!props.isOwn}>
                        <CircularProgressbar
                                value={props.item.completionPercentages!}
                                text={`${props.item.completionPercentages}%`}
                                styles={buildStyles({
                                    pathColor: "#00A6BD",
                                    strokeLinecap: "butt",
                                    textSize: "25px"
                                }) }
                            />
                    </div>
                    <div className="mt-3 mb-3 ms-2" hidden={!props.isOwn} >
                        <h6>
                            {t('Status')}: 
                            <span className="fw-bold ms-1">
                                 {t(EventStatusEnum.toContentString(props.item.status))} 
                            </span>
                        </h6>
                    </div>
                    <div className="mt-2 ms-2" >
                        {dateTimeFormatter(props.item.creationDate!)}
                    </div>
                </div>
                <div className="col-0-5" >
                    <div className="btn-group">
                        <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                        <li><button className="dropdown-item" type="button" onClick={() => handleCopyClick()}>{t('Copy link')}</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => setComplainFormShow(true)}>{t('Complain')}</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <ComplainForm 
                eventId={props.item.id!}
                eventType={EventTypeEnum.help}
                show={complainFormShow}
                onHide={() => setComplainFormShow(false)} />
        </div>
  )};

export default HelpEventCard;