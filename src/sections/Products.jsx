import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useNavigate } from "react-router-dom";

function Products() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const navigate = useNavigate();

  const animations = ["flip-up", "flip-down", "flip-left", "flip-right"];

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  let sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort(
      (a, b) =>
        Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")),
    );
  }

  if (sort === "high") {
    sortedProducts.sort(
      (a, b) =>
        Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, "")),
    );
  }
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}

        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold lg:text-5xl"
            data-aos="fade-down"
          >
            Sản phẩm nổi bật
          </h2>
        </div>

        {/* FILTER */}

        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setCategory("all")}
            className={`px-4 py-2 rounded-full border transition ${
              category === "all"
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            Tất cả
          </button>

          <button
            onClick={() => setCategory("snack")}
            className={`px-4 py-2 rounded-full border transition ${
              category === "snack"
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            Snack
          </button>

          <button
            onClick={() => setCategory("bánh")}
            className={`px-4 py-2 rounded-full border transition ${
              category === "bánh"
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            Bánh
          </button>

          <button
            onClick={() => setCategory("nước")}
            className={`px-4 py-2 rounded-full border transition ${
              category === "nước"
                ? "bg-orange-500 text-white border-orange-500"
                : "hover:bg-gray-100"
            }`}
          >
            Đồ uống
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
border
rounded-lg
px-4
py-2
focus:outline-none
"
          >
            <option value="default">Mặc định</option>
            <option value="low">Giá thấp → cao</option>
            <option value="high">Giá cao → thấp</option>
          </select>
        </div>

        {/* PRODUCT GRID */}

        <div
          className="
          grid
          grid-cols-2
          gap-6
          md:grid-cols-2
          lg:grid-cols-3
          "
        >
          {sortedProducts.map((item, index) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              data-aos={animations[index % animations.length]}
              data-aos-delay={index * 150}
              className="
              group
              bg-white
              border
              rounded-2xl
              overflow-hidden
              transition
              hover:shadow-xl
              cursor-pointer
              "
            >
              {/* IMAGE */}

              <div className="relative overflow-hidden">
                {item.sale && (
                  <div
                    className="
                    absolute
                    top-2
                    left-2
                    bg-red-500
                    text-white
                    text-xs
                    px-2
                    py-1
                    rounded
                    z-10
                    "
                  >
                    SALE
                  </div>
                )}

                <img
                  src={item.images[0]}
                  loading="lazy"
                  className="
                  w-full
                  lg:h-[400px]
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-110
                  "
                />
              </div>

              {/* CONTENT */}

              <div className="p-4 text-center relative">
                <h3
                  className="
                  text-sm
                  font-semibold
                  uppercase
                  leading-snug
                  mb-2
                  "
                >
                  {item.name}
                </h3>

                {/* RATING */}

                <div
                  className="
                  flex
                  justify-center
                  gap-1
                  text-yellow-400
                  mb-2
                  "
                >
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{i < item.rating ? "★" : "☆"}</span>
                  ))}
                </div>

                {/* PRICE */}

                <p
                  className="
                  text-orange-500
                  font-semibold
                  transition
                  group-hover:opacity-0
                  group-hover:-translate-y-2
                  "
                >
                  {item.price}
                </p>

                {/* BUTTON */}

                <Link
                  to={`/product/${item.id}`}
                  className="
                  absolute
                  left-4
                  right-4
                  bottom-3
                  border
                  rounded-lg
                  py-2
                  text-sm
                  font-medium
                  opacity-0
                  translate-y-3
                  transition
                  group-hover:opacity-100
                  group-hover:translate-y-0
                  text-center
                  "
                >
                  🛒 Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
