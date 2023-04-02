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
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
interface ProposalEventStatisticsProps{
    className?: string;
}

const ProposalEventStatistics: FC<ProposalEventStatisticsProps> = (props) => {

    const store = useStore();
    const [commentValue, setCommentValue]  = useState('');
    const { enqueueSnackbar } = useSnackbar()
    
    const bar_data = {
        labels: ["Positive Reviews", "Neutral Reviews", "Negative Reviews"],
        datasets: [{
            label: "Number of reviews",
            data: [1,2,3,4],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 0.5,
        }]
    }

    return (

        <Bar  data={bar_data} />
  )};

export default ProposalEventStatistics;