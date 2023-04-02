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

const ProposalEventRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [createRequestFormShow, setCreateRequestFormShow] = useState(false);

    const requestsCount = store.proposalEventStore.event.transactions?.length ?? 0;
    
    return (
        <>
                <div className='col-9 mt-1 ms-1'>
                    <h5 hidden={requestsCount != 0}>
                        There is no Requests in Suggestion
                    </h5>
                </div>
            <div className="mt-3">
                {store.proposalEventStore.event.transactions!
                    .slice()
                    .sort((x,y) => x.creationDate! < y.creationDate! ? 1 : -1)
                    .map((trans) => (
                        <ProposalEventRequestCard item={trans} isPreview={true} key={trans.id!}/>            
                ))}
            </div>
            <ProposalEventCreateRequestForm
                show={createRequestFormShow}
                onHide={() => setCreateRequestFormShow(false)} />
        </>
  )});

export default ProposalEventRequests;