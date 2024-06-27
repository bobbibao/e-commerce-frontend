import React, { useState } from 'react';
import { makeStyles, TextField, Container, Typography, Divider, Box, IconButton, Button } from '@material-ui/core';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import CartCouponDetails from '../components/CartCouponDetails';
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
    borderRadius: '8px',
    minWidth: 550
  },
  textfield: {
    '& .MuiOutlinedInput-root': {
      fontSize: '0.875rem',
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
      fontSize: '0.875rem',
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
const Cart = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [sdt, setSdt] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);
  const [isFocused, setIsFocused] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [coupon, setCoupon] = useState(null);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // setCurrentPage((prevState) => 1);
    // setSearchTerm((prevState) => e.target.search.value);
    try {
      const response = await axios.get(`http://localhost:8080/coupons/${e.target.search.value}`);
      setCoupon(
        {
          code: response.data.code,
          description: response.data.voucherDescription,
          value: response.data.discountValue,
          expiryDate: new Date(response.data.expirationDate).toLocaleString()
        }
      );
    } catch (error) {
      console.log(error.response);
    }

    // // Mock API response for coupon
    // const mockCoupon = {
    //   code: e.target.search.value,
    //   description: 'Giảm giá 10% cho đơn hàng trên 500k',
    //   value: '10%',
    //   expiryDate: '30/06/2024',
    // };
    // setCoupon(mockCoupon);
  };

  const isCartEmpty = () => {
    if (cartItems.length === 0) {
      toast.error('Giỏ hàng đang trống');
    } else {
      const confirmOrder = window.confirm('Bạn có chắc chắn muốn đặt hàng không?');
      if (confirmOrder) {
        navigate('/thank-you');
      }
    }
  };
  
  return (
    <div style={{ flexGrow: 1 }}>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <form className="form-control max-w-7xl mx-auto pb-4" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="input input-bordered input-md w-full outline-0 focus:outline-0"
                name="search"
                onFocus={onFocus}
                onBlur={onBlur}
                style={isFocused ? { borderColor: 'rgb(240, 185, 11)' } : {}}
              />
              <button
                type="submit"
                className="btn btn-square btn-md bg-blue-600 hover:bg-blue-500 text-white"
                style={{ color: 'rgb(32, 38, 48)', backgroundColor: 'rgb(252, 213, 53)', fontWeight: 500 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          <CartCouponDetails coupon={coupon} />
          <CartTotals coupon={coupon} />
          <FormControl component="fieldset" style={{ width: '100%', marginTop: 10 }}>
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="vnpay"
                control={<Radio style={{ color: 'white' }} />}
                label="Thanh toán bằng ví điện tử VNPAY"
                style={{
                  opacity: 0.6,
                  border: paymentMethod === 'vnpay' ? '1px solid rgb(252, 213, 53)' : '1px solid rgb(99, 93, 93)',
                  borderRadius: '5px',
                  padding: 3,
                  margin: 0,
                }}
              />
              <FormControlLabel
                value="cod"
                control={<Radio style={{ color: 'white' }} />}
                label="Thanh toán khi nhận hàng"
                style={{
                  opacity: 0.6,
                  border: paymentMethod === 'cod' ? '1px solid rgb(252, 213, 53)' : '1px solid rgb(99, 93, 93)',
                  borderRadius: '5px',
                  padding: 3,
                  margin: 0,
                  marginTop: 10,
                }}
              />
            </RadioGroup>
          </FormControl>
          {/* <div className="mt-8 grid gap-8 lg:grid-cols-12  mx-auto">
          <div className="lg:col-span-12">

          <TextField
            id={`outlined-HoTen`}
            label={`Họ và tên`}
            className={classes.textfield}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            variant="outlined"
          />
          <TextField
            id={`outlined-SDT`}
            label={`Số điện thoại`}
            className={classes.textfield}
            fullWidth
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            margin="dense"
            variant="outlined"
          />
          <TextField
            id={`outlined-DiaChi`}
            label={`Địa chỉ`}
            className={classes.textfield}
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="dense"
            variant="outlined"
          />
          <TextField
            id={`outlined-Email`}
            label={`Email`}
            className={classes.textfield}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="dense"
            variant="outlined"
            />
             </div>
          </div> */}
          <button
            onClick={isCartEmpty}
            className="btn bg-yellow-600 hover:bg-blue-500 text-white btn-block mt-8"
            style={{
              padding: '8px 12px',
              color: 'rgb(32, 38, 48)',
              backgroundColor: 'rgb(252, 213, 53)',
              borderRadius: '6px',
              marginInline: '5px',
              fontWeight: 500,
            }}
          >
            Đặt hàng ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
