import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Create or update profile
// ? for edit, we can do a seperate function
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    // ? history has a method called help redirect to client side route
    try {
      const config = {
        // ? if the body is using JSON.stringify
        // ? and we dont have this header: the content type will be // 'application/x-www-form-urlencoded',
        // ? which is not a JSON -> error
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        'http://localhost:5000/api/profile',
        formData,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        // ? we cant return <Naviagate> or <Redirect> as usual in action
        // history.push('/dashboard');
        // ? history is no good in react-router-dom v6 so using navigate as useNavigate()
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }
    }
  };
