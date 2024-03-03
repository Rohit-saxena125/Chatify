import { registerUser } from "../../../Redux/Action";
export const mapStateToProps = (state) => {
  return {
    userRegistrationSuccessful: state.userRegistrationSuccessful,
    activeUserDetails: state.activeUserDetails,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user, navigate) => dispatch(registerUser(user, navigate)),
  };
};