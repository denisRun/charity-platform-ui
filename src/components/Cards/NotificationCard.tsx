import { FC } from "react";
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { EventTypeEnum } from "../../types/enums/EventTypeEnum";
import { ProposalRequestStatusEnum } from "../../types/enums/ProposalRequestStatusEnum";
import { INotificationResource } from "../../types/NotificationResource";

interface NotificationCardProps{
    onClick: () => void;
    item: INotificationResource;
    key: string;
    className?: string;
}

const NotificationCard: FC<NotificationCardProps> = (props) => {

    return (
            <div className="row ms-3 me-3 mb-4 border rounded card-hover" onClick={() => props.onClick()}>
                <div className="col-1 pt-1 d-flex align-items-center">
                    { !props.item.isRead ? <span className="dot-orange ms-2"> </span> : <span className="dot-grey ms-2"> </span> }
                </div>
                <div className="col-11 pt-3 pb-2">
                    <div className="row">
                        <h5 className="mb-0 pb-0">
                            {EventTypeEnum.toContentString(props.item.eventType)} <span className="fw-bold">{props.item.eventTitle}</span>, {"request status updated to " + ProposalRequestStatusEnum.toContentString(props.item.newStatus)}
                        </h5>
                        <h6 className="fw-bold">
                            <span style={{fontSize: 12, color:"gray"}}>
                                {dateTimeFormatter(props.item.createdAt!)}
                            </span>
                        </h6>
                    </div>  
                </div>
            </div>
  )};

export default NotificationCard;