import  React,{useState,useEffect} from "react";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const { loginUser, validateLoginStatus,isUserLoggedIn } = props;
  useEffect(() => {
    const checkIsUserLoggedIn = async () => {
      try {
        await validateLoginStatus(navigate);
        setLoginStatus(true);
      }
      catch (er) {
        setLoginStatus(false);
      }
    }
    checkIsUserLoggedIn();
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const email = user.email;
      const password = user.password;
      console.log(user,isUserLoggedIn)
      await loginUser(email,password,navigate);
      console.log("Login Success");
    }
    catch (er) {
      console.log('login failed',er);
    }
  };
  return (
    <div className="login">
      <div className="Login-card">
        <div>
          <Stack spacing={2} direction="row">
            <Avatar sx={{ bgcolor: deepPurple[500], width: 60, height: 60 }}>
              <VpnKeyIcon />
            </Avatar>
          </Stack>
        </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </div>
            <div>
              <TextField
                required
                fullWidth
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={user.password}
                autoComplete="current-password"
              />
            </div>
            <div>
              <Stack spacing={2} direction="row">
                <Button type="submit" fullWidth variant="contained">
                  Login
                </Button>
              </Stack>
            </div>
            <div className="main" >
              <Stack spacing={2} direction="row">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  If you don't have account?Signup
                </Button>
              </Stack>
            </div>
          </Box>
      </div>
    </div>
  );
};
export default Login;
