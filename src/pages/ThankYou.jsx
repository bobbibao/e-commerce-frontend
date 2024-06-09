import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      const response = await axios.post("http://localhost:8080/orders", {
        userId: localStorage.getItem("id"),
        orderStatus: "in process",
        subtotal: total,
        cartItems: cartItems,
      });
    } catch (err) {
      toast.error(err.response);
    }
  };

  if (cartItems.length > 0) {
    saveToOrderHistory();
    store.dispatch(clearCart());
    store.dispatch(calculateTotals());
    toast.success("Đặt Hàng Thành Công");
  }

  useEffect(() => {
    if (!loginState) {
      toast.error("Bạn cần đăng nhập để truy cập trang này");
      navigate("/");
    }
  }, []);


  return (
    <div style={{flexGrow: 1}}>
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          Cảm ơn bạn đã đặt hàng!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          Chúng tôi hy vọng bạn sẽ thích những bộ quần áo mới của mình! 
          Chúng tôi rất trân trọng sự hợp tác của bạn và mong sớm được gặp lại bạn.
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Bạn có thể thực hiện các hành động sau:
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; Xem lịch sử đặt hàng &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; Xem các sản phẩm khác &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            &rarr; Theo dõi chúng tôi trên mạng xã hội &larr;
          </li>
        </ul>

        <h4 className="text-xl mt-5 max-sm:text-lg">
          Một lần nữa xin cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi!
        </h4>
        <h4 className="text-xl max-sm:text-lg">
          Thân gửi, Clothing Shop
        </h4>
      </div>
    </div>
  );
};

export default ThankYou;
