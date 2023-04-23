import { FC, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IProposalEventSearchResource } from "../../types/ProposalEvent/ProposalEventSearchResource";
import dateTimeFormatter from "../../Helpers/ToDateTimeConverter";
import { ITransactionResource } from "../../types/TransactionResource";
import waiting from '../../images/waiting.png';
import inProgress from '../../images/in-progress.png';
import success from '../../images/success.png';
import cancel from '../../images/cancel.png';
import { RequestStatusEnum } from "../../types/enums/RequestStatusEnum";
import { OwnerRequestStatusEnum } from "../../types/enums/OwnerRequestStatusEnum";
import { useStore } from "../../contexts/StoreContext";
import { useSnackbar } from "notistack";
import ProposalEventTagsForm from "../Forms/ProposalEvent/ProposalEventTagsForm";
import ProposalEventUpdateRequestForm from "../Forms/ProposalEvent/ProposalEventUpdateRequestForm";
import { useTranslation } from "react-i18next";

interface ProposalEventRequestCardProps{
    item: ITransactionResource;
    isPreview: boolean;
    key: number;
}

const ProposalEventRequestCard: FC<ProposalEventRequestCardProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();
    const [updateProposalTagsFormShow, setUpdateProposalTagsFormShow] = useState(false);

    const handleAcceptClick = async (isAccept: boolean) => {

        await store.proposalEventStore.acceptRequest(props.item.id!, isAccept);
        let actionType = isAccept == true ? "Accepted" : "Declined"
        if(store.proposalEventStore.isError == false){
            enqueueSnackbar(t(`Request ${actionType}`), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to perform action"), { variant: 'error'})
        }
    }

    return (
        <>
        <div className="card w-90 ms-auto me-auto mb-3 card-hover" style={{height: props.isPreview ? 170 : 180}}>
            <div className="row h-60 ms-3 me-3 mt-3 mb-0" style={{overflow:"hidden"}}>
                <div className="col-4" >
                    <div className="row" >
                        <h6>
                            {props.item.responder?.username}
                            <img src={props.item.responder?.profileImageURL} className="rounded-circle ms-2" style={{width:35, height:35}} alt="Avatar" />
                            <button type="button"  style={{color:"green"}} className="btn p-0" hidden={props.isPreview || props.item.transactionStatus != RequestStatusEnum.waiting || store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id} onClick={() => handleAcceptClick(true)}> ⠀{t('Accept')} / </button>
                            <button type="button" style={{color:"orange"}} className="btn p-0" hidden={props.isPreview || props.item.transactionStatus != RequestStatusEnum.waiting || store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id} onClick={() => handleAcceptClick(false)}> {t('Decline')} </button>
                        </h6>
                    </div>
                    <div className="row" hidden={props.isPreview} >
                        <h6>
                            {t('Contact')}: {props.item.responder?.phoneNumber}  
                            <span className="btn p-0 ps-2"  
                                onClick={() => store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id || props.item.transactionStatus == RequestStatusEnum.waiting ? false : setUpdateProposalTagsFormShow(true)} >({t(OwnerRequestStatusEnum.toContentString(props.item.responderStatus))})</span>
                        </h6>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row justify-content-center">
                        <div className="col-6 text-end">
                            <img 
                            src={props.item.transactionStatus == RequestStatusEnum.waiting ? waiting : (props.item.transactionStatus == RequestStatusEnum.aborted || props.item.transactionStatus == RequestStatusEnum.canceled) ? cancel : props.item.transactionStatus == RequestStatusEnum.completed ? success : inProgress}
                            style={{ width: 60, height:60 }} />
                        </div>
                        <div className="col-6 mt-2 text-start">
                            <div className="row">
                                {props.isPreview && props.item.transactionStatus ==  RequestStatusEnum.completed ?
                                    <a href={props.item.reportURL}> 
                                        {t(RequestStatusEnum.toContentString(RequestStatusEnum.completed))}
                                    </a>
                                    :
                                    <h6>
                                        {t(RequestStatusEnum.toContentString(props.item.transactionStatus))}
                                    </h6>
                                }
                            </div>
                            <div className="row">
                                <h6>
                                    {dateTimeFormatter(props.item.creationDate!)}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row" hidden={!props.isPreview} >
                        <a href={props.item.reportURL}>
                            Download file
                        </a>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row text-end" >
                        <h6>
                            {props.item.creator?.username}
                            <img src={props.item.creator?.profileImageURL} className="rounded-circle ms-2" style={{width:35, height:35}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="row text-end" hidden={props.isPreview} >
                        <h6>
                            {t('Contact')}: {props.item.creator?.phoneNumber}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="row ms-3 me-3 mt-2">
                <h6>
                    {t('Comment')}:
                </h6>
            </div>
            <div className="row h-40 ms-4 me-4 mb-2 border rounded p-1" style={{overflowY:"auto"}}>
                <h6>
                    {props.item.comment}
                </h6>
            </div>
        </div>
        <ProposalEventUpdateRequestForm
                item={props.item}
                show={updateProposalTagsFormShow}
                onHide={() => setUpdateProposalTagsFormShow(false)} />
        </>
  )};

export default ProposalEventRequestCard;