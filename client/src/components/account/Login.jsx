import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { API } from "../../service/api";
import { useState,useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  margin-top:40px;
`;
const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;
const SignupButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: white;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const loginInitialValues = {
  username: '',
  password: '',
};
 const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      showError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
    }
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });
      isUserAuthenticated(true);
      navigate("/");
    } else {
      showError("Something went wrong! please try again later");
    }
  };

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  return (
    <Component>
      <Image src={imageURL} alt="login" />
      {account === "login" ? (
        <Wrapper>
          <TextField
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="username"
            label="Enter Username"
            value={login.username}
          />
          <TextField
            variant="standard"
            onChange={(e) => onValueChange(e)}
            name="password"
            value={login.password}
            label="Enter Password"
          />

          {error && <Error>{error}</Error>}
          <LoginButton variant="contained" onClick={() => loginUser()}>
            Login
          </LoginButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <SignupButton onClick={() => toggleSignup()}>
            Create an account
          </SignupButton>
        </Wrapper>
      ) : (
        <Wrapper>
          <TextField
            variant="standard"
            label="Enter the name"
            onChange={(e) => onInputChange(e)}
            value={signup.name}
            name="name"
          />
          <TextField
            variant="standard"
            label="Enter username"
            onChange={(e) => onInputChange(e)}
            value={signup.username}
            name="username"
          />
          <TextField
            variant="standard"
            label="Enter password"
            onChange={(e) => onInputChange(e)}
            value={signup.password}
            name="password"
          />
          <SignupButton onClick={() => signupUser()}>Sign up</SignupButton>

          <Text style={{ textAlign: "center" }}>OR</Text>
          <SignupButton variant="contained" onClick={() => toggleSignup()}>
            Already have account
          </SignupButton>
        </Wrapper>
      )}
    </Component>
  );
};

export default Login;