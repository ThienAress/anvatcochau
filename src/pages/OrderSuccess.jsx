import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Thêm icon thành công

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-amber-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all animate-fadeIn">
        {/* Icon thành công với hiệu ứng */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4 animate-bounce">
            <CheckCircle
              className="w-16 h-16 text-green-600"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Đặt hàng thành công! 🎉
        </h1>

        {/* Nội dung */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng của chúng tôi. Đơn
          hàng của bạn đã được ghi nhận và sẽ được xử lý trong thời gian sớm
          nhất.
        </p>

        {/* Nút quay về trang chủ */}
        <Link
          to="/"
          className="inline-block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
