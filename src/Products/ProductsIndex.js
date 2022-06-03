import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { listProducts } from "./ProductsService";

const ProductsIndex = () => {
  const [products, setProducts] = useState(null);
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (state) {
      console.warn(`Nothing found for ${state.id}`);
    }
  }, []);

  useEffect(() => {
    console.log(Object.fromEntries(searchParams));
    (async () => {
      const data = await listProducts();
      setProducts(data);
    })();
  }, []);

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsIndex;
