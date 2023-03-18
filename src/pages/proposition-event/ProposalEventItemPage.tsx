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
import { IProposalEventUpdateResource } from '../../types/ProposalEventUpdateResource'
import ProposalEventBasicForm from '../../components/Forms/ProposalEvent/ProposalEventBasicForm'
import EditIcon from '@mui/icons-material/Edit';


const ProposalEventItemPage: FC = observer(() => {

  const store = useStore();
  const [updateProposalFormShow, setUpdateProposalFormShow] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { id }= useParams();

  useEffect(() => {   
    store.proposalEventStore.getById(id!);
    console.log(store.proposalEventStore.event)
  },[]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
          <Box sx={{ height: '100%', p: 3 }}>
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
                    <div className='col-11'>
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
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>Suggestion info</h6>} {...a11yProps(0)} />
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>Deals</h6>} {...a11yProps(1)} />
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>My Deals</h6>} {...a11yProps(2)} />
                      </Tabs>
                    </div>
                    <div className="col-0-5" >
                      <div className="btn-group">
                          <button  type="button" className="btn fs-5" data-bs-display="static" style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateProposalFormShow(true)}><EditIcon fontSize='large' /></button>
                          <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                          <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Copy link</button></li>
                          <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Complain</button></li>
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
                        Requests
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        My Requests
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
    </div>
  )
});

export default ProposalEventItemPage;
