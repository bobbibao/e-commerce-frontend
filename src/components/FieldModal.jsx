import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Container, Typography, Divider, Box, IconButton, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { toast } from "react-toastify";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "rgb(25, 30, 36)",
    boxShadow: '0 20px 60px -2px rgba(27,33,58,.4)',
    padding: theme.spacing(2, 4, 3),
    borderRadius: '8px',
    minWidth: 550
  },
  textfield: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5f6368',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(252, 213, 53)',
      },
      color: 'white !important',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'rgb(252, 213, 53)',
    }
  },
  label: {
    marginTop: 8,
    color: 'white',
  },
  button: {
    boxShadow: 'none',
    marginLeft: '1rem'
  }
}));

export default function FieldModal(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.label === "Mật khẩu" ? "" : props.value || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    const validatePassword = () => {
      if (value === "") return "Vui lòng nhập mật khẩu cũ";
      if (newPassword === "") return "Vui lòng nhập mật khẩu mới";
      if (confirmPassword === "") return "Vui lòng nhập mật khẩu xác nhận";
      if (newPassword !== confirmPassword) return "Mật khẩu mới và mật khẩu xác nhận không khớp";
      if (newPassword.length < 6) return "Mật khẩu mới phải có ít nhất 6 ký tự";
      return null;
    };
  
    if (props.label === "Mật khẩu") {
      const error = validatePassword();
      if (error) {
        toast.error(error);
        return;
      }
      try {
        // Gọi API thay đổi mật khẩu
        const response = await axios.post('http://localhost:8080/user/change-password', {
          oldPassword: value,
          newPassword: newPassword
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        });
        if (response.data.success) {
          toast.success("Thay đổi mật khẩu thành công");
          props.onClose();
        } else {
          toast.error("Mật khẩu cũ không đúng");
        }
      } catch (error) {
        toast.error("Thay đổi mật khẩu thất bại");
      }
    } else {
      props.onSave(props.label, value);
    }
  };
  

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <Container className={classes.paper}>
      <Box display="flex" justifyContent="flex-start">
        <IconButton aria-label="close" onClick={props.onClose} style={{ color: "rgb(234, 236, 239)" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" className={classes.label}>{props.label}</Typography>
      </Box>
      <Divider style={{ backgroundColor: "rgb(43, 49, 57)" }} />
      {props.label === "Mật khẩu" ? (
        <>
          <TextField
            id="old-password"
            label="Mật khẩu cũ"
            type="password"
            className={classes.textfield}
            fullWidth
            value={value}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="new-password"
            label="Mật khẩu mới"
            type="password"
            className={classes.textfield}
            fullWidth
            value={newPassword}
            onChange={handleNewPasswordChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="confirm-password"
            label="Nhập lại mật khẩu mới"
            type="password"
            className={classes.textfield}
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            margin="normal"
            variant="outlined"
          />
        </>
      ) : (
        <TextField
          id={`outlined-${props.label}`}
          label={props.label}
          className={classes.textfield}
          fullWidth
          multiline={props.variant === 'textarea'}
          rows={props.variant === 'textarea' ? 4 : 1}
          value={value}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
      )}
      <Box display="flex" justifyContent="flex-end" style={{ marginTop: '2em' }}>
        <Button className={classes.button} style={{ color: "rgb(240, 185, 11)" }} onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" style={{ backgroundColor: "rgb(252, 213, 53)", color: "rgb(32, 38, 48)" }} className={classes.button} onClick={handleSave}>
          Update
        </Button>
      </Box>
    </Container>
  );
}
