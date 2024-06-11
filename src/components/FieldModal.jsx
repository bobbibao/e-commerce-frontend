import React, {useState} from 'react';
import { makeStyles, TextField, Container, Typography, Divider, Box, IconButton, Button } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

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

  // const [value, setValue] = React.useState(props.value || '');
  const [value, setValue] = "";
  
  function Input() {
    return props.label === "Mật khẩu"? (
      <><TextField
        id="outlined-name"
        label="Mật khẩu cũ"
        type="password"
        className={classes.textfield}
        fullWidth
        multiline={props.variant === 'textarea'}
        rows={props.variant === 'textarea' ? 4 : 1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        margin="normal"
        variant="outlined" /><TextField
          id="outlined-name"
          label="Mật khẩu mới"
          type="password"
          className={classes.textfield}
          fullWidth
          multiline={props.variant === 'textarea'}
          rows={props.variant === 'textarea' ? 4 : 1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          margin="normal"
          variant="outlined" /><TextField
          id="outlined-name"
          label="Nhập lại mật khẩu mới"
          type="password"
          className={classes.textfield}
          fullWidth
          multiline={props.variant === 'textarea'}
          rows={props.variant === 'textarea' ? 4 : 1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          margin="normal"
          variant="outlined" /></>
    ): <TextField
    id="outlined-name"
    label={props.label}
    className={classes.textfield}
    fullWidth
    multiline={props.variant === 'textarea'}
    rows={props.variant === 'textarea' ? 4 : 1}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    margin="normal"
    variant="outlined"
  />;
  }

  return (
    <Container className={classes.paper}>
      <Box display="flex" justifyContent="flex-start">
        <IconButton aria-label="delete" className={classes.margin} onClick={props.onClose} style={{color: "rgb(234, 236, 239)"}}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" className={classes.label}>{props.label}</Typography>
      </Box>
      <Divider style={{backgroundColor: "rgb(43, 49, 57)"}}/>
      <Input />
      <Box display="flex" justifyContent="flex-end" style={{ marginTop: '2em' }}>
        <Button className={classes.button} style={{color: "rgb(240, 185, 11)"}} onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant="contained" style={{backgroundColor: "rgb(252, 213, 53)", color: "rgb(32, 38, 48)"}} className={classes.button} >
          Update
        </Button>
      </Box>
    </Container>
  );
}
