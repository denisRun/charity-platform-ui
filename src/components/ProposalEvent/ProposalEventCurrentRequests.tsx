import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { ProposalRequestStatusEnum } from "../../types/enums/ProposalRequestStatusEnum";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
import ProposalEventCard from "../Cards/ProposalEventCard";
import ProposalEventRequestCard from "../Cards/ProposalEventRequestCard";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";
import ProposalEventCreateRequestForm from "../Forms/ProposalEvent/ProposalEventCreateRequestForm";

const ProposalEventCurrentRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [createRequestFormShow, setCreateRequestFormShow] = useState(false);
    
    return (
        <>
            <div className='row'>
                <div className='col-9 mt-1'>
                </div>
                <div className="col-2 ms-5">
                    <Button variant="success" hidden={store.proposalEventStore.event.authorInfo?.id == store.userStore.user?.id} disabled={store.userStore.user == null} className="w-100" onClick={() => setCreateRequestFormShow(true)}>
                        + Create request 
                    </Button>
                </div>
            </div>
            <div className="mt-3">
                {store.proposalEventStore.event.transactions!
                    .filter(x => (x.responder.id == store.userStore.user?.id || x.creator.id == store.userStore.user?.id) && (x.transactionStatus == ProposalRequestStatusEnum.waiting || x.transactionStatus == ProposalRequestStatusEnum.accepted || x.transactionStatus == ProposalRequestStatusEnum.inProcess))
                    .slice()
                    .sort((x,y) => x.creationDate! < y.creationDate! ? 1 : -1)
                    .map((trans) => (
                        <ProposalEventRequestCard item={trans} key={trans.id!}/>            
                ))}
            </div>
            <ProposalEventCreateRequestForm
                show={createRequestFormShow}
                onHide={() => setCreateRequestFormShow(false)} />
        </>
  )});

export default ProposalEventCurrentRequests;