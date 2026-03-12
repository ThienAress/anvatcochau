import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

import Chat from "../components/ChatIcon";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));
  const relatedProducts = products.filter((p) => p.id !== Number(id));

  const productImageRef = useRef(null);
  const flyToCart = () => {
    const cart = document.getElementById("cart-icon");
    const img = productImageRef.current;

    if (!cart || !img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = img.cloneNode(true);

    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.objectFit = "cover";
    flyingImg.style.borderRadius = "10px";
    flyingImg.style.zIndex = "9999";
    flyingImg.style.pointerEvents = "none";

    document.body.appendChild(flyingImg);

    const deltaX = cartRect.left - imgRect.left;
    const deltaY = cartRect.top - imgRect.top;

    flyingImg.animate(
      [
        {
          transform: "translate(0,0) scale(1)",
        },
        {
          transform: `translate(${deltaX * 0.4}px, ${deltaY * 0.2}px) scale(0.8)`,
        },
        {
          transform: `translate(${deltaX * 0.7}px, ${deltaY * 0.6}px) scale(0.5)`,
        },
        {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(0.2)`,
          opacity: 0.4,
        },
      ],
      {
        duration: 1100,
        easing: "ease-in-out",
      },
    );

    setTimeout(() => {
      flyingImg.remove();

      cart.classList.add("cart-bounce");

      setTimeout(() => {
        cart.classList.remove("cart-bounce");
      }, 300);
    }, 1100);
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/checkout");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 py-2">
        <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
          <Link to="/" className="hover:text-black">
            Trang chủ
          </Link>

          <span className="mx-2">/</span>

          <span>Sản phẩm</span>

          <span className="mx-2">/</span>

          <span className="text-black font-medium">{product.name}</span>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="overflow-hidden rounded-2xl group">
            <img
              ref={productImageRef}
              src={product.images[activeImage]}
              className="
    w-full
object-cover
transition
duration-500
ease-out
group-hover:scale-110
    "
            />

            <div className="flex gap-3 mt-4">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(index)}
                  className="w-16 h-16 object-cover rounded-lg cursor-pointer border"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              {product.name}
            </h1>

            <div className="text-yellow-400 mb-4">★★★★★</div>

            <p className="text-2xl font-semibold text-orange-500 mb-4">
              {product.price}
            </p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(product, quantity);
                  flyToCart();
                  toast.success("Đã thêm vào giỏ hàng 🛒", {
                    style: {
                      borderRadius: "12px",
                      background: "#333",
                      color: "#fff",
                      fontSize: "18px",
                      padding: "16px 24px",
                    },
                  });
                }}
                className="
  flex-1
  border
  border-orange-500
  text-orange-500
  px-6
  py-3
  rounded-xl
  font-semibold
  hover:bg-orange-50
  transition
  "
              >
                Thêm vào giỏ hàng
              </button>

              <button
                onClick={handleBuyNow}
                className="
  flex-1
  bg-orange-500
  text-white
  px-6
  py-3
  rounded-xl
  font-semibold
  hover:opacity-90
  transition
  "
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="border rounded-xl p-3 hover:shadow-md transition block"
              >
                <img
                  src={item.images[0]}
                  className="w-full h-35 object-cover rounded-lg mb-3"
                />

                <p className="text-sm font-semibold mb-1">{item.name}</p>

                <p className="text-orange-500 font-semibold text-sm">
                  {item.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Chat />
      <ScrollToTopButton />
    </>
  );
}

export default ProductDetail;
