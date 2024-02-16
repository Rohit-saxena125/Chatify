import Login from "./Login";
import {connect} from "react-redux";
import { mapsDispatchToProps} from "./props";
export default connect(null,mapsDispatchToProps)(Login);