import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../contexts/StoreContext'
import Header from '../components/Header'
import Body from '../components/Body'
import ImagePeople from '../images/home-page-people.png';
import { useTranslation } from 'react-i18next'

const HomePage: FC = observer(() => {

  const { t } = useTranslation();
  
  return (
    <div>
        <Header />
        <Body>
            <p className="black"
               style={{position:"absolute", top:180, left:40, fontSize:50, fontWeight:"bold"}}>
                {t('We are united for you')} 
            </p>
            <p className="black"
               style={{position:"absolute", top:280, left:40, fontSize:30, maxWidth:400}}>
                {t('Together making the world a better place to live')}
            </p>
            <p className="black"
               style={{position:"absolute", bottom:70, left:40, fontSize:20}}>
                {t('Over 1000 users are already here. Join us now')}
            </p>   
            <img src={ImagePeople}
                style={{position:"absolute", bottom:0, right:20,  width: "60%", height:"75%"}} />         
        </Body>
    </div>
  )
});

export default HomePage
