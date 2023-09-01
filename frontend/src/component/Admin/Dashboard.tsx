
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import { Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import { LinearScale } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { getAdminProduct } from '../../store/actionsHelpers/productActionHelpers';
import { getAllOrders } from '../../store/actionsHelpers/orderActionHelpers';
import { getAllUsers } from '../../store/actionsHelpers/userActionHelpers';
Chart.register(LinearScale)

const Dashboard = () => {
  const { products } = useAppSelector((state) => state.products);
  const { orders } = useAppSelector((state) => state.order)
  const { users } = useAppSelector((state) => state.allUsers)

  const dispatch = useAppDispatch();
  let outOfStock = 0;
  products &&
    products?.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);

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

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
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
              <p>{products && products.length}</p>
              {/* <p>50</p> */}
            </Link>
            <Link to='/admin/orders'>
              <p>Orders</p>
              <p>{orders?.length}</p>
            </Link>
            {/* TODO no. of users value is not updating -on dashboard page refresh  */}
            <Link to='/admin/users'>
              <p>Users</p>
              <p>{users?.length}</p>
              {/* <p>2</p> */}

            </Link>
          </div>
        </div>

        <div className='lineChart'>
          <Line data={lineState} />
        </div>

        <div className='doughnutChart'>
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
