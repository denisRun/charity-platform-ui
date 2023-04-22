import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../../contexts/StoreContext'
import Header from '../../components/Header'
import { Badge, Box, styled, Tab, Tabs, Typography } from '@mui/material'
import BodyContainer from '../../components/Body/BodyContainer'
import ContentContainer from '../../components/Body/ContentContainer'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useLocation } from 'react-router-dom';
import HelpEventInfo from '../../components/HelpEvent/HelpEventInfo'
import HelpEventTags from '../../components/HelpEvent/HelpEventTags'
import HelpEventComments from '../../components/HelpEvent/HelpEventComments'
import HelpEventNeeds from '../../components/HelpEvent/HelpEventNeeds'
import HelpEventUpdateForm from '../../components/Forms/HelpEvent/HelpEventUpdateForm'
import HelpEventCurrentRequests from '../../components/HelpEvent/HelpEventCurrentRequests'
import HelpEventRequests from '../../components/HelpEvent/HelpEventRequests'


const HelpEventItemPage: FC = observer(() => {

  const store = useStore();
  const location = useLocation();
  const [updateHelpFormShow, setUpdateHelpFormShow] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { id }= useParams();

  useEffect(() => {   
    store.helpEventStore.getById(id!);
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
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>Requests</h6>} {...a11yProps(1)} />
                            <Tab style={{textTransform: 'none'}} label={<h6 className='fw-bold'>My Current Requests</h6>} {...a11yProps(2)} />
                      </Tabs>
                    </div>
                    <div className="col-1" >
                      <div className="btn-group">
                          <button  type="button" className="btn fs-5" data-bs-display="static" hidden={store.userStore.user?.id != store.helpEventStore.event.authorInfo?.id} style={{visibility: store.userStore.user==null ? "hidden" : "visible"}} onClick={() => setUpdateHelpFormShow(true)}><EditIcon fontSize='large' /></button>
                          <button type="button" id="userProfileActions" className="btn fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"><MoreVertIcon fontSize='large' /></button>
                          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userProfileActions">
                          <li><button className="dropdown-item" type="button" onClick={() => handleCopyLinkClick()}>Copy link</button></li>
                          <li><button className="dropdown-item" type="button" onClick={() => console.log()}>Complain</button></li>
                          </ul>
                      </div>
                    </div>
                  </div>
                  <div>
                    <TabPanel value={tabValue} index={0}>
                      <HelpEventInfo />
                      <HelpEventNeeds className="mt-4" />
                      <HelpEventTags className="mt-4" />
                      <HelpEventComments comments={store.helpEventStore.event.comments!} className="mt-4 ms-0" />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <HelpEventRequests />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <HelpEventCurrentRequests />
                    </TabPanel>
                  </div>
                </div>
            </ContentContainer>
            <div className='me-5' />
        </BodyContainer>
        <HelpEventUpdateForm
                item={store.helpEventStore.event}
                show={updateHelpFormShow}
                onHide={() => setUpdateHelpFormShow(false)} />
    </div>
  )
});

export default HelpEventItemPage;
