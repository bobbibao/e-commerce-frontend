import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
  return (
    <div className="hero bg-base-200 bg-blend-overlay">
    <div className="hero-content text-center">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold max-md:text-4xl text-accent-content">Của hàng tốt nhất của năm!</h1>
        <p className="py-6 text-2xl max-md:text-lg text-accent-content">
          Chúng tôi cung cấp những sản phẩm chất lượng nhất cho bạn hoạt động hàng ngày.

        </p>
        <Link to="/shop" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white" 
                style={{ color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)"}}>Mua hàng ngay</Link>
      </div>
    </div>
  </div>
  )
}

export default Hero