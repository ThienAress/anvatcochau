import { useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const menu = ["Trang chủ", "Giới thiệu", "Sản phẩm", "Liên hệ"];

  const { cartItems, setIsCartOpen } = useCart();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

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
              className="
              border
              rounded-lg
              px-4
              py-2
              w-[250px]
              focus:outline-none
              focus:ring-2
              focus:ring-orange-400
              "
            />

            {search && (
              <div
                className="
                absolute
                top-full
                left-0
                w-full
                bg-white
                shadow-lg
                rounded-lg
                mt-2
                max-h-[300px]
                overflow-y-auto
                z-[999]
                "
              >
                {filteredProducts.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    onClick={() => setSearch("")}
                    className="
                    flex
                    items-center
                    gap-3
                    p-3
                    hover:bg-gray-100
                    "
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
                className="cursor-pointer hover:text-orange-500 transition"
              >
                {item}
              </li>
            ))}
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
              <span
                className="
                absolute
                -top-2
                -right-2
                bg-orange-500
                text-white
                text-xs
                w-5
                h-5
                flex
                items-center
                justify-center
                rounded-full
                "
              >
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
              <div key={item} className="py-2 cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
