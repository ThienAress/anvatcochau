import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Đặt hàng thành công 🎉
      </h1>

      <p className="text-gray-600 mb-8">
        Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng sớm nhất.
      </p>

      <Link
        to="/"
        className="
        bg-orange-500
        text-white
        px-6
        py-3
        rounded-xl
        font-semibold
        "
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default OrderSuccess;
