import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";

const OrderHistory = () => {
  // cancelled, in progress, delivered
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const getOrderHistory = async () => {
    try {
      // saljemo get(default) request
      // const response = await axios.get("http://localhost:8080/orders");
      // const data = response.data;
      // console.log(data);
      // setOrders(
      //   data.filter((order) => order.userId === localStorage.getItem("id"))
      // );
      const response = await axios.get(`http://localhost:8080/orders/user/${localStorage.getItem("id")}`);
      console.log(response);
      const data = response.data;
      setOrders(data);
    } catch (error) {
      toast.error(error.response);
    }
  };

  useEffect(() => {
    if (!loginState) {
      toast.error("Bạn cần đăng nhập để xem lịch sử đơn hàng");
      navigate("/");
    } else {
      getOrderHistory();
    }
  }, []);
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};
  return (
    <div style={{flexGrow: 1}}>
      <SectionTitle title="Order History" path="Home | Order History" />
      <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
        {orders?.length === 0 ? (
          <div className="text-center">
            <h1 className="text-4xl text-accent-content">
              Không có đơn hàng nào được tìm thấy
            </h1>
            <Link
              to="/shop"
              className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            return (
              <div
                key={nanoid()}
                className="collapse collapse-plus bg-base-200 mb-2"
              >
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium text-accent-content">
                  Đơn hàng {order.id} - {order.orderStatus} - {new Date(order.orderDate).toLocaleString()}
                </div>
                <div className="collapse-content">
                  <div className="overflow-x-auto">
                    <table className="table max-sm:table-xs table-pin-rows table-pin-cols">
                      {/* head */}
                      <thead>
                        <tr className="text-accent-content">
                          <th>Đơn hàng</th>
                          <th>Hình ảnh</th>
                          <th>Tên sản phẩm</th>
                          <th>Kích thước</th>
                          <th>Số lượng</th>
                          <th>Đơn giá</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartItems.map((product, counter) => (
                          <tr className="text-accent-content" key={nanoid()}>
                            <th>{counter + 1}</th>
                            <th><img src={`https://${product.image}`} alt="" className="w-10" /></th>
                            <td>{product.title}</td>
                            <td>{product.selectedSize}</td>
                            <td>{product.amount}</td>
                            <td>{formatCurrency((product.price * product.amount).toFixed(2))}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h4 className="text-md text-accent-content">
                              Tổng tiền hàng: { formatCurrency(Math.round(order?.subtotal)) }
                            </h4>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              Phí giao hàng: 10.000 đ
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-md text-accent-content">
                              Thuế: 10%: { formatCurrency(Math.round(order?.subtotal / 10)) }
                            </h3>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5" className="text-center">
                            <h3 className="text-xl text-accent-content">
                              - Tổng cần thanh toán: { formatCurrency(Math.round(order?.subtotal + 10000 + (order?.subtotal / 10))) } -
                            </h3>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
