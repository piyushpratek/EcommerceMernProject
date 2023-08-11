import { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { Alert, Snackbar } from '@mui/material';
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { clearAllErrors, resetPassword } from "../../store/actionsHelpers/userActionHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useParams } from "react-router-dom";


const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const params = useParams()
  const { error, success, loading } = useAppSelector((state) => state.user);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  interface ResetPassword {
    token: string;
    password: string;
    confirmPassword: string;
    passwords: string

  }
  const resetPasswordSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    //   dispatch(resetPassword(params?.token));
    //   setOpen(true);
    // };
    if (params?.token) {
      const resetPasswordData: ResetPassword = {
        token: params.token,
        password: 'newPassword',
        confirmPassword: 'newPassword',
        passwords: ""

      }
      dispatch(resetPassword(resetPasswordData));
      setOpen(true);
    } else {

      console.error("Token is missing.");

    }
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      dispatch(clearAllErrors());
    }
    if (success) {
      setOpen(true);
    }
  }, [dispatch, error, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
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
              {error ? error : "Password Updated Successfully"}
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
