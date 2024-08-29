import React from "react";
import Header from "./AppHeader";
import Footer from "./Footer";
import { Container, useColorModeValue } from "@chakra-ui/react";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <Container
        minWidth={"100%"}
        bg={useColorModeValue("gray.100", "gray.800")}
        display={"flex"}
        flexDirection={"column"}
        flex={"1"}
        padding={"1rem"}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default AppLayout;
