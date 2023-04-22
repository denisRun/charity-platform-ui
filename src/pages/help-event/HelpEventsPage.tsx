import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../../contexts/StoreContext'
import Header from '../../components/Header'
import Body from '../../components/Body'
import { Menu, MenuItem, ProSidebarProvider, Sidebar, useProSidebar } from 'react-pro-sidebar'
import { Badge, Box, Tab, Tabs, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BodyContainer from '../../components/Body/BodyContainer'
import SidebarContainer from '../../components/Body/SidebarContainer'
import ContentContainer from '../../components/Body/ContentContainer'
import MyHelpEvents from '../../components/HelpEvent/MyHelpEvents'
import SearchHelpEvents from '../../components/HelpEvent/SearchHelpEvents'
import { IHelpSearchRequest } from '../../types/HelpEvent/HelpSearchRequest'
import TookPartInHelpEvents from '../../components/HelpEvent/TookPartInHelpEvents'
import HelpEventStatistics from '../../components/HelpEvent/HelpEventStatistics'

const HelpEventsPage: FC = observer(() => {

  const store = useStore();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {   
    let searchRequestTakingPart = new IHelpSearchRequest();
    searchRequestTakingPart.takingPart = true;
    let searchRequest = new IHelpSearchRequest();
    searchRequest.tags = store.userStore.user?.helpEventSearchValues ?? [];
    store.helpEventStore.searchEvents(searchRequest);
    store.helpEventStore.getStatistics();
    store.helpEventStore.getOwnEvents();
    store.helpEventStore.searchEvents(searchRequestTakingPart);
  }, []);

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
            <SidebarContainer>
                <Tabs 
                TabIndicatorProps={{
                    style: {
                        backgroundColor: "#F4BB3A"
                    }
                    }}
                textColor="inherit"
                indicatorColor='secondary'
                orientation="vertical"
                value={tabValue}
                onChange={handleChange}>
                    <Tab title='Search' icon={<SearchIcon fontSize='large' />} {...a11yProps(0)} />
                    <Tab disabled={store.userStore.user == null} title='My Help Events' icon={<PermIdentityIcon fontSize='large' />} {...a11yProps(1)} />
                    <Tab disabled={store.userStore.user == null} title='I helped' icon={<GroupsIcon fontSize='large' />} {...a11yProps(2)} />
                    <Tab disabled={store.userStore.user == null} title='My statistics' icon={<QueryStatsIcon fontSize='large' />} {...a11yProps(3)} />
                </Tabs>
            </SidebarContainer>
            <ContentContainer>
                <TabPanel value={tabValue} index={0}>
                    <SearchHelpEvents />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <MyHelpEvents />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TookPartInHelpEvents />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    <HelpEventStatistics />
                </TabPanel>
            </ContentContainer>
        </BodyContainer>
    </div>
  )
});

export default HelpEventsPage;
