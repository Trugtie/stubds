import LoginFormLogo from "./LoginLogo.svg";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinkUI from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from '@mui/material/styles';
import "./LoginForm.css"

import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/staffSlice";
import { HTTP_STATUS, API_URL } from '../../redux/constants';


function LoginForm() {
  const dispatch = useDispatch();

  const [username, setTaikhoan] = useState("")
  const [password, setMatkhau] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    onLogin()
  }

  const onLogin = () => {
    if (username === "" || password === "") {
      return
    } else {
      dispatch(login({ username, password }))
    }
  }


  const LoginButton = styled(Button)({
    backgroundColor: 'var(--button-color)',
    margin: '36px 0px',
    borderRadius: '0',
    fontWeight: '700',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: 'var(--button-green-color)',
    },
  });
  return (
    <div className="login-form__container">
      <form onSubmit={e => onSubmit(e)}  >
        <img src={LoginFormLogo} className="login-logo" />
        <div className="login-form__bg">
          <div className='login-username'>
            <PersonIcon className='person-icon' /><span className='loginInput-label'>Tên đăng nhập</span>
          </div>
          <TextField
            id="username"
            label="Username"
            variant="filled"
            placeholder="Nhập tên tài khoản..."
            onChange={(e) => setTaikhoan(e.target.value)}
            required
            fullWidth
            sx={{
              backgroundColor: '#fff'
            }}
          />
          <div className='login-password'>
            <LockIcon className='person-icon' /> <span className='loginInput-label'>Mật khẩu</span>
          </div>
          <TextField
            id="password"
            label="Password"
            variant="filled"
            type="password"
            placeholder="Nhập mật khẩu..."
            onChange={(e) => setMatkhau(e.target.value)}
            required
            fullWidth
            sx={{
              backgroundColor: '#fff'
            }}
          />
          <br />
          <br />
          {useSelector(state => state.Staff.status === HTTP_STATUS.PENDING ?
            <LinearProgress color="inherit" />
            : '')}

          <LoginButton variant="contained" fullWidth type="submit">ĐĂNG NHẬP</LoginButton>
          <h4 style={{ color: "red" }}>{useSelector(state => state.Staff.status === HTTP_STATUS.REJECTED ? "Sai tên đăng nhập hoặc mật khẩu" : "")}</h4>

          <br />
          <LinkUI underline="none">
            Quên mật khẩu ?
          </LinkUI>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
