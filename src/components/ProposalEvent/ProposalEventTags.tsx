import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import { ProposalEventSortBy } from "../../types/enums/ProposalEventSortBy";
import { ProposalEventStatus } from "../../types/enums/ProposalEventStatus";
import { SortOrder } from "../../types/enums/SortOrder";
import { IProposalEventUpdateResource } from "../../types/ProposalEventUpdateResource";
import ProposalEventTagsForm from "../Forms/ProposalEvent/ProposalEventTagsForm";
import EditIcon from '@mui/icons-material/Edit';

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
                <button  type="button" className="btn fs-5 mb-2" data-bs-display="static" style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateProposalTagsFormShow(true)}><EditIcon fontSize='large' /></button>
            </h4>
            <div className='row mt-3 gx-2'>
                <div className='col-4'>
                    Location: None
                </div>
                <div className='col-4'>
                    Age group: adult
                </div>
                <div className='col-4'>
                    Topic: Health
                </div>
            </div>
            <ProposalEventTagsForm
                items={IProposalEventUpdateResource.searchResourceConstructor(store.proposalEventStore.event)}
                isCreate={false}
                show={updateProposalTagsFormShow}
                onHide={() => setUpdateProposalTagsFormShow(false)} />
        </div>
  )});

export default ProposalEventTags;