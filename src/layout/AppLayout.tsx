import React from "react";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <AppHeader />
      <main>{children}</main>
      <footer>
        <p>© 2023 My Application</p>
      </footer>
    </div>
  );
};

export default AppLayout;
