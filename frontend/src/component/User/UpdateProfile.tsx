import { Fragment, useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import {
  clearAllErrors,
  updateProfile,
  loadUser
} from "../../store/actionsHelpers/userActionHelpers";
import { updateProfileReset } from "../../store/slice/userSlice";
import MetaData from "../layout/MetaData";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  const { error, isUpdated, loading } = useAppSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("/Profile.png");

  const updateProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, avatar }));
  };

  const updateProfileDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          setAvatarPreview(reader.result);
          setAvatar(file);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar.url);
      }
    }

    if (error) {
      <Alert severity="error">{error}</Alert>
      dispatch(clearAllErrors());
    }

    if (isUpdated) {
      <Alert severity="success">Profile Updated Successfully</Alert>
      dispatch(loadUser());

      navigate("/account");

      dispatch(updateProfileReset());
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>

          <Snackbar open={!!error || isUpdated} autoHideDuration={6000} onClose={() => dispatch(clearAllErrors())}>

            <Alert onClose={() => dispatch(clearAllErrors())} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
              {error ? error : "Profile Updated Successfully"}
            </Alert>
          </Snackbar>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
