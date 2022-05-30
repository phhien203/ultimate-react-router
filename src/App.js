import { css } from "@emotion/css";
import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import Admin from "./Admin/Admin";
import Nav from "./Common/Nav";
import Products from "./Products/Products";

const AppStyles = css`
  margin: 50px auto;
  width: 380px;

  .Container {
    background: #1d1e26;
    border: 4px solid #9580ff;
    border-radius: 6px;
    padding: 25px;
  }
`;

const App = () => {
  const [authenticated] = useState(true);

  const routes = useRoutes([
    {
      path: "/*",
      element: <Products />,
    },
    {
      path: "/admin/*",
      element: authenticated ? <Admin /> : <Navigate to="/" replace />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return routes;
};

const AppWrapper = () => {
  return (
    <div className={AppStyles}>
      <Router>
        <div className="Container">
          <Nav />
          <App />
        </div>
      </Router>
    </div>
  );
};

export default AppWrapper;
