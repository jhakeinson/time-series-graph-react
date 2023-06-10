import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartData,
} from 'chart.js';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import IntervalSelector from './interval-selector';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

interface TimeSeriesGraphProps {
  dataset: IDatasetOption;
}

export interface IDatasetOption {
  function: string;
  label: string;
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ dataset }) => {
  const [unit, setUnit] = useState('');
  const [title, setTitle] = useState('');
  const [dates, setDates] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [interval, setInterval] = useState('monthly');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://www.alphavantage.co/query', {
      params: {
        function: dataset.function,
        interval,
        apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY,
      },
    }).then((response) => {
        const { data } = response;
        if (data['Note']) {
          setError(data['Note']);
        } else {
          updateChartData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataset, interval]);

  const updateChartData = (data: any) => {
    setUnit(data.unit);
    setTitle(data.name);
    setDates(data.data.map((item: any) => item.date));
    setValues(data.data.map((item: any) => parseFloat(item.value)));
  };

  const options = {
    responsive: true,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  // Chart data
  const chartData: ChartData<"line", number[], string> = {
    labels: dates,
    datasets: [
      {
        label: unit,
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointStyle: false,
        type: 'line',
      },
    ],
  };

  return (
    <Box>
      <IntervalSelector interval={interval} setInterval={setInterval} />
      <Paper elevation={3} style={{padding: '2rem'}}>
        <div>
          <Line options={options} data={chartData} />
        </div>
      </Paper>
        {error && (
          <Box mt={2}>
            <Alert onClose={() => {setError('')}} severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Box>
        )}
    </Box>
  );
};

export default TimeSeriesGraph;
