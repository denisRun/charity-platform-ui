import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
import ProposalEventCard from "../Cards/ProposalEventCard";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";
import ProposalEventCreateRequest from "../Forms/ProposalEvent/ProposalEventCreateRequestForm";

const ProposalEventCurrentRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const [createRequestFormShow, setCreateRequestFormShow] = useState(false);
    
    return (
        <>
            <div className='row'>
                <div className='col-9 mt-1'>
                </div>
                <div className="col-3">
                    <Button variant="success" disabled={store.userStore.user == null} className="w-100" onClick={() => setCreateRequestFormShow(true)}>
                        + Create request 
                    </Button>
                </div>
            </div>
            <div className="mt-3">
                {store.proposalEventStore.events
                    .map((event) => (
                        <ProposalEventCard onClick={() => navigate(event.id!.toString())} item={event} key={event.id!}/>            
                ))}
            </div>
            <ProposalEventCreateRequest
                show={createRequestFormShow}
                onHide={() => setCreateRequestFormShow(false)} />
        </>
  )});

export default ProposalEventCurrentRequests;