import { useLocation, Link } from "react-router-dom";
import { products } from "../data/products";

function Search() {
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get("q") || "";

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-2xl font-bold mb-8">Kết quả cho: "{keyword}"</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="border rounded-xl p-3 hover:shadow-md"
          >
            <img
              src={item.images[0]}
              className="w-full h-[140px] object-cover rounded-lg mb-3"
            />

            <p className="text-sm font-semibold">{item.name}</p>

            <p className="text-orange-500">{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
