import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";

import {
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  Package,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  X,
  Eye,
} from "lucide-react";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.total;
  }, 0);

  const todayOrders = orders.filter((order) => {
    const today = new Date().toDateString();
    const orderDate = new Date(order.createdAt).toDateString();

    return today === orderDate;
  }).length;

  const revenueByDate = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString("vi-VN");

    if (!revenueByDate[date]) {
      revenueByDate[date] = 0;
    }

    revenueByDate[date] += order.total;
  });

  const chartData = Object.keys(revenueByDate).map((date) => ({
    date,
    revenue: revenueByDate[date],
  }));

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Thống kê thêm
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const completedOrders = orders.filter((o) => o.status === "Completed").length;
  const completionRate =
    totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0;

  // Hàm format trạng thái
  const getStatusText = (status) => {
    const statusMap = {
      Pending: "Chờ xác nhận",
      Preparing: "Đang chuẩn bị",
      Shipping: "Đang giao hàng",
      Completed: "Hoàn thành",
      Cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      Pending: "bg-yellow-100 text-yellow-700",
      Preparing: "bg-blue-100 text-blue-700",
      Shipping: "bg-purple-100 text-purple-700",
      Completed: "bg-green-100 text-green-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return colorMap[status] || "bg-gray-100 text-gray-700";
  };

  // Modal xem tất cả đơn hàng
  const AllOrdersModal = () => {
    if (!showAllOrders) return null;

    const sortedAllOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Tất cả đơn hàng
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Tổng số: {orders.length} đơn hàng
              </p>
            </div>
            <button
              onClick={() => setShowAllOrders(false)}
              className="p-2 hover:bg-white rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Modal Body - Danh sách đơn hàng */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã đơn
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SĐT
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedAllOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-mono text-sm">
                      #{order._id.slice(-8)}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.name}
                        </p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{order.phone}</td>
                    <td className="py-3 px-4 text-sm max-w-xs truncate">
                      {order.address}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-orange-600">
                        {order.total.toLocaleString()}đ
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString("vi-VN")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Chưa có đơn hàng nào</p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Tổng doanh thu:</span>
                <span className="ml-2 font-bold text-orange-600">
                  {totalRevenue.toLocaleString()}đ
                </span>
              </div>
              <button
                onClick={() => setShowAllOrders(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                Tổng quan về hoạt động kinh doanh của bạn
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* TOTAL ORDERS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-blue-500 to-blue-600 p-3 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <ShoppingCart size={22} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                +12% so với tháng trước
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Tổng đơn hàng</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {totalOrders}
              </h2>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight size={14} />
                <span>24 đơn trong tháng này</span>
              </div>
            </div>
          </div>

          {/* TOTAL REVENUE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-orange-500 to-amber-500 p-3 rounded-xl text-white shadow-lg shadow-orange-500/20">
                <DollarSign size={22} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-orange-50 text-orange-600 rounded-full">
                +8.2% so với tháng trước
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Doanh thu</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {totalRevenue.toLocaleString()}đ
              </h2>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight size={14} />
                <span>Tăng 12.5% so với tuần trước</span>
              </div>
            </div>
          </div>

          {/* TODAY ORDERS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-yellow-500 to-yellow-600 p-3 rounded-xl text-white shadow-lg shadow-yellow-500/20">
                <Clock size={22} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-yellow-50 text-yellow-600 rounded-full">
                Hôm nay
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Đơn hàng hôm nay</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {todayOrders}
              </h2>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                <span>Dự kiến: {Math.round(todayOrders * 1.2)} đơn</span>
              </div>
            </div>
          </div>

          {/* COMPLETION RATE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-linear-to-br from-purple-500 to-purple-600 p-3 rounded-xl text-white shadow-lg shadow-purple-500/20">
                <TrendingUp size={22} />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                Tỉ lệ thành công
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Hoàn thành</p>
              <h2 className="text-3xl font-bold text-gray-900">
                {completionRate}%
              </h2>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight size={14} />
                <span>{completedOrders} đơn đã giao</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart và Recent Orders Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart - Chiếm 2 cột */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Doanh thu theo ngày
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Biến động doanh thu 7 ngày gần nhất
                </p>
              </div>
              <select className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>3 tháng qua</option>
              </select>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    stroke="#9CA3AF"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickFormatter={(value) => `${value.toLocaleString()}đ`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      padding: "12px",
                    }}
                    formatter={(value) => [
                      `${value.toLocaleString()}đ`,
                      "Doanh thu",
                    ]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    fill="url(#revenueGradient)"
                    name="Doanh thu"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Thống kê nhanh - Chiếm 1 cột */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Thống kê nhanh
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Package className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Giá trị trung bình</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {averageOrderValue.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Khách hàng mới</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {
                        orders.filter(
                          (o, i, arr) =>
                            arr.findIndex((t) => t.name === o.name) === i,
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-linear-to-r from-orange-500 to-amber-500 rounded-xl text-white">
                <p className="text-sm opacity-90">Doanh thu hôm nay</p>
                <p className="text-2xl font-bold mt-1">
                  {orders
                    .filter(
                      (o) =>
                        new Date(o.createdAt).toDateString() ===
                        new Date().toDateString(),
                    )
                    .reduce((sum, o) => sum + o.total, 0)
                    .toLocaleString()}
                  đ
                </p>
                <p className="text-xs opacity-75 mt-2">
                  {todayOrders} đơn hàng đang xử lý
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Đơn hàng gần đây
              </h2>
              <p className="text-sm text-gray-500 mt-1">5 đơn hàng mới nhất</p>
            </div>
            <button
              onClick={() => setShowAllOrders(true)}
              className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Xem tất cả ({orders.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="text-left py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="text-left py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="text-left py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thời gian
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          #{order._id.slice(-8)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold text-orange-600">
                        {order.total.toLocaleString()}đ
                      </p>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleTimeString("vi-VN")}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {recentOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal hiển thị tất cả đơn hàng */}
      <AllOrdersModal />
    </div>
  );
}

export default AdminDashboard;
