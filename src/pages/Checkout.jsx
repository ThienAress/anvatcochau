import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  FileText,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items: cartItems,
        total: total,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        navigate("/order-success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Thanh toán đơn hàng
          </h1>
          <p className="text-gray-600 mt-3">
            Vui lòng nhập thông tin giao hàng
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form - Chiếm 2 cột */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Thông tin giao hàng
                </h2>
              </div>

              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Họ tên */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      placeholder="Nhập họ tên"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition shadow-sm"
                    />
                  </div>

                  {/* Số điện thoại */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      placeholder="Nhập số điện thoại"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition shadow-sm"
                    />
                  </div>

                  {/* Địa chỉ */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      Địa chỉ giao hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="address"
                      placeholder="Nhập địa chỉ"
                      value={form.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition shadow-sm"
                    />
                  </div>

                  {/* Ghi chú */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      Ghi chú (không bắt buộc)
                    </label>
                    <textarea
                      name="note"
                      placeholder="Ghi chú thêm về đơn hàng..."
                      value={form.note}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition shadow-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Chiếm 1 cột */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="px-6 py-5 bg-gradient-to-r from-orange-500 to-amber-500">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Đơn hàng của bạn
                </h2>
              </div>

              <div className="p-6">
                {/* Danh sách sản phẩm */}
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {cartItems.map((item) => {
                    const price = Number(item.price.replace(/\D/g, ""));
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 py-3 border-b border-gray-100 last:border-0"
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-500">
                              x{item.quantity}
                            </span>
                            <span className="font-semibold text-orange-600">
                              {(price * item.quantity).toLocaleString()}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tổng tiền */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium text-gray-800">
                      {total.toLocaleString()}đ
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4 text-lg font-bold">
                    <span className="text-gray-800">Tổng cộng:</span>
                    <span className="text-orange-600">
                      {total.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Nút đặt hàng */}
                <button
                  onClick={handleOrder}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Đặt hàng ngay
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
