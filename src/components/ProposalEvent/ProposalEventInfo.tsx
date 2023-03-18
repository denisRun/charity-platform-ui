import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortBy } from "../../types/enums/ProposalEventSortBy";
import { ProposalEventStatus } from "../../types/enums/ProposalEventStatus";
import { SortOrder } from "../../types/enums/SortOrder";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
import ProposalEventBasicForm from "../Forms/ProposalEvent/ProposalEventBasicForm";

const ProposalEventInfo: FC = observer(() => {

    const store = useStore();
    
    return (
        <>
            <div className='row'>
                <div className='col-3 mt-1'>
                    <img src="https://img.freepik.com/free-photo/beautiful-aerial-shot-fronalpstock-mountains-switzerland-beautiful-pink-blue-sky_181624-9315.jpg?w=996&t=st=1678644966~exp=1678645566~hmac=ba4b8eb4e9e07f835b572413756f273bd4063e70b616e22e6e22a643cfccbbba" className="img-fluid rounded-1 border border-2"  alt="Avatar" />
                </div>
                <div className='col-9'>
                    <div className='row'>
                        <div className="col-9 mt-1 pe-5">
                            <h3 className='fw-bold'>{store.proposalEventStore.event.title}</h3>
                        </div>
                        <div className="col-3 mt-3">
                            <h6>
                            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="rounded-circle me-2" style={{width:35, height:35}} alt="Avatar" />
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