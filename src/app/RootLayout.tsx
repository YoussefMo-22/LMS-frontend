import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";

const RootLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;