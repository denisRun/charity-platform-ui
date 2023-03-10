import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../../contexts/StoreContext'
import Header from '../../components/Header'
import Body from '../../components/Body'

const ProposalSearchPage: FC = observer(() => {
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
        
    </div>
  )
});

export default ProposalSearchPage;
