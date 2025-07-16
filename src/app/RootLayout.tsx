// layouts/RootLayout.tsx
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";
import NavbarLogin from "../shared/components/NavbarLogin";
import Cookies from "js-cookie";
import ErrorBoundary from "../shared/components/ErrorBoundary";
import { HelmetProvider } from 'react-helmet-async';

const RootLayout: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (err) {
          console.error("❌ Failed to parse user from cookie:", err);
          setUser(null);
        }
      } else {
        setUser(null); // 🔁 This ensures Navbar shows after logout
      }
    }, 50); // Check every 0.5 seconds (or use a custom event approach)

    return () => clearInterval(interval);
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <header role="banner">
            {user ? <NavbarLogin user={user} /> : <Navbar />}
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
    </HelmetProvider>
  );
};

export default RootLayout;
