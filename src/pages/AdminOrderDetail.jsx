import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Calendar,
  Tag,
  ChevronLeft,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

function AdminOrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [id]);

  // Hàm format trạng thái
  const getStatusInfo = (status) => {
    const statusMap = {
      Pending: {
        text: "Chờ xác nhận",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        borderColor: "border-yellow-200",
        icon: <Clock className="w-5 h-5" />,
      },
      Preparing: {
        text: "Đang chuẩn bị",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        icon: <Package className="w-5 h-5" />,
      },
      Shipping: {
        text: "Đang giao hàng",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        borderColor: "border-purple-200",
        icon: <Truck className="w-5 h-5" />,
      },
      Completed: {
        text: "Hoàn thành",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        icon: <CheckCircle className="w-5 h-5" />,
      },
      Cancelled: {
        text: "Đã hủy",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        icon: <XCircle className="w-5 h-5" />,
      },
    };
    return statusMap[status] || statusMap["Pending"];
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const orderDate = new Date(order.createdAt);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-white rounded-lg transition flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chi tiết đơn hàng
              </h1>
              <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Mã đơn:{" "}
                <span className="font-mono font-medium">
                  #{order._id?.slice(-8)}
                </span>
              </p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg ${statusInfo.bgColor} ${statusInfo.textColor} border ${statusInfo.borderColor} flex items-center gap-2`}
            >
              {statusInfo.icon}
              <span className="font-medium">{statusInfo.text}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Chiếm 2 cột */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thông tin sản phẩm */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Sản phẩm đã đặt
                </h2>
              </div>

              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Sản phẩm
                        </th>
                        <th className="text-center py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="text-right py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Đơn giá
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {order.items?.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/48";
                                  }}
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                {item.note && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Ghi chú: {item.note}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-50 text-orange-600 font-medium rounded-lg">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="py-4 text-right font-semibold text-orange-600">
                            {item.price?.toLocaleString()}đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tổng tiền */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Tổng số sản phẩm</p>
                      <p className="text-lg font-medium text-gray-900">
                        {order.items?.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        sản phẩm
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Tổng thanh toán</p>
                      <p className="text-3xl font-bold text-orange-600">
                        {order.total?.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Chiếm 1 cột */}
          <div className="space-y-6">
            {/* Thông tin khách hàng */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Thông tin khách hàng
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Họ tên</p>
                    <p className="font-medium text-gray-900">{order.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Số điện thoại</p>
                    <p className="font-medium text-gray-900">{order.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                    <p className="font-medium text-gray-900">{order.address}</p>
                  </div>
                </div>

                {order.email && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{order.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thông tin đơn hàng */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                  Thông tin đơn hàng
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-mono font-medium text-gray-900">
                      #{order._id}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Thời gian đặt hàng</p>
                    <p className="font-medium text-gray-900">
                      {orderDate.toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {orderDate.toLocaleTimeString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${statusInfo.bgColor}`}>
                    {statusInfo.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <p className={`font-medium ${statusInfo.textColor}`}>
                      {statusInfo.text}
                    </p>
                  </div>
                </div>

                {/* Phương thức thanh toán (nếu có) */}
                {order.paymentMethod && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">
                        Phương thức thanh toán
                      </p>
                      <p className="font-medium text-gray-900">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Ghi chú đơn hàng (nếu có) */}
            {order.note && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Ghi chú
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-700">{order.note}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            In đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
