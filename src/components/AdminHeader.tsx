import { Badge } from '@mui/material';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';
import logo from '../images/logo.svg';
import LoginForm from './Forms/User/LoginForm';
import SignupForm from './Forms/User/SignupForm';
import TextLarge from './Text/TextLarge';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsForm from './Forms/User/NotificationsForm';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import AdminLoginForm from './Forms/Admin/AdminLoginForm';

interface IAppProps {
}

const AdminHeader: React.FunctionComponent<IAppProps> = observer((props) => {

  const [loginFormShow, setLoginFormShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const store = useStore();
  const { i18n, t } = useTranslation();

  const handleLogout = async () => {

    await store.adminStore.logout()
    if(store.adminStore.user == null){
        enqueueSnackbar("You are logged out.", { variant: 'success'})
    } else {
        enqueueSnackbar("Failed to logout.", { variant: 'error'})
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <Navbar className="ms-4 me-4" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/admin">
            <img src={logo} style={{ width: 150, height:30 }} />
            <span className='ms-3 fw-bold'>Admin Console</span>
        </Navbar.Brand>
        <Navbar className="justify-content-end">
          <div className="btn-group">
            <button type="button" id="userLanguageAction" className="btn dropdown-toggle fs-6" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">{i18n.language.toUpperCase()}</button>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="userLanguageAction">
              <li><button className="dropdown-item" type="button" onClick={() => changeLanguage("en")}>{t('English')}</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => changeLanguage("ua")}>{t('Ukrainian')}</button></li>
            </ul>
          </div>
          {store.adminStore.user == null ? 
            <>
              <Button className="" style={{width:125}}  variant="outline-success" onClick={() => setLoginFormShow(true)}>
                 {t('Login')} 
              </Button>
            </> : 
            <div>
              <div className="btn-group">
                <button type="button" id="userProfileActions" className="btn dropdown-toggle fs-5" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">{store.adminStore?.user?.firstName + " " + store.adminStore?.user?.secondName + "   "}</button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="userProfileActions">
                  <li><button className="dropdown-item" type="button" onClick={() => handleLogout()}>{t('Logout')}</button></li>
                </ul>
              </div>
            </div>
          }
        </Navbar>
      </Container>
      <AdminLoginForm
        show={loginFormShow}
        onHide={() => setLoginFormShow(false)} />
    </Navbar>
  );
});

export default AdminHeader;
