import { FC, useState } from "react";
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
import HelpEventUpdateRequestForm from "../Forms/HelpEvent/HelpEventUpdateRequestForm";
import { NeedRequestResource } from "../../types/HelpEvent/NeedRequestResource";
import { HelpRequestStatusUpdateResource } from "../../types/HelpEvent/HelpRequestStatusUpdateResource";
import { useTranslation } from "react-i18next";

interface HelpEventRequestCardProps{
    item: ITransactionResource;
    needs: NeedRequestResource[];
    isPreview: boolean;
    key: number;
}

const HelpEventRequestCard: FC<HelpEventRequestCardProps> = (props) => {

    const store = useStore();
    const { enqueueSnackbar } = useSnackbar()
    const { t } = useTranslation();
    const [updateStatusFormShow, setUpdateStatusFormShow] = useState(false);

    const handleAcceptClick = async (isAccept: boolean) => {
        let request = new HelpRequestStatusUpdateResource();
        request.status = isAccept ? RequestStatusEnum.completed : RequestStatusEnum.aborted;
        await store.helpEventStore.updateRequestStatus(props.item.id!, request);
        let actionType = isAccept == true ? "Accepted" : "Declined"
        if(store.helpEventStore.isError == false){
            enqueueSnackbar(t(`Request ${actionType}`), { variant: 'success'})
        } else {
            enqueueSnackbar(t("Failed to perform action"), { variant: 'error'})
        }
    }

    return (
        <>
        <div className="card w-90 ms-auto me-auto mb-3 card-hover" style={{minHeight: 100}}>
            <div className="row h-60 ms-3 me-3 mt-3 mb-0" style={{overflow:"hidden"}}>
                <div className="col-4" >
                    <div className="row" >
                        <h6>
                            {props.item.responder?.username}
                            <img src={props.item.responder?.profileImageURL} className="rounded-circle ms-2" style={{width:35, height:35}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="row" hidden={props.isPreview} >
                        <h6>
                            {t('Contact')}: {props.item.responder?.phoneNumber}  
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
                </div>
                <div className="col-4">
                    <div className="row text-end" >
                        <h6>
                            <button type="button"  style={{color:"green"}} className="btn p-0 mb-1" hidden={props.isPreview || props.item.transactionStatus != RequestStatusEnum.waitingForApprove || store.userStore.user?.id != store.helpEventStore.event.authorInfo?.id} onClick={() => handleAcceptClick(true)}> ⠀{t('Accept')} / </button>
                            <button type="button" style={{color:"orange"}} className="btn p-0 mb-1 me-2" hidden={props.isPreview || props.item.transactionStatus != RequestStatusEnum.waitingForApprove || store.userStore.user?.id != store.helpEventStore.event.authorInfo?.id} onClick={() => handleAcceptClick(false)}> {t('Decline')} </button>
                            {props.item.receiver?.username}
                            <img src={props.item.receiver?.profileImageURL} className="rounded-circle ms-2" style={{width:35, height:35}} alt="Avatar" />
                        </h6>
                    </div>
                    <div className="row text-end" hidden={props.isPreview} >
                        <h6>
                            {t('Contact')}: {props.item.receiver?.phoneNumber}
                        </h6>
                    </div>
                </div>
            </div>
            <div className="row mt-2 ms-3 me-3 mb-2">
                <h6 className=" mb-0">
                    {t('Сompletion Status')}:
                    <span className="btn p-0 ps-2"  
                                onClick={() => store.userStore.user?.id == store.helpEventStore.event.authorInfo?.id || props.item.responderStatus == OwnerRequestStatusEnum.completed || props.isPreview ? false : setUpdateStatusFormShow(true)} >{t(OwnerRequestStatusEnum.toContentString(props.item.responderStatus))}</span>
                </h6>
            </div>
            <div className="row ms-3 me-3 mb-2" hidden={props.item.needs?.filter(x => x.received != 0).length == 0} style={{borderTop: "9px solid #FBF8F0"}}>
                    {(props.item.needs ?? [])
                        .filter(x => x.received != 0)
                        .map((need) => (
                            <div className='col-12 mt-2'>
                                <span className="me-1">{need.title} -</span> {need.received} / {need.amount! - need.receivedTotal!} {t(need.unit!)}
                            </div>
                    ))}
            </div>
        </div>
        <HelpEventUpdateRequestForm
                item={props.item}
                needs={props.needs!}
                show={updateStatusFormShow}
                onHide={() => setUpdateStatusFormShow(false)} />
        </>
  )};

export default HelpEventRequestCard;