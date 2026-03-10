import products1 from "../assets/images/products.jpg";
import products2 from "../assets/images/products2.jpg";
import products3 from "../assets/images/products3.jpg";
import products4 from "../assets/images/products4.jpg";
import products5 from "../assets/images/products5.jpg";
import products6 from "../assets/images/products6.jpg";
import products7 from "../assets/images/products7.jpg";
import products8 from "../assets/images/products8.jpg";

function Products() {
  const products = [
    {
      id: 1,
      name: "Chân gà tê cay Alaco loại 35g",
      image: products1,
      rating: 4,
      price: "29.000đ",
      sale: true,
    },
    {
      id: 2,
      name: "Snack khoai tây BBQ",
      image: products2,
      rating: 5,
      price: "18.000đ",
    },
    {
      id: 3,
      name: "Bánh gạo Hàn Quốc",
      image: products3,
      rating: 4,
      price: "25.000đ",
    },
    {
      id: 4,
      name: "Trà sữa matcha",
      image: products4,
      rating: 5,
      price: "35.000đ",
    },
    {
      id: 4,
      name: "Trà sữa matcha",
      image: products5,
      rating: 5,
      price: "35.000đ",
    },
    {
      id: 4,
      name: "Trà sữa matcha",
      image: products6,
      rating: 5,
      price: "35.000đ",
    },
    {
      id: 4,
      name: "Trà sữa matcha",
      image: products7,
      rating: 5,
      price: "35.000đ",
    },
    {
      id: 4,
      name: "Trà sữa matcha",
      image: products8,
      rating: 5,
      price: "35.000đ",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}

        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
        </div>

        {/* GRID */}

        <div
          className="
        grid
        grid-cols-2
        gap-6
        md:grid-cols-2
        lg:grid-cols-3
        "
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="
              group
              bg-white
              border
              rounded-2xl
              overflow-hidden
              transition
              hover:shadow-xl
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
                  src={item.image}
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

                <button
                  className="
                  absolute
                  left-4
                  right-4
                  bottom-2
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
                  "
                >
                  🛒 Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
