import { FC, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IProposalEventSearchResource } from "../../types/ProposalEvent/ProposalEventSearchResource";
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from "notistack";
import ComplainForm from "../Forms/ComplainForm";
import { ProposalEventStatusEnum } from "../../types/enums/ProposalEventStatusEnum";
import { EventTypeEnum } from "../../types/enums/EventTypeEnum";

interface ProposalEventCardProps{
    onClick: () => void;
    isOwn: boolean;
    item: IProposalEventSearchResource;
    key: number;
}

const ProposalEventCard: FC<ProposalEventCardProps> = (props) => {

    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    const [complainFormShow, setComplainFormShow] = useState(false);


    const handleCopyClick = async () => {
        navigator.clipboard.writeText(`http://localhost:3000${location.pathname}/${props.item.id}`);
        enqueueSnackbar("Link copied.", { variant: 'success'})
    }

    return (
        <div className="card w-100 mb-3 card-hover" style={{height:160}}>
            <div className="row h-100 ms-2 me-2" style={{marginTop: "auto", marginBottom: "auto", overflow:"hidden"}}>
                <div className="col-2" style={{height:135,overflow:"hidden",marginTop: "auto", marginBottom: "auto"}} onClick={() => props.onClick()}>
                    <img src={props.item.imageURL} className="img-fluid rounded-1 border border-2"  alt="Avatar" />
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
                    <div className="mt-1 mt-2 ms-2" hidden={props.isOwn}>
                        <h6>
                            {props.item.authorInfo?.username}
                            <img src={props.item.authorInfo?.profileImageURL} className="rounded-circle ms-2" style={{width:40, height:40}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="mt-3 ms-2" hidden={props.isOwn}>
                        <h6>
                            {props.item.availableHelps! > 0 ? <>Available <span className="dot-green ms-2"> </span></> : <>Work in progress <span className="dot-orange ms-2"> </span></> }
                        </h6>
                    </div>
                    <div className="mt-1 mt-2 ms-2" hidden={!props.isOwn}>
                        <h6>
                            Status: 
                            <span className="fw-bold ms-1">
                                 {ProposalEventStatusEnum.toContentString(props.item.status)} 
                            </span>
                        </h6>
                    </div>
                    <div className="mt-4 ms-2" hidden={!props.isOwn}>
                        <h6>
                            Active requests: <span className="fw-bold">{(props.item.maxConcurrentRequests! - props.item.availableHelps!)}</span> / {props.item.maxConcurrentRequests}
                        </h6>
                    </div>
                    <div className="mt-4 ms-2" >
                        {dateTimeFormatter(props.item.creationDate!)}
                    </div>
                </div>
                <div className="col-0-5" >
                    <div className="btn-group">
                        <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                        <li><button className="dropdown-item" type="button" onClick={() => handleCopyClick()}>Copy link</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => setComplainFormShow(true)}>Complain</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <ComplainForm 
                eventId={props.item.id!}
                eventType={EventTypeEnum.proposal}
                show={complainFormShow}
                onHide={() => setComplainFormShow(false)} />
        </div>
  )};

export default ProposalEventCard;