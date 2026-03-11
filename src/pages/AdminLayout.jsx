import { Link, Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
  Bell,
  Search,
} from "lucide-react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Đóng sidebar khi chuyển trang trên mobile
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [location.pathname]);

  // Theo dõi scroll để thay đổi style header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      localStorage.removeItem("adminToken");
      navigate("/admin/login", { replace: true });
    }
  };

  // Kiểm tra menu active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Danh sách menu items
  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      description: "Tổng quan",
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <ShoppingCart size={20} />,
      description: "Quản lý đơn hàng",
    },
    {
      path: "/admin/products",
      name: "Products",
      icon: <Package size={20} />,
      description: "Quản lý sản phẩm",
    },
    {
      path: "/admin/customers",
      name: "Customers",
      icon: <Users size={20} />,
      description: "Quản lý khách hàng",
    },
  ];

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* OVERLAY CHO MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE HEADER */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b transition-shadow ${isScrolled ? "shadow-md" : ""}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <h2 className="text-xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            SnackStore
          </h2>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:relative
          top-0 left-0
          h-full
          w-72
          bg-linear-to-b from-white to-gray-50
          border-r border-gray-200
          shadow-xl
          flex flex-col
          transform
          transition-transform
          duration-300
          ease-in-out
          z-40
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          lg:shadow-none
        `}
      >
        {/* LOGO & CLOSE BUTTON */}
        <div className="p-6 border-b border-gray-100 bg-linear-to-r from-orange-50 to-amber-50 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                SnackStore
              </h2>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 hover:bg-white rounded-lg transition"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* USER INFO */}
        <div className="p-4 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="font-medium text-gray-800 truncate">Admin</p>
            </div>
          </div>
        </div>

        {/* MENU - CUỘN ĐƯỢC */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Menu
            </p>

            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-xl
                  transition-all duration-200 group
                  ${
                    isActive(item.path)
                      ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`
                    transition-transform group-hover:scale-110 shrink-0
                    ${isActive(item.path) ? "text-white" : "text-gray-400 group-hover:text-orange-500"}
                  `}
                  >
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="font-medium block truncate">
                      {item.name}
                    </span>
                    <p
                      className={`
                      text-xs mt-0.5 truncate
                      ${isActive(item.path) ? "text-orange-100" : "text-gray-400"}
                    `}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                {isActive(item.path) && (
                  <ChevronRight size={16} className="text-white shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-200 bg-white shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-red-500 to-red-600 text-white py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/20 group"
          >
            <LogOut
              size={18}
              className="transition-transform group-hover:translate-x-1 shrink-0"
            />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR (DESKTOP) */}
        <div
          className={`hidden lg:block shrink-0 bg-white border-b border-gray-200 transition-shadow ${isScrolled ? "shadow-md" : ""}`}
        >
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-800">
                {menuItems.find((item) => item.path === location.pathname)
                  ?.name || "Dashboard"}
              </h1>
              <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                Admin
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  AD
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Admin</p>
                  <p className="text-xs text-gray-400">Đang hoạt động</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT - CUỘN ĐƯỢC */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
