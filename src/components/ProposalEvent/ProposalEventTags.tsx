import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortByEnum } from "../../types/enums/ProposalEventSortByEnum";
import { ProposalEventStatusEnum } from "../../types/enums/ProposalEventStatusEnum";
import { SortOrderEnum } from "../../types/enums/SortOrderEnum";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
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
                <button  type="button" className="btn fs-5 mb-2" data-bs-display="static" hidden={store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id} style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateProposalTagsFormShow(true)}><EditIcon fontSize='large' /></button>
            </h4>
            <div className='row'>
                <div className='col-4'>
                    <h5 className="fw-bold">Location: <span className="fw-normal">{store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.location)?.values?.join("").length == 0 ? "None" : store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.location)?.values?.join(", ")}</span> </h5>
                </div>
                <div className='col-4'>
                    <h5 className="fw-bold">Age group: <span className="fw-normal">{store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup) == null ? "None": store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup)?.values?.join(", ")}</span> </h5>
                </div>
                <div className='col-4'>
                    <h5 className="fw-bold">Age group: <span className="fw-normal">{store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup) == null ? "None": store.proposalEventStore.event.tags?.find(x => x.title == ProposalEventTagsEnum.ageGroup)?.values?.join(", ")}</span> </h5>
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