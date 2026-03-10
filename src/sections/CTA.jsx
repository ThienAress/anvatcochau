import { useEffect, useState } from "react";

function CTA() {
  const stats = [
    { label: "Khách hàng", value: 1200, suffix: "+" },
    { label: "Đánh giá", value: 4.9, suffix: "⭐" },
    { label: "Món ăn", value: 80, suffix: "+" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;

      const duration = 2000;
      const stepTime = 20;
      const increment = end / (duration / stepTime);

      const timer = setInterval(() => {
        start += increment;

        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = start >= end ? end : Number(start.toFixed(1));
          return newCounts;
        });

        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  }, []);

  return (
    <section
      className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white"
      data-aos="zoom-in-up"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* TITLE */}

        <h2 className="text-2xl md:text-3xl font-bold mb-4 lg:text-5xl">
          🔥 Đặt món ngay hôm nay
        </h2>

        <p className="text-orange-100 mb-10">
          Khám phá hàng trăm món ăn vặt hấp dẫn và giao nhanh chỉ trong 30 phút.
        </p>

        {/* BUTTON */}

        <button
          className="
          bg-white
          text-orange-500
          font-semibold
          px-8
          py-3
          rounded-xl
          shadow
          hover:scale-105
          transition
          mb-14
          cursor-pointer
          "
        >
          Đặt hàng ngay
        </button>

        {/* STATS */}

        <div
          className="
        grid
        grid-cols-3
        gap-6
        text-center
        "
        >
          {stats.map((item, index) => (
            <div key={index}>
              <p className="text-3xl md:text-4xl font-bold">
                {counts[index]}
                {item.suffix}
              </p>

              <p className="text-orange-100 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CTA;
