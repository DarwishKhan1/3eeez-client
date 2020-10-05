import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  ADD_SERVICES,
  DELETE_SERVICE,
  AUTH_ERROR,
  GET_CURRENT_PROFILE,
  CREATE_PROFILE,
  EDIT_PROFILE,
  GET_SERVICES,
  GET_LIMITED_PROFILES,
  GET_PROFILES,
  GET_SPECIFIC_PROFILE,
  GET_SPECIFIC_SERVICE,
} from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isServiceProvider: null,
  loading: true,
  user: null,
  profile: null,
  service: null,
  profileServices: [],
  profiles: [],
  services: [],
};

export default function (state = intialState, action) {
  const { type, payload, isServiceProvider } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isServiceProvider: isServiceProvider,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
      };
    case GET_CURRENT_PROFILE:
    case GET_SPECIFIC_PROFILE:
    case EDIT_PROFILE:
    case CREATE_PROFILE:
    case ADD_SERVICES:
      return {
        ...state,
        profile: payload,
        profileServices: payload.services,
        loading: false,
      };
    case GET_SPECIFIC_SERVICE:
      return {
        ...state,
        service: payload,
        loading: false,
      };
    case GET_SERVICES:
      return {
        ...state,
        services: payload,
        loading: false,
      };
    case DELETE_SERVICE:
      return {
        ...state,
        profileServices: state.profileServices.filter(
          (ser) => ser._id !== payload
        ),
        loading: false,
      };
    case GET_LIMITED_PROFILES:
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    default:
      return state;
  }
}
