import axios from "axios";
import { BASE_URL } from "../../assets/BASE_URL";

// Action Types
export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

// Action Creators
export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: "No token found" });
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: "No token found" });
    return;
  }

  try {
    const response = await axios.put(`${BASE_URL}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_FAILURE, payload: error.message });
  }
};
