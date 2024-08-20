import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function AppRouter() {
  return (
    <AppLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </AppLayout>
  );
}

export default AppRouter;
