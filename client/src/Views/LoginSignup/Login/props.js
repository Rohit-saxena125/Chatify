import { loginUser, validateLoginStatus } from '../../../Redux/Action';
export const mapStateToProps = (state) => ({
  userToken: state.userToken,
  isUserLoggedIn: state.isUserLoggedIn,
});
export const mapDispatchToProps = (dispatch) => ({
  loginUser: (email,password, navigate) => dispatch(loginUser(email,password, navigate)),
  validateLoginStatus: (navigate) => dispatch(validateLoginStatus(navigate)),
});
