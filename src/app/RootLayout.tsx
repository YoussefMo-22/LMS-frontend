// layouts/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";
import NavbarLogin from "../shared/components/NavbarLogin";
import { useAuth } from "../features/auth/context/AuthContext";
import ErrorBoundary from "../shared/components/ErrorBoundary";

const RootLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen">
        <header role="banner">
          {isAuthenticated && user ? <NavbarLogin user={user} /> : <Navbar />}
        </header>
        <nav aria-label="Main navigation" className="sr-only" />
        <main role="main" className="flex-1">
          <Outlet />
        </main>
        <footer role="contentinfo">
          <Footer />
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default RootLayout;
