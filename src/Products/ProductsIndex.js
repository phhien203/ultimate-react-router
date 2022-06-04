import { css } from "@emotion/css";
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { listProducts } from "./ProductsService";

const ProductIndexStyles = css`
  .ProductIndex {
    &-List {
      margin-top: 10px;
    }
    &-Radios {
      display: flex;
      align-items: center;
      span {
        width: 35px;
        color: #fff;
        font-size: 0.8rem;
        margin-right: 10px;
      }
      label {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`;

const ProductsIndex = () => {
  const [products, setProducts] = useState(null);
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (state) {
      console.warn(`Nothing found for ${state.id}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      const params = Object.fromEntries([...searchParams]);
      sortProductsFromParams(data, params);
    })();
  }, []);

  const sortProductsFromParams = (data, params) => {
    if (!Object.keys(params).length) {
      setProducts(data);
      return;
    }

    const sorted = [...data].sort((a, b) => {
      const { sort, order } = params;

      switch (order) {
        case "ascending": {
          return a[sort] > b[sort] ? 1 : -1;
        }
        case "descending": {
          return a[sort] < b[sort] ? 1 : -1;
        }
        default: {
          return 0;
        }
      }
    });

    setProducts(sorted);
  };

  const updateParams = (e) => {
    const { name, value } = e.target;
    const currentParams = Object.fromEntries(searchParams);
    const newParams = { ...currentParams, [name]: value };
    setSearchParams(newParams);
    sortProductsFromParams(products, newParams);
  };

  if (products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={ProductIndexStyles}>
      <div className="ProductIndex-Radios">
        <span>Sort: </span>
        <label>
          <input
            type="radio"
            name="sort"
            value="name"
            defaultChecked={searchParams.get("sort") === "name"}
            onChange={updateParams}
          />
          Name
        </label>

        <label>
          <input
            type="radio"
            name="sort"
            value="price"
            defaultChecked={searchParams.get("sort") === "price"}
            onChange={updateParams}
          />
          Price
        </label>
      </div>

      <div className="ProductIndex-Radios">
        <span>Order: </span>
        <label>
          <input
            type="radio"
            name="order"
            value="ascending"
            defaultChecked={searchParams.get("order") === "ascending"}
            onChange={updateParams}
          />
          Ascending
        </label>

        <label>
          <input
            type="radio"
            name="order"
            value="descending"
            defaultChecked={searchParams.get("order") === "descending"}
            onChange={updateParams}
          />
          Descending
        </label>
      </div>

      <div className="ProductIndex-List">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsIndex;
