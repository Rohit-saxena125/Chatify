import { registerUser } from "../../../Redux/action";
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