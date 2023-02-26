import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../contexts/StoreContext'
import Header from '../components/Header'
import Body from '../components/Body'
import TextXs from '../components/Text/TextXs'

const HomePage: FC = observer(() => {
  const navigate = useNavigate();
  const store = useStore();
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.currentTarget.value);
  }

//   const handleSearchClick = () => {
//     store.userStore.getUsers(filter);
//   }

  return (
    <div>
        <Header />
        <Body>
            <TextXs>Body text</TextXs>
        </Body>
    </div>
  )
});

export default HomePage
