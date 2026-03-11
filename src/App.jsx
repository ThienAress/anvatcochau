import "./App.css";
import MainLayout from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Search from "./pages/Search";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
