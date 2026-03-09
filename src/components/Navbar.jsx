import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const menu = ["Trang chủ", "Giới thiệu", "Sản phẩm", "Liên hệ"];

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="text-xl font-bold text-orange-500">AnVatNgon</div>

          {/* Desktop menu */}
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

          {/* Mobile button */}
          <button
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
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
