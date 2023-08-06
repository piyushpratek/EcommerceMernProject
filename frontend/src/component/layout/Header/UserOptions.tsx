import { Fragment, useState } from "react";
import "./Header.css";
import { Alert, Snackbar } from "@mui/material";
import { logout } from "../../../store/actionsHelpers/userActionHelpers";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user }) => {
  const { cartItems } = useAppSelector((state) => state.cart);

  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    setOpen(false);
    setLogoutSuccess(true);
    setTimeout(() => setLogoutSuccess(false), 3000);
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url ? user?.avatar?.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
      <Snackbar
        open={logoutSuccess}
        autoHideDuration={3000}
        onClose={() => setLogoutSuccess(false)}
      >
        <Alert
          onClose={() => setLogoutSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Logout Successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={Boolean(cartItems.length)}
        autoHideDuration={6000}
        onClose={() => { }}
      >
        <Alert
          onClose={() => { }}
          severity="info"
          sx={{ width: '100%' }}
        >
          You have items in your cart.
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default UserOptions;
