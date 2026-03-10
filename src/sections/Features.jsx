function Features() {
  const features = [
    {
      icon: "🚀",
      title: "Giao nhanh",
      desc: "Đặt món và nhận hàng chỉ trong 30 phút.",
    },
    {
      icon: "🔥",
      title: "Giá tốt",
      desc: "Món ngon với mức giá cực kỳ hợp lý.",
    },
    {
      icon: "⭐",
      title: "Chất lượng",
      desc: "Nguyên liệu tươi và đảm bảo vệ sinh.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-16 ">
          <h2 className="text-2xl md:text-3xl font-bold lg:text-5xl">
            Tại sao chọn chúng tôi
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Chúng tôi mang đến những món ăn vặt ngon nhất cùng dịch vụ nhanh và
            chất lượng.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={index}
              className="
              group
              p-8
              rounded-2xl
              bg-white
              border
              transition
              hover:-translate-y-2
              hover:shadow-xl
              "
            >
              {/* ICON */}
              <div
                className="
              w-14
              h-14
              flex
              items-center
              justify-center
              rounded-full
              bg-orange-100
              text-2xl
              mb-5
              mx-auto
              group-hover:scale-110
              transition
              "
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-center mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
