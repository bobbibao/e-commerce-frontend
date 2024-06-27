import React from 'react';

const CartCouponDetails = ({ coupon }) => {
  if (!coupon) {
    return null;
  }

  return (
    <div className="coupon-details text-sm mb-5 p-4 rounded-lg bg-base-100">
      <h3 className="font-semibold mb-2">{coupon.code}</h3>
      <p>{coupon.description}</p>
      <br/>
      <p><strong>HSD:</strong> {coupon.expiryDate}</p>
    </div>
  );
};

export default CartCouponDetails;
