import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const ordersPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = () => {
      fetch("http://localhost:5000/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (lastOrderCount !== 0 && data.length > lastOrderCount) {
            setNotificationMessage(
              `🔔 Có ${data.length - lastOrderCount} đơn hàng mới!`,
            );
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
          }

          setLastOrderCount(data.length);
          setOrders(data);
        });
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);

    return () => clearInterval(interval);
  }, [lastOrderCount]);

  // Lọc đơn hàng theo tìm kiếm và trạng thái
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.includes(searchTerm) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Phân trang
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Hàm format trạng thái
  const getStatusInfo = (status) => {
    const statusMap = {
      Pending: {
        text: "Chờ xác nhận",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        borderColor: "border-yellow-200",
        icon: <Clock className="w-3 h-3" />,
      },
      Preparing: {
        text: "Đang chuẩn bị",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        icon: <Package className="w-3 h-3" />,
      },
      Shipping: {
        text: "Đang giao hàng",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        borderColor: "border-purple-200",
        icon: <Truck className="w-3 h-3" />,
      },
      Completed: {
        text: "Hoàn thành",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        icon: <CheckCircle className="w-3 h-3" />,
      },
      Cancelled: {
        text: "Đã hủy",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        icon: <XCircle className="w-3 h-3" />,
      },
    };
    return statusMap[status] || statusMap["Pending"];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý đơn hàng
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Theo dõi và xử lý tất cả đơn hàng của cửa hàng
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <span className="text-sm text-gray-600">Tổng số: </span>
                <span className="font-semibold text-orange-600">
                  {orders.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {showNotification && (
          <div className="mb-6 animate-slide-down">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{notificationMessage}</span>
              <button
                onClick={() => setShowNotification(false)}
                className="ml-auto hover:bg-white/20 p-1 rounded"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SĐT hoặc mã đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="sm:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition appearance-none bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Pending">Chờ xác nhận</option>
                <option value="Preparing">Đang chuẩn bị</option>
                <option value="Shipping">Đang giao hàng</option>
                <option value="Completed">Hoàn thành</option>
                <option value="Cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SĐT
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 transition cursor-pointer group"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          #{order._id.slice(-8)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.name}
                          </p>
                          {order.email && (
                            <p className="text-xs text-gray-500 mt-1">
                              {order.email}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {order.phone}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className="text-sm text-gray-600 max-w-xs truncate"
                          title={order.address}
                        >
                          {order.address}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-orange-600">
                          {order.total?.toLocaleString()}đ
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor} border ${statusInfo.borderColor}`}
                        >
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString(
                            "vi-VN",
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString(
                            "vi-VN",
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                          {/* Xem chi tiết */}
                          <button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Xem chi tiết"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/orders/${order._id}`);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Xác nhận */}
                          {order.status === "Pending" && (
                            <button
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Xác nhận đơn hàng"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (window.confirm("Xác nhận đơn hàng này?")) {
                                  await fetch(
                                    `http://localhost:5000/api/orders/${order._id}/confirm`,
                                    { method: "PUT" },
                                  );
                                  window.location.reload();
                                }
                              }}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Hoàn thành */}
                          {order.status === "Shipping" && (
                            <button
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Hoàn thành đơn hàng"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    "Xác nhận hoàn thành đơn hàng?",
                                  )
                                ) {
                                  await fetch(
                                    `http://localhost:5000/api/orders/${order._id}/complete`,
                                    { method: "PUT" },
                                  );
                                  window.location.reload();
                                }
                              }}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}

                          {/* Hủy đơn */}
                          {(order.status === "Pending" ||
                            order.status === "Preparing") && (
                            <button
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Hủy đơn hàng"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (
                                  window.confirm(
                                    "Bạn có chắc muốn hủy đơn hàng này?",
                                  )
                                ) {
                                  await fetch(
                                    `http://localhost:5000/api/orders/${order._id}/cancel`,
                                    { method: "PUT" },
                                  );
                                  window.location.reload();
                                }
                              }}
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy đơn hàng
              </h3>
              <p className="text-sm text-gray-500">
                {searchTerm || statusFilter !== "all"
                  ? "Thử thay đổi bộ lọc tìm kiếm"
                  : "Chưa có đơn hàng nào"}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị{" "}
                <span className="font-medium">{indexOfFirstOrder + 1}</span> -{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastOrder, filteredOrders.length)}
                </span>{" "}
                trên{" "}
                <span className="font-medium">{filteredOrders.length}</span> đơn
                hàng
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-white hover:shadow"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100 text-sm font-medium">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-white hover:shadow"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
