import React from "react";
import Header from "./AppHeader";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main-container">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
