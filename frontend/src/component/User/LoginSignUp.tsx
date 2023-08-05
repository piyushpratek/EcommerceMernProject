import React, { Fragment, useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import Loader from "../layout/Loader/Loader";
import { RootState, useAppDispatch } from "../../store/store";
import { login, register, clearAllErrors } from "../../store/actionsHelpers/userActionHelpers";
import "./LoginSignUp.css";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  avatar: (File | null) | undefined;
}

const LoginSignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const users = useSelector((state: RootState) => state.user);
  const { loading, error, isAuthenticated } = users;

  const loginTab = useRef<HTMLFormElement | null>(null);
  const registerTab = useRef<HTMLFormElement | null>(null);
  const switcherTab = useRef<HTMLButtonElement | null>(null);

  const [loginEmail, setLoginEmail] = useState<string>("piyushprateek231996@gmail.com");
  const [loginPassword, setLoginPassword] = useState<string>("sample@1234");
  const [user, setUser] = useState<UserFormData>({
    name: "example",
    email: "example1@example.com",
    password: "examaple@123",
    avatar: null,
  });

  const { name, email, password, avatar } = user;

  // const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>("/Profile.png");

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register({ name, email, password, avatar }));
  };

  const registerDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            setAvatarPreview(reader.result);
          }
        };

        reader.readAsDataURL(file);
        setUser({ ...user, avatar: file });
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearAllErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated, redirect]);

  const switchTabs = (_e: React.MouseEvent<HTMLParagraphElement>, tab: string) => {
    if (tab === "login") {
      switcherTab!.current!.classList.add("shiftToNeutral");
      switcherTab!.current!.classList.remove("shiftToRight");

      registerTab!.current!.classList.remove("shiftToNeutralForm");
      loginTab!.current!.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab!.current!.classList.add("shiftToRight");
      switcherTab!.current!.classList.remove("shiftToNeutral");

      registerTab!.current!.classList.add("shiftToNeutralForm");
      loginTab!.current!.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  {avatarPreview && <img src={avatarPreview as string} alt="Avatar Preview" />}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
      {/* Snackbar for displaying alerts */}
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => dispatch(clearAllErrors())}>
        <Alert severity="error" onClose={() => dispatch(clearAllErrors())}>
          {error}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LoginSignUp;
