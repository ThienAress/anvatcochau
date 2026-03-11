import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./context/CartContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

AOS.init({
  duration: 800,
  once: false,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <Toaster position="top-right" />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
