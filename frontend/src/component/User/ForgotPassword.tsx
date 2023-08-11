import { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { clearAllErrors, forgotPassword } from "../../store/actionsHelpers/userActionHelpers";
import { Alert, Snackbar } from '@mui/material';
import MetaData from "../layout/MetaData";
import { useAppDispatch, useAppSelector } from "../../store/store";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const { error, message, loading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  const forgotPasswordSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    setOpen(true);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      dispatch(clearAllErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
          >
            <Alert
              severity={error ? "error" : "success"}
              onClose={handleSnackbarClose}
              sx={{ width: '100%' }}
            >
              {error ? error : message}
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
