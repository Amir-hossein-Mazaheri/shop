import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../Common/Header";

interface MainLayoutInterface {
  children?: React.ReactChild;
  asRoute?: boolean;
}

const MainLayout: React.FC<MainLayoutInterface> = ({
  children,
  asRoute = false,
}) => {
  return (
    <>
      <Header />
      <main>{asRoute ? <Outlet /> : children}</main>
    </>
  );
};

export default MainLayout;
