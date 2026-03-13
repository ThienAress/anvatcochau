import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X, MessageCircle, MessageSquare, ExternalLink } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [shouldScrollToFeatures, setShouldScrollToFeatures] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const menu = ["Trang chủ", "Giới thiệu", "Sản phẩm", "Liên hệ"];

  const { cartItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = localStorage.getItem("adminToken");

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleMenuClick = (item) => {
    if (item === "Trang chủ") {
      navigate("/");
    } else if (item === "Giới thiệu") {
      if (location.pathname === "/") {
        scrollToFeatures();
      } else {
        setShouldScrollToFeatures(true);
        navigate("/");
      }
    } else if (item === "Sản phẩm") {
      if (location.pathname === "/") {
        scrollToProducts();
      } else {
        navigate("/");
      }
    } else if (item === "Liên hệ") {
      setShowContactModal(true);
    }
  };

  const scrollToFeatures = () => {
    setTimeout(() => {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const scrollToProducts = () => {
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    if (shouldScrollToFeatures && location.pathname === "/") {
      scrollToFeatures();
    }
  }, [location, shouldScrollToFeatures]);

  // Khóa Scroll Modal Liên Hệ
  useEffect(() => {
    if (showContactModal) {
      // Khóa scroll body
      document.body.style.overflow = "hidden";
    } else {
      // Mở lại scroll khi đóng modal
      document.body.style.overflow = "";
    }

    // Cleanup khi component unmount hoặc modal thay đổi
    return () => {
      document.body.style.overflow = "";
    };
  }, [showContactModal]);

  // Modal liên hệ
  const ContactModal = () => {
    if (!showContactModal) return null;

    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        setShowContactModal(false);
      }
    };

    return (
      <div
        className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4" // giữ nền mờ
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-orange-50 to-amber-50">
            <h3 className="text-xl font-semibold text-gray-900">
              Liên hệ với chúng tôi
            </h3>
            <button
              onClick={() => setShowContactModal(false)}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-center mb-2">
              Bạn có thể liên hệ với chúng tôi qua:
            </p>

            {/* Zalo */}
            <a
              href="https://zalo.me/0123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition group"
            >
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Zalo</h4>
                <p className="text-sm text-gray-500">
                  Chat với chúng tôi qua Zalo
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
            </a>

            {/* Messenger */}
            <a
              href="https://m.me/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition group"
            >
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Messenger</h4>
                <p className="text-sm text-gray-500">Nhắn tin qua Facebook</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
            </a>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={() => setShowContactModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4 gap-6">
          {/* LOGO */}
          <div className="text-xl font-bold text-orange-500">AnVatNgon</div>

          {/* SEARCH */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 w-62.5 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {search && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 max-h-75 overflow-y-auto z-999">
                {filteredProducts.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={() => setSearch("")}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100"
                  >
                    <img
                      src={item.images[0]}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-orange-500">{item.price}</p>
                    </div>
                  </Link>
                ))}

                {filteredProducts.length === 0 && (
                  <p className="p-3 text-gray-400 text-sm">
                    Không tìm thấy sản phẩm
                  </p>
                )}
              </div>
            )}
          </div>

          {/* MENU DESKTOP */}
          <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            {menu.map((item) => (
              <li
                key={item}
                onClick={() => handleMenuClick(item)}
                className="cursor-pointer hover:text-orange-500 transition"
              >
                {item}
              </li>
            ))}

            {isAdmin && (
              <li
                onClick={() => navigate("/admin/dashboard")}
                className="cursor-pointer hover:text-orange-500 transition font-semibold"
              >
                Dashboard
              </li>
            )}
          </ul>

          {/* CART */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="relative cursor-pointer"
          >
            <span id="cart-icon" className="text-xl">
              🛒
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${open ? "max-h-60 pb-4" : "max-h-0"}
          `}
        >
          <div className="flex flex-col gap-3">
            {menu.map((item) => (
              <div
                key={item}
                onClick={() => {
                  handleMenuClick(item);
                  setOpen(false);
                }}
                className="py-2 cursor-pointer"
              >
                {item}
              </div>
            ))}
            {isAdmin && (
              <div
                onClick={() => {
                  navigate("/admin/dashboard");
                  setOpen(false);
                }}
                className="py-2 cursor-pointer font-semibold"
              >
                Dashboard
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render modal liên hệ */}
      <ContactModal />
    </nav>
  );
}

export default Navbar;
