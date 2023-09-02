import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAlertMessage } from '../../store/slice/user/userSlice';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SideBar from './Sidebar';

import { updateUserReset } from '../../store/slice/user/userDetailsSlice';
import {
  getUserDetails,
  updateUser,
  clearAllErrors,
} from '../../store/actionsHelpers/userActionHelpers';
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>()

  const { loading, error, user } = useAppSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useAppSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const userId = params?.id || "";

  useEffect(() => {
    if (user?._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: 'error' }));
      dispatch(clearAllErrors());
    }

    if (updateError) {
      dispatch(setAlertMessage({ message: updateError, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    //TODO below message cant see
    if (isUpdated) {
      dispatch(
        setAlertMessage({ message: 'User Updated Successfully', severity: 'success', })
      );
      navigate('/admin/users');
      dispatch(updateUserReset());
    }
  }, [dispatch, error, isUpdated, navigate, updateError, user, userId]);

  const updateUserSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email, role };
    dispatch(updateUser(userId, formData));
  };

  return (
    <Fragment>
      <MetaData title='Update User' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          {loading ? (
            <Loader />
          ) : (
            <form
              className='createProductForm'
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type='text'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value=''>Choose Role</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </div>

              <Button
                id='createProductBtn'
                type='submit'
                disabled={
                  updateLoading ? true : false || role === '' ? true : false
                }
              //  disabled={updateLoading || role === ''}

              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
