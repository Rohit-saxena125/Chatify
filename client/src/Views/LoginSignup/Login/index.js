import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "./props";
import Login from "./Login";
export default connect(mapStateToProps, mapDispatchToProps)(Login);