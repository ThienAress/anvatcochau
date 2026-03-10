function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-4 py-14">
      <div className="max-w-6xl mx-auto">
        <div
          className="
        grid
        gap-10
        md:grid-cols-2
        lg:grid-cols-4
        "
        >
          {/* LOGO */}

          <div>
            <h3 className="text-white text-xl font-bold mb-3">SnackStore</h3>

            <p className="text-sm text-gray-400">
              Chuyên cung cấp các món ăn vặt ngon, giá hợp lý và giao nhanh
              trong 30 phút.
            </p>
          </div>

          {/* MENU */}

          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>

            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Trang chủ</li>

              <li className="hover:text-white cursor-pointer">Sản phẩm</li>

              <li className="hover:text-white cursor-pointer">Khuyến mãi</li>

              <li className="hover:text-white cursor-pointer">Liên hệ</li>
            </ul>
          </div>

          {/* CONTACT */}

          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>

            <ul className="space-y-2 text-sm">
              <li>📍 TP Hồ Chí Minh</li>

              <li>📞 0909 123 456</li>

              <li>📧 snackstore@email.com</li>
            </ul>
          </div>

          {/* SOCIAL */}

          <div>
            <h4 className="text-white font-semibold mb-4">
              Theo dõi chúng tôi
            </h4>

            <div className="flex gap-4 text-lg">
              <span className="cursor-pointer hover:text-white">👍</span>

              <span className="cursor-pointer hover:text-white">📸</span>

              <span className="cursor-pointer hover:text-white">▶️</span>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}

        <div
          className="
        border-t
        border-gray-700
        mt-10
        pt-6
        text-center
        text-sm
        text-gray-400
        "
        >
          © 2026 SnackStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
