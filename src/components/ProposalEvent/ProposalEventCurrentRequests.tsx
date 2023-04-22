import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { RequestStatusEnum } from "../../types/enums/RequestStatusEnum";
import { IProposalEventUpdateResource } from "../../types/ProposalEvent/ProposalEventUpdateResource";
import ProposalEventCard from "../Cards/ProposalEventCard";
import ProposalEventRequestCard from "../Cards/ProposalEventRequestCard";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";
import ProposalEventCreateRequestForm from "../Forms/ProposalEvent/ProposalEventCreateRequestForm";

const ProposalEventCurrentRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [createRequestFormShow, setCreateRequestFormShow] = useState(false);

    let requests = store.proposalEventStore.event.transactions!
        .filter(x => (x.responder.id == store.userStore.user?.id || x.creator.id == store.userStore.user?.id) && (x.transactionStatus == RequestStatusEnum.waiting || x.transactionStatus == RequestStatusEnum.accepted || x.transactionStatus == RequestStatusEnum.inProcess))
        .slice()
        .sort((x,y) => x.creationDate! < y.creationDate! ? 1 : -1);
    
    return (
        <>
            <div className='row'>
                <div className='col-9 mt-1 ms-1'>
                    <h5 hidden={requests.length != 0}>
                        You don`t have active Requests
                    </h5>
                </div>
                <div className="col-2 ms-5">
                    <Button variant="success" hidden={store.proposalEventStore.event.authorInfo?.id == store.userStore.user?.id} disabled={store.userStore.user == null} className="w-100" onClick={() => setCreateRequestFormShow(true)}>
                        + Create request 
                    </Button>
                </div>
            </div>
            <div className="mt-3">
                {requests
                    .map((trans) => (
                        <ProposalEventRequestCard item={trans} isPreview={false} key={trans.id!}/>            
                ))}
            </div>
            <ProposalEventCreateRequestForm
                show={createRequestFormShow}
                onHide={() => setCreateRequestFormShow(false)} />
        </>
  )});

export default ProposalEventCurrentRequests;