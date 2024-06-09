import React from 'react'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Cart = () => {
  
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);

  const isCartEmpty = () => {
    if(cartItems.length === 0){
      toast.error("Giỏ hàng đang trống");
    }else{
      navigate("/thank-you");
    }
  }

  return (
    <div style={{flexGrow: 1}}>
    <SectionTitle title="Cart" path="Home | Cart" />
    <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals />
          {loginState ? (
            <button onClick={isCartEmpty} className='btn bg-yellow-600 hover:bg-blue-500 text-white btn-block mt-8' style={{padding: "8px 12px", color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)", borderRadius: "6px", marginInline: "5px", fontWeight: 500}}>
              Đặt hàng ngay
            </button>
          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8' style={{padding: "8px 12px", color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)", borderRadius: "6px", marginInline: "5px", fontWeight: 500}}>
              Đăng nhập để xem giỏ hàng
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart