import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div style={{flexGrow: 1}}>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">Chúng tôi yêu khách hàng!</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
        Chúng tôi luôn cố gắng mang đến cho khách hàng những sản phẩm tốt nhất, giá cả hợp lý nhất và dịch vụ chăm sóc khách hàng tốt nhất.
        Rất vui được phục vụ quý khách hàng!
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
