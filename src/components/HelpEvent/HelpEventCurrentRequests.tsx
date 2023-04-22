import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import { RequestStatusEnum } from "../../types/enums/RequestStatusEnum";
import HelpEventRequestCard from "../Cards/HelpEventRequestCard";
import { useSnackbar } from "notistack";

const HelpEventCurrentRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleAddRequestClick = () => {

        store.helpEventStore.addEventRequest();
        if(store.helpEventStore.isError){
            enqueueSnackbar("Failed to create request.", { variant: 'error'})
        } else {
            enqueueSnackbar("Request created.", { variant: 'success'})
        }
    }

    let requests = store.helpEventStore.event.transactions!
        .filter(x => (x.responder.id == store.userStore.user?.id || x.receiver.id == store.userStore.user?.id) && (x.transactionStatus == RequestStatusEnum.waiting || x.transactionStatus == RequestStatusEnum.waitingForApprove || x.transactionStatus == RequestStatusEnum.inProcess))
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
                    <Button variant="success" hidden={store.helpEventStore.event.authorInfo?.id == store.userStore.user?.id} disabled={store.userStore.user == null} className="w-100" onClick={() => handleAddRequestClick()}>
                        + Create request 
                    </Button>
                </div>
            </div>
            <div className="mt-3">
                {requests
                    .map((trans) => (
                        <HelpEventRequestCard item={trans} needs={store.helpEventStore.event.needs!} isPreview={false} key={trans.id!}/>            
                ))}
            </div>
        </>
  )});

export default HelpEventCurrentRequests;