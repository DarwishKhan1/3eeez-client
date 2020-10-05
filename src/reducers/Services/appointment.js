import { CREATE_APPOINTMENT, GET_APPOINTMENTS, GET_APPOINTMENT,DELETE_APPOINTMENT } from "../../actions/types";

const intialState = {
  loading: true,
  appointments: [],
  appointment: null,
  error: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_APPOINTMENT:
      return {
        ...state,
        loading: false,
        appointment: payload,
      };
    case GET_APPOINTMENTS:
      return {
        ...state,
        loading: false,
        appointments: payload,
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        loading: false,
        appointment: payload,
      };

      case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (ser) => ser._id !== payload
        ),
        loading: false,
      };
    default:
      return state;
  }
}
