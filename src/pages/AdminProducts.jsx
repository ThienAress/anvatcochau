import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Upload } from "lucide-react";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  /* ------------------------
     FETCH PRODUCTS
  ------------------------- */

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ------------------------
     FORM CHANGE
  ------------------------- */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ------------------------
     ADD PRODUCT
  ------------------------- */

  const handleAdd = async () => {
    let imageUrl = "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      imageUrl = uploadData.imageUrl;
    }

    await fetch("http://localhost:5000/api/products", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...form,
        image: imageUrl,
      }),
    });

    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    setEditingId(product._id);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/products/${editingId}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(form),
    });

    setEditingId(null);

    setForm({
      name: "",
      price: "",
      image: "",
      category: "",
    });

    fetchProducts();
  };

  /* ------------------------
     DELETE PRODUCT
  ------------------------- */

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="mt-2 text-sm text-gray-600">
            Quản lý thông tin sản phẩm, thêm mới, chỉnh sửa và xóa sản phẩm
          </p>
        </div>

        {/* ADD PRODUCT FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-500" />
              {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
            </h2>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tên sản phẩm */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Tên sản phẩm
                </label>
                <input
                  name="name"
                  placeholder="Nhập tên sản phẩm"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Giá */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Giá</label>
                <input
                  name="price"
                  placeholder="Nhập giá"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Danh mục */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Danh mục
                </label>
                <input
                  name="category"
                  placeholder="Nhập danh mục"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Upload ảnh */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Hình ảnh
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-200 rounded-lg hover:border-orange-500 transition group">
                      <Upload className="w-4 h-4 text-gray-400 group-hover:text-orange-500 mr-2" />
                      <span className="text-sm text-gray-600 group-hover:text-orange-500">
                        Chọn ảnh
                      </span>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  {imageFile && (
                    <button
                      onClick={() => setImageFile(null)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {imageFile && (
                  <div className="mt-2 relative group">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-orange-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition rounded-lg" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition shadow-sm hover:shadow flex items-center gap-2"
              >
                {editingId ? (
                  <>
                    <Pencil className="w-4 h-4" />
                    Cập nhật sản phẩm
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Thêm sản phẩm
                  </>
                )}
              </button>

              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm({ name: "", price: "", image: "", category: "" });
                    setImageFile(null);
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCT TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Danh sách sản phẩm
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-semibold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={
                            product.image || "https://via.placeholder.com/100"
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100";
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Sửa"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có sản phẩm nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
