import { css } from "@emotion/css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import ProductsIndex from "./ProductsIndex";
import ProductDetails from "./ProductDetails";

const ProductsStyles = css`
  display: flex;
  flex-direction: column;
  .Logo {
    width: 125px;
    margin: 0 auto 25px;
  }
`;

const Products = () => (
  <div className={ProductsStyles}>
    <img src="/assets/img/logo.svg" alt="Ultimate Burgers" className="Logo" />
    <Routes>
      <Route path="/" element={<ProductsIndex />} />
      <Route path=":id" element={<ProductDetails />} />
    </Routes>
  </div>
);

export default Products;
