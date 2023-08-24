
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import { LinearScale } from 'chart.js';
Chart.register(LinearScale)

const Dashboard = () => {

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, 4000],
      },
    ],
  };
  return (
    <div className='dashboard'>
      <MetaData title='Dashboard - Admin Panel' />
      <Sidebar />

      <div className='dashboardContainer'>
        <Typography component='h1'>Dashboard</Typography>

        <div className='dashboardSummary'>
          <div>
            <p>
              Total Amount <br /> ₹2000
              {/* {totalAmount} */}
            </p>
          </div>
          <div className='dashboardSummaryBox2'>
            <Link to='/admin/products'>
              <p>Product</p>
              {/* <p>{products && products.length}</p> */}
              <p>50</p>
            </Link>
            <Link to='/admin/orders'>
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
              <p>4</p>

            </Link>
            <Link to='/admin/users'>
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
              <p>2</p>

            </Link>
          </div>
        </div>

        <div className='lineChart'>
          <Line data={lineState} />
        </div>

        {/* <div className='doughnutChart'>
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
