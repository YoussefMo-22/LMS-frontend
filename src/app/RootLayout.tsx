import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";
import NavbarLogin from "../shared/components/NavbarLogin";
import { useSelector } from "react-redux";
import type { RootState } from "../shared/store";

const RootLayout: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user) || JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="flex flex-col min-h-screen">
      {true ? <NavbarLogin user={user} /> : <Navbar />}
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
