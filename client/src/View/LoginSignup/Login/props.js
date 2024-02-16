import { loginUser, validateLoginStatus } from '../../../Redux/action';
export const mapStateToProps = (state) => ({
  userToken: state.userToken,
  isUserLoggedIn: state.isUserLoggedIn,
});
export const mapsDispatchToProps = (dispatch) => ({
  loginUser: (email,password, navigate) => dispatch(loginUser(email,password, navigate)),
  validateLoginStatus: (navigate) => dispatch(validateLoginStatus(navigate)),
});
