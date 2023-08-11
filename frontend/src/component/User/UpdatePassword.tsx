import { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { clearAllErrors, updatePassword } from "../../store/actionsHelpers/userActionHelpers";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { updatePasswordReset } from "../../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const UpdatePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useAppSelector((state) => state.user);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  console.log('pass?', oldPassword, newPassword, confirmPassword)

  const updatePasswordSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      })
    );
    setOpen(true);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
      dispatch(clearAllErrors());
    }

    if (isUpdated) {
      setOpen(true);
      navigate("/account");
      dispatch({
        type: updatePasswordReset,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
          {/* //TODO --fix this later-- onfailed attemp password we get "Profile Updated Successfully"  */}
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
          >
            <Alert
              severity={error ? "error" : "success"}
              onClose={handleSnackbarClose}
              sx={{ width: "100%" }}
            >
              {error ? error : "Profile Updated Successfully"}
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
