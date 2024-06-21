import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

export const landingLoader = async () => {
  try{
    const response = await axios(
      `http://localhost:8080/products`
    );
    const data = response.data;

    return { products: data.filter((product) => product.featured).slice(0, 8) };
  }catch(err){
    console.log(err);
    return { products: [] };
  }
};

const Landing = () => {
  const { products } = useLoaderData();
  console.log(products);
  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      <Stats />

      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content" style={{color: "rgb(234, 236, 239)", fontWeight: 600}}>
          Các sản phẩm nổi bật
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {products?.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              // price={product?.price?.current?.value}
              price={product?.price}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
