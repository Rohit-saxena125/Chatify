import  React,{useState,useEffect} from "react";
import "./login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Grid from "@mui/material/Grid";
import { Link as NavigateTo, Navigate, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";

const Login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const { loginUser, validateLoginStatus } = props;
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
      console.log(user)
      await loginUser(user.email,user.password,navigate);
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
          </Box>
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <NavigateTo to="/signup">
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </NavigateTo>
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
};
export default Login;
