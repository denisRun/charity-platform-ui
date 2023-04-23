import { observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useStore } from "../../contexts/StoreContext";
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
import Metric from "../Statistics/Metric";
import { useTranslation } from "react-i18next";

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
interface HelpEventStatisticsProps{
    className?: string;
}

const HelpEventStatistics: FC<HelpEventStatisticsProps> = (props) => {

    const store = useStore();
    const { t } = useTranslation();

    let labels = [];
    let requests = [];
    let statistic = store.helpEventStore.statistics;

    for (let i = 3; i < 28; i+=4) {
      labels.push(statistic?.requests![i].date)
      let sum = statistic?.requests![i].requestsCount! + statistic?.requests![i-1].requestsCount! + statistic?.requests![i-2].requestsCount! + statistic?.requests![i-3].requestsCount!;
      requests.push(sum)
    }

    const bar_data = {
      labels: labels,
      datasets: [{
        label: t("Your Help support"),
        data: requests,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2
      }]
    }

    return (
      <>
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
          <Line data={bar_data} width={100} height={35} options={{ maintainAspectRatio: false }} />
        </div>
      </>
  )};

export default HelpEventStatistics