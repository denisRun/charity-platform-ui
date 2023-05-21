import axios from 'axios'
import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { StoreComponent, useStore } from '../contexts/StoreContext'
import Header from '../components/Header'
import Body from '../components/Body'
import ImagePeople from '../images/home-page-people.png';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
  } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Metric from "../components/Statistics/Metric";
import { useTranslation } from "react-i18next";
import BodyContainer from '../components/Body/BodyContainer'
import ContentContainer from '../components/Body/ContentContainer'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

const StatisticsPage: FC = observer(() => {

    const store = useStore();
    const { t } = useTranslation();

    useEffect(() => {   
        debugger;
        const fetchStatistics = async () => {
            await store.helpEventStore.getStatistics();
          }
          fetchStatistics();
      }, []);

    
    let labels = [];
    let requests = [];
    let statistic = store.helpEventStore.statistics;

    debugger;
    if(store.helpEventStore.statistics.requests){
        for (let i = 3; i < 28; i+=4) {
        labels.push(statistic?.requests![i].date)
        let sum = statistic?.requests![i].requestsCount! + statistic?.requests![i-1].requestsCount! + statistic?.requests![i-2].requestsCount! + statistic?.requests![i-3].requestsCount!;
        requests.push(sum)
        }
    }

    const bar_data = {
      labels: labels,
      datasets: [{
        label: t("Totall requests amount"),
        data: requests,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2
      }]
    }
  
  return (
    <div>
        <Header />
        <BodyContainer>
            <ContentContainer>
              <div className='overflow-hidden'>
                <div className="d-inline-flex ms-4 mt-3 mb-4">
                <div className="me-3">
                    <Metric label={t("Requests")} value={statistic.transactionsCount!} percents={statistic.transactionsCountCompare!} isPercentsRevesred={false} />
                </div>
                <div className="me-3">
                    <Metric label={t("Completed")} value={statistic.doneTransactionsCount!} percents={statistic.doneTransactionsCountCompare!} isPercentsRevesred={false} />
                </div>
                <div className="me-3">
                    <Metric label={t("Canceled")} value={statistic.canceledTransactionCount!} percents={statistic.canceledTransactionCountCompare!} isPercentsRevesred={true} />
                </div>
                    <Metric label={t("Aborted")} value={statistic.abortedTransactionsCount!} percents={statistic.abortedTransactionsCountCompare!} isPercentsRevesred={true} />
                </div>
                <div className="row">
                  <Line data={bar_data} width={70} height={23} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </ContentContainer>
        </BodyContainer>
    </div>
  )
});

export default StatisticsPage;
