import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import EditIcon from '@mui/icons-material/Edit';
import { HelpEventTagsEnum } from "../../types/enums/HelpEventTagsEnum";
import HelpEventTagsForm from "../Forms/HelpEvent/HelpEventTagsForm";
import { HelpEventStatusEnum } from "../../types/enums/HelpEventStatusEnum";

interface HelpEventTagsProps{
    className?: string
}

const HelpEventTags: FC<HelpEventTagsProps> = observer((props) => {

    const store = useStore();
    const [updateHelpTagsFormShow, setUpdateHelpTagsFormShow] = useState(false);
    
    return (
        <div className={props.className} style={{fontSize:17}}>
            <h4>
                Tags:
                <button  type="button" className="btn fs-5 mb-2" data-bs-display="static" hidden={store.userStore.user?.id != store.helpEventStore.event.authorInfo?.id || store.helpEventStore.event.status == HelpEventStatusEnum.done} style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateHelpTagsFormShow(true)}><EditIcon fontSize='large' /></button>
            </h4>
            <div className='row mt-1'>
                <div className='col-4 d-inline-flex justify-content-center'>
                    <h5 className="fw-bold"> Location: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.location)?.values?.join("").length == 0 ? "None" : store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.location)?.values?.map(x => x == "" ? "None" : x).join(", ")}</span></h5>
                </div>
                <div className='col-4 d-inline-flex justify-content-center'>
                    <h5 className="fw-bold"> Topic: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{[null, 0, -1].includes(store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.topic)?.values?.length ?? -1) ? "None": store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.topic)?.values?.join(", ")}</span> </h5>
                </div>
                <div className='col-4 d-inline-flex justify-content-center'>
                    <h5 className="fw-bold"> Age: </h5>
                    <h5 className="ms-1"> <span className="fw-normal">{[null, 0, -1].includes(store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.ageGroup)?.values?.length ?? -1) ? "None": store.helpEventStore.event.tags?.find(x => x.title == HelpEventTagsEnum.ageGroup)?.values?.join(", ")}</span> </h5>
                </div>
            </div>
            <HelpEventTagsForm
                items={store.helpEventStore.event.tags}
                isSearch={false}
                show={updateHelpTagsFormShow}
                onHide={() => setUpdateHelpTagsFormShow(false)} />
        </div>
  )});

export default HelpEventTags;