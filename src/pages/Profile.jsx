import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container, Modal } from '@material-ui/core';
import FieldRow from '../components/FieldRow';
import FieldModal from '../components/FieldModal';

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minWidth: '10vw',
    width: '35%',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: '375px'
  },
  button: {
    boxShadow: 'none',
  },
  title: {
    fontFamily: 'ApercuMedium',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "rgb(234, 236, 239)"
  },
  subtitle: {
    fontFamily: 'ApercuBold'
  },
  image: {
    width: '10vw',
    boxShadow: '0 0 1px 0 rgba(0,0,0,.22)',
    padding: 15,
    marginBottom: theme.spacing(2),
    borderRadius: 4
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    boxShadow: '0 20px 60px -2px rgba(27,33,58,.4)',
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
    borderRadius: '8px'
  },
}));

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:8080/user/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try{

      const getResponse = await axios(`http://localhost:8080/user/${id}`);
      const userObj = getResponse.data;

      console.log(userObj.userWishlist);
      // saljemo get(default) request
      const putResponse = await axios.put(`http://localhost:8080/user/${id}`, {
        id: id,
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        phone: userFormData.phone,
        adress: userFormData.adress,
        password: userFormData.password,
        userWishlist: await userObj.userWishlist
        //userWishlist treba da stoji ovde kako bi sacuvao stanje liste zelja
      });
      const putData = putResponse.data;
      toast.success("Cập nhật thông tin cá nhân thành công");
    }catch(error){
      console.log(error.response);
    }
  }

  return (
    <div style={{flexGrow: 1,}}>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10 m-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1 pl-20">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Tên</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => {setUserFormData({...userFormData, name: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Họ</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => {setUserFormData({...userFormData, lastname: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {setUserFormData({...userFormData, email: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Số điện thoại</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {setUserFormData({...userFormData, phone: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Địa chỉ</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => {setUserFormData({...userFormData, adress: e.target.value})}}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Mật khẩu </span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => {setUserFormData({...userFormData, password: e.target.value})}}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          style={{ color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)"}}
          type="submit"
        >
          Cập nhật thông tin cá nhân
        </button>
      </form>
    </div>
  );
};

const Profile2 = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios(`http://localhost:8080/user/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };
  const handleUpdateField = async (label, value) => {
    try {
      console.log("userFormData: ", userFormData);
      switch (label) {
        case "Họ":
          userFormData.lastname = value;
          break;
        case "Tên":
          userFormData.name = value;
          break;
        case "Số điện thoại":
          userFormData.phone = value;
          break;
        case "Địa chỉ":
          userFormData.adress = value;
          break;
        case "Mật khẩu":
          userFormData.password = value;
          break;
        default:
          break;
      }
      const response = await axios.put(`http://localhost:8080/user/${id}`, {
        id: id,
        name: userFormData.name,
        lastname: userFormData.lastname,
        email: userFormData.email,
        phone: userFormData.phone,
        adress: userFormData.adress,
        password: userFormData.password,
      });
      const data = response.data;
      handleClose();
      toast.success("Cập nhật thông tin cá nhân thành công");
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  }

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const [fieldModal, setFieldModal] = React.useState({
    open: false,
    field: {
      label: null,
      value: null
    }
  });

  const [product, setProduct] = React.useState({
    ...props.item
  })

  const showFieldModal = (field) => {
    setFieldModal({
      open: true,
      field,
    });
  }

  const handleClose = () => {
    setFieldModal({
      ...fieldModal,
      open: false
    });
  }
  

  return (
    <Container className={classes.container}>
      {/* <Typography variant="h4" className={classes.title}>Thông tin cá nhân</Typography> */}
      <Grid container alignItems="center" justify="center">
        <Grid item>
      <Typography variant="h4" className={classes.title}>Thông tin cá nhân</Typography>
      {/* <img className={classes.image} src="https://xsgames.co/randomusers/avatar.php?g=male" /> */}
        </Grid>
      </Grid>

      <Box>
        <FieldRow label="Họ" value={userFormData.lastname} openModal={showFieldModal} />
        <FieldRow label="Tên" value={userFormData.name} openModal={showFieldModal} />
        <FieldRow label="Giới tính" value={userFormData.gender} />
        <FieldRow label="Email" value={userFormData.email}  />
        <FieldRow label="Số điện thoại" value={userFormData.phone} openModal={showFieldModal} />
        <FieldRow label="Địa chỉ" value={userFormData.adress} openModal={showFieldModal}/>
        <FieldRow label="Mật khẩu" value={userFormData.password} openModal={showFieldModal}/>
      </Box>

      {/* <Box display="flex" justifyContent="flex-end" style={{ marginTop: '2em' }}>
        <Button variant="contained" color="primary" className={classes.button} style={{ marginRight: 10 }} onClick={props?.onClose}>
          Save
        </Button>
        <Button color="primary">Cancel</Button>
      </Box> */}

      <Modal
        disableAutoFocus={true}
        disableBackdropClick
        closeAfterTransition
        open={fieldModal.open}
        onClose={handleClose}
        className={classes.modal}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div style={{ outline: 'none' }}>
          <FieldModal onSave={handleUpdateField}label={fieldModal.field.label} value={fieldModal?.field?.value} onClose={handleClose}/>
        </div>
      </Modal>

    </Container>
  );
}
export default Profile2;
