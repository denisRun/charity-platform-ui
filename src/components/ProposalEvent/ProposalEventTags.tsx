import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortByEnum } from "../../types/enums/ProposalEventSortByEnum";
import { EventStatusEnum } from "../../types/enums/EventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import { IProposalEventUpdateResource } from "../../types/ProposalEvent/ProposalEventUpdateResource";
import ProposalEventTagsForm from "../Forms/ProposalEvent/ProposalEventTagsForm";
import EditIcon from '@mui/icons-material/Edit';
import { ProposalEventTagsEnum } from "../../types/enums/ProposalEventTagsEnum";

interface ProposalEventTagsProps{
    className?: string
}

const ProposalEventTags: FC<ProposalEventTagsProps> = observer((props) => {

    const store = useStore();
    const [updateProposalTagsFormShow, setUpdateProposalTagsFormShow] = useState(false);
    
    return (
        <div className={props.className} style={{fontSize:17}}>
            <h4>
                Suggestion tags:
                <button  type="button" className="btn fs-5 mb-2" data-bs-display="static" hidden={store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id || store.proposalEventStore.event.status == EventStatusEnum.done} style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateProposalTagsFormShow(true)}><EditIcon fontSize='large' /></button>
            </h4>
            <div className='row mt-1'>
                <div className='col-4 d-inline-flex'>
                    <h5 className="fw-bold"> Location: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.location)?.values?.join("").length == 0 ? "None" : store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.location)?.values?.map(x => x == "" ? "None" : x).join(", ")}</span></h5>
                </div>
                <div className='col-4 d-inline-flex'>
                    <h5 className="fw-bold"> Topic: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{[null, 0, -1].includes(store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.topic)?.values?.length ?? -1) ? "None": store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.topic)?.values?.join(", ")}</span> </h5>
                </div>
                <div className='col-4 d-inline-flex'>
                    <h5 className="fw-bold"> Age: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{[null, 0, -1].includes(store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup)?.values?.length ?? -1) ? "None": store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup)?.values?.join(", ")}</span> </h5>
                </div>
            </div>
            <ProposalEventTagsForm
                items={store.proposalEventStore.event.tags}
                isSearch={false}
                show={updateProposalTagsFormShow}
                onHide={() => setUpdateProposalTagsFormShow(false)} />
        </div>
  )});

export default ProposalEventTags;