import { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { Alert, Snackbar } from '@mui/material';
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { clearAllErrors, resetPassword } from "../../store/actionsHelpers/userActionHelpers";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { error, success, loading } = useAppSelector((state) => state.user);
  const navigate = useNavigate()
  const params = useParams<{ token: string }>()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
  };
  const resetPasswordSubmit = (e: any) => {
    e.preventDefault();

    dispatch(resetPassword({ token: params.token!, password, confirmPassword }));
    setOpen(true);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      dispatch(clearAllErrors());
    }
    if (success) {
      setOpen(true);
      navigate("/login")
    }
  }, [dispatch, error, navigate, success]);

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
                <button
                  className="resetPasswordBtn"
                  onClick={resetPasswordSubmit}
                >Update
                </button >
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
