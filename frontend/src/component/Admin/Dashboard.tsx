import { useEffect } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAdminProduct } from '../../store/actionsHelpers/productActionHelpers';
import { getAllOrders } from '../../store/actionsHelpers/orderActionHelpers';
import { getAllUsers } from '../../store/actionsHelpers/userActionHelpers';
import MetaData from '../layout/MetaData';
import { Doughnut, Line } from 'react-chartjs-2';

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);

  const { orders } = useAppSelector((state) => state.order);

  const { users } = useAppSelector((state) => state.user);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalAmount],
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
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className='dashboardSummaryBox2'>
            <Link to='/admin/products'>
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to='/admin/orders'>
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to='/admin/users'>
              <p>Users</p>
              <p>{users && users.length}</p>
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
