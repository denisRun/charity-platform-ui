import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../contexts/StoreContext";
import HelpEventRequestCard from "../Cards/HelpEventRequestCard";
import { useTranslation } from "react-i18next";

const HelpEventRequests: FC = observer(() => {

    const store = useStore();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const requestsCount = store.helpEventStore.event.transactions?.length ?? 0;
    
    return (
        <>
            <div className='col-9 mt-1 ms-1'>
                <h5 hidden={requestsCount != 0}>
                    {t('There is no Active Iitems')}
                </h5>
            </div>
            <div className="mt-3">
                {store.helpEventStore.event.transactions!
                    .slice()
                    .sort((x,y) => x.creationDate! < y.creationDate! ? 1 : -1)
                    .map((trans) => (
                        <HelpEventRequestCard item={trans} needs={store.helpEventStore.event.needs!} isPreview={true} key={trans.id!}/>            
                ))}
            </div>
        </>
  )});

export default HelpEventRequests;