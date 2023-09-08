import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utilities.jsx";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
  	responsive: true,
  	plugins: {
    	legend: {
      		position: 'top',
    	},
    	title: {
      		display: false,
      		text: '',
    	},
  	},
};

export default function StonkPage() {

    const { symbol } = useParams();
    const [entryData, setEntryData] = useState({});

    useEffect(() => {
      	async function fetchData() {
          	const response = await api.get(`watchlist/${symbol}`);
          	setEntryData(response.data);
      	};
      	fetchData();
    }, []);

    const labels = entryData.dates;

    const data = {
        labels,
        datasets: [
			{
				label: 'High',
				data: entryData.highs,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
          	},
          	{
				label: 'Low',
				data: entryData.lows,
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
          	},
        ],
    };

    return (
        <>
        <h2>{symbol}</h2>
        <Link to="/watchlist">Go Back</Link>
        <Line options={options} data={data} />
        </>
    );
}