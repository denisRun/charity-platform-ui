import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";

const ProposalEventInfo: FC = observer(() => {

    const store = useStore();
    
    return (
        <>
            <div className='row'>
                <div className='col-3 mt-1'>
                    <img src={store.proposalEventStore.event.imageURL} className="img-fluid rounded-1 border border-2"  alt="Avatar" />
                </div>
                <div className='col-9'>
                    <div className='row'>
                        <div className="col-9 mt-1 pe-5">
                            <h3 className='fw-bold'>{store.proposalEventStore.event.title}</h3>
                        </div>
                        <div className="col-3 mt-3">
                            <h6>
                            <img src={store.proposalEventStore.event.authorInfo?.profileImageURL} className="rounded-circle me-2" style={{width:35, height:35}} alt="Avatar" />
                                {store.proposalEventStore.event.authorInfo?.username}
                            </h6>
                        </div>
                    </div>
                <div className='row mt-4'>
                    <h5>{store.proposalEventStore.event.description}</h5>
                </div>
                </div>
            </div>
        </>
  )});

export default ProposalEventInfo;