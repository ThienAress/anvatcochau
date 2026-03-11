import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price.replace(/\D/g, ""));
    return sum + price * item.quantity;
  }, 0);
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isCartOpen]);

  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/40 z-9998"
        />
      )}

      <div
        className={`
      fixed
      top-0
      right-0
      h-full
      w-87.5
      bg-white
      shadow-xl
      z-9999
      transition-transform
      duration-300
      ${isCartOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Giỏ hàng</h2>

          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="p-4 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-gray-500">Giỏ hàng trống</p>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <img
                src={item.images[0]}
                className="w-12 h-12 object-cover rounded"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold">{item.name}</p>

                <p className="text-orange-500">{item.price}</p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="border px-2 rounded"
                  >
                    -
                  </button>

                  <span className="text-sm">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="border px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-xs"
              >
                Xoá
              </button>
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between mb-4 font-semibold">
            <span>Tạm tính</span>
            <span className="text-orange-500">{total.toLocaleString()}đ</span>
          </div>

          <Link
            to="/checkout"
            className="
  w-full
  block
  text-center
  bg-orange-500
  text-white
  py-3
  rounded-xl
  font-semibold
  hover:opacity-90
  transition
  "
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
