import { Pagination } from "@mui/material";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
import waiting from '../../images/waiting.png';
import success from '../../images/success.png';
import { useTranslation } from "react-i18next";

interface HelpEventNeedsProps{
    className?: string
}

const HelpEventNeeds: FC<HelpEventNeedsProps> = observer((props) => {

    const store = useStore();
    const { t } = useTranslation();

    return (
        <div className={props.className} style={{fontSize:17}}>
            <h4>
                {t('Needs')}:
            </h4>
            <div className='row mt-1'>
                {store.helpEventStore.event?.needs!
                        .map((need) => (
                            <div className='col-6 d-inline-flex justify-content-center'>
                                <img src={need.amount == need.receivedTotal ? success : waiting} className="" style={{width:35, height:35}} />
                                <h5 className="fw-bold ms-3 me-1 mt-2"> {need.title}: </h5>
                                <h5 className="ms-1 mt-2"> <span className="fw-normal">{need.receivedTotal} / {need.amount} {need.unit}</span></h5>
                            </div>
                ))}
            </div>
        </div>
  )});

export default HelpEventNeeds;