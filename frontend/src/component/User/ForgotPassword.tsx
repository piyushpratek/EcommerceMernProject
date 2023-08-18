import { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { clearAllErrors, forgotPassword } from "../../store/actionsHelpers/userActionHelpers";
import MetaData from "../layout/MetaData";
import { useAppDispatch, useAppSelector } from "../../store/store";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
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

        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
