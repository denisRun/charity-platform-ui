import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../contexts/StoreContext'
import Header from '../components/Header'
import Body from '../components/Body'
import ImagePeople from '../images/home-page-people.png';
import { useTranslation } from 'react-i18next'
import AdminHeader from '../components/AdminHeader'
import { Button, Container } from "react-bootstrap";
import ComplaintCard from '../components/Cards/ComplaintCard'

const AdminPage: FC = observer(() => {

  const { t } = useTranslation();
  const store = useStore();

  useEffect(() => {   
    debugger;
    const fetchStatistics = async () => {
        await store.adminStore.getComplaints();
      }
      fetchStatistics();
  }, []);
  
  return (
    <div>
        <AdminHeader />
        <Body>
        <Container className="mt-3" fluid>
            <div>
                {store.adminStore.complaints.complaints?.length == 0 ?
                <h5 className='ms-4'> {t('No results found')}</h5> :
                store.adminStore.complaints.complaints!
                    .map((complain) => (
                        <ComplaintCard onClick={() => console.log()} item={complain} key={complain.eventID!.toString()}/>            
                ))}
            </div>
        </Container>
        </Body>
    </div>
  )
});

export default AdminPage;
