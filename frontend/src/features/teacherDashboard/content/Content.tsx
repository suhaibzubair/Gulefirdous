import React from 'react';
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
import { ReactComponent as RevenueArrow } from '../../../assets/images/stats-down-arrow.svg';
import CustomButton from '../../../components/shared/button/Button';
import { PoweroffOutlined } from '@ant-design/icons';
import './Content.scss';

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
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
    scales: {
      y: {
        ticks: {
          callback: (value: any) => `$${value / 1000}k`,
        },
      },
    },
  },
};

const labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 2',
      data: [212, 2312, 213, 2323, 123, 2332, 3213, 3214, 214, 324],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const cardData = [
  { value: 16, text: 'No of courses' },
  { value: 32, text: 'Enrollments' },
  { value: 16, text: 'No of courses' },
  { value: 32, text: 'Enrollments' },
  // Add more data objects as needed
];


export default function Content() {
  return (
    <div className="teacher-dashboard-content-wraper">
      <div className="welcome-bar-wraper">
        <div className="welcome-section">
          <span className="name-text">Hi Nouman</span>
          <h2 className="welcome-msg">Welcome back 👋</h2>
        </div>
        <div className="add-course-event-section">
          <CustomButton variant="primary" className="add-btns" onClick={() => { }}>
            <span className="icon">+</span>Add Course
          </CustomButton>
          <CustomButton variant="primary" className="add-btns" onClick={() => { }}>
            <span className="icon">+</span>Add Event
          </CustomButton>
        </div>
      </div>
      <div className="detail-cards">
      {[...Array(cardData.length).keys()].map((index) => (
        <div className="card-item-wraper" key={index}>
          <div className="card-item">
            <span className="icon">
              <PoweroffOutlined style={{ fontSize: '32px' }} />
            </span>
            <div className="text-wraper">
              <h2 className="value">{cardData[index].value}</h2>
              <p className="text-content">{cardData[index].text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

      <div className="revenue-chart-container">
        <div className="overall-stats">
          <div className="total-revenue">
            <p>Net Revenue</p>
            <h1>$58746</h1>
          </div>
          <div className="selected-period-revenue">
            <span>
              <RevenueArrow />
            </span>{' '}
            <span className="est-value">19.9%</span>
            <br /> in selected period
          </div>
        </div>
        <div className="revenue-chart">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
