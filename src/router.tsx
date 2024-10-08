import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { AppProvider } from "./contexts/AppContext";

function AppRouter() {
  return (
    <Router>
      <AppProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AppLayout>
      </AppProvider>
    </Router>
  );
}

export default AppRouter;
