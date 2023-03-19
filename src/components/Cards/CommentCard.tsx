import { FC } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IProposalEventSearchResource } from "../../types/ProposalEventSearchResource";
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { ICommentResource } from "../../types/CommentResource";

interface CommentCardProps{
    // onClick: () => void;
    item: ICommentResource;
    key: number;
    className?: string;
}

const CommentCard: FC<CommentCardProps> = (props) => {

    return (
        <div className={props.className}>
            <div className="row">
                <div className="col-0-5">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="rounded-circle me-2" style={{width:35, height:35}} alt="Avatar" />
                </div>
                <div className="col-11 ms-1">
                    <div className="row" style={{flexDirection:'row', flexWrap:'wrap'}}>
                        <h6 className="fw-bold">
                            {props.item.username}
                            <span className="ms-3" style={{fontSize: 12, color:"gray"}}>
                                {dateTimeFormatter(props.item.creationDate!)}
                            </span>
                        </h6>
                        
                    </div>
                    <div className="row mt-1">
                        <h5>
                            {props.item.text}
                        </h5>
                    </div>  
                </div>
            </div>
        </div>
  )};

export default CommentCard;