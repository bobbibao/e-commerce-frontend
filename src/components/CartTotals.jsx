import React from 'react'
import { useSelector } from 'react-redux';

const CartTotals = ({coupon}) => {
  console.log(coupon)
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const tax = total / 10;
  const shipping = 10000;
  return (
    <div className='card bg-base-100'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tổng tiền hàng</span>
          <span className='font-medium'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(total))}</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Phí giao hàng</span>
          <span className='font-medium'>Miễn phí</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Giảm giá</span>
          <span className='font-medium'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(
            coupon ? total * coupon.value / 100 : 0
          ))}</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Tổng tiền cần thanh toán</span>
          <span className='font-medium'> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.round(
            total - (coupon ? total * coupon.value / 100 : 0)
          ) )}</span>
          
        </p>
      </div>
    </div>
  )
}

export default CartTotals