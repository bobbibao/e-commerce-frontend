import React from "react";
import { SectionTitle, WishItem } from "../components";
import { useDispatch, useSelector } from "react-redux";


const Wishlist = () => {
    const { wishItems } = useSelector((state) => state.wishlist); 
    const dispatch = useDispatch();
  return (
    <div style={{flexGrow: 1}}>
      <SectionTitle title="Wishlist" path="Home | Wishlist" />
      <div className="max-w-7xl mx-auto px-20 py-10" style={{paddingLeft: "15rem"}}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th className="text-accent-content">Tên sản phẩm</th>
                <th className="text-accent-content">Kích thước</th>
                <th className="text-accent-content">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              { wishItems.map((item, index) => (
                <WishItem item={item} key={index} counter={index} />
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
