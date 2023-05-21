import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../../contexts/StoreContext'
import Header from '../../components/Header'
import { Badge, Box, styled, Tab, Tabs, Typography } from '@mui/material'
import BodyContainer from '../../components/Body/BodyContainer'
import ContentContainer from '../../components/Body/ContentContainer'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProposalEventInfo from '../../components/ProposalEvent/ProposalEventInfo'
import ProposalEventTags from '../../components/ProposalEvent/ProposalEventTags'
import ProposalEventComments from '../../components/ProposalEvent/ProposalEventComments'
import { IProposalEventUpdateResource } from '../../types/ProposalEvent/ProposalEventUpdateResource'
import ProposalEventBasicForm from '../../components/Forms/ProposalEvent/ProposalEventBasicForm'
import EditIcon from '@mui/icons-material/Edit';
import ProposalEventCurrentRequests from '../../components/ProposalEvent/ProposalEventCurrentRequests'
import ProposalEventRequests from '../../components/ProposalEvent/ProposalEventRequests'
import { useLocation } from 'react-router-dom';
import { HelpEventStatusEnum } from '../../types/enums/HelpEventStatusEnum'
import { EventStatusEnum } from '../../types/enums/EventStatusEnum'
import { useTranslation } from 'react-i18next'
import { EventTypeEnum } from '../../types/enums/EventTypeEnum'
import ComplainForm from '../../components/Forms/ComplainForm'


const ProposalEventItemPage: FC = observer(() => {

  const store = useStore();
  const location = useLocation();
  const { t } = useTranslation();
  const [updateProposalFormShow, setUpdateProposalFormShow] = useState(false);
  const [complainFormShow, setComplainFormShow] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { id }= useParams();

  useEffect(() => {   
    store.proposalEventStore.getById(id!);
  },[]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopyLinkClick = async () => {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
}

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box style={{paddingTop: "0px"}} sx={{ height: '100%', p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  return (
    <div>
        <Header />
        <BodyContainer>
            <div className='ms-5' />
            <ContentContainer>
                <div className='ms-4 me-4 mt-4' style={{backgroundColor: "#FFFFFF", overflowX: "hidden"}}>
                  <div className='row ms-0'>
                    <div className='col-9'>
                      <Tabs 
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "#FFFFFF",
                            }
                            }}
                        style={{marginLeft:0}}
                        textColor="inherit"
                        indicatorColor='secondary'
                        orientation="horizontal"
                        value={tabValue}
                        onChange={handleChange}>
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>{t('Suggestion info')}</h6>} {...a11yProps(0)} />
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>{t('Requests')}</h6>} {...a11yProps(1)} />
                            <Tab disabled={store.proposalEventStore.event.status == EventStatusEnum.done || store.proposalEventStore.event.status == EventStatusEnum.inactive || store.userStore.user == null} style={{textTransform: 'none'}} label={<h6 className='fw-bold'>{t('My Current Requests')}</h6>} {...a11yProps(2)} />
                      </Tabs>
                    </div>
                    <div className="col-3 d-inline-flex justify-content-end" >
                      <div className="btn-group">
                          <button  type="button" className="btn fs-5" data-bs-display="static" hidden={store.userStore.user?.id != store.proposalEventStore.event.authorInfo?.id || store.proposalEventStore.event.status == EventStatusEnum.done} style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateProposalFormShow(true)}><EditIcon fontSize='large' /></button>
                          <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                          <li><button className="dropdown-item" type="button" onClick={() => handleCopyLinkClick()}>{t('Copy link')}</button></li>
                          <li><button className="dropdown-item" type="button" onClick={() => setComplainFormShow(true)}>{t('Complain')}</button></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <TabPanel value={tabValue} index={0}>
                      <ProposalEventInfo />
                      <ProposalEventTags className="mt-4" />
                      <ProposalEventComments comments={store.proposalEventStore.event.comments!} className="mt-4 ms-0" />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <ProposalEventRequests />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <ProposalEventCurrentRequests />
                    </TabPanel>
                  </div>
                </div>
            </ContentContainer>
            <div className='me-5' />
        </BodyContainer>
        <ProposalEventBasicForm
                item={IProposalEventUpdateResource.searchResourceConstructor(store.proposalEventStore.event)}
                isCreate={false}
                show={updateProposalFormShow}
                onHide={() => setUpdateProposalFormShow(false)} />
        <ComplainForm 
                eventId={store.proposalEventStore.event.id!}
                eventType={EventTypeEnum.proposal}
                show={complainFormShow}
                onHide={() => setComplainFormShow(false)} />
    </div>
  )
});

export default ProposalEventItemPage;
