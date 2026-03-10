import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import products1 from "../assets/images/products.webp";
import products2 from "../assets/images/products2.webp";
import products3 from "../assets/images/products3.webp";
function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Minh Anh",
      avatar: products1,
      text: "Chân gà cực ngon, mình đặt 3 lần rồi. Giao nhanh và đóng gói rất kỹ.",
    },
    {
      id: 2,
      name: "Hoàng Nam",
      avatar: products2,
      text: "Snack rất giòn và giá hợp lý. Mình sẽ còn đặt tiếp.",
    },
    {
      id: 3,
      name: "Lan Chi",
      avatar: products3,
      text: "Đồ ăn ngon và giao rất nhanh. Shop phục vụ rất tốt.",
    },
    {
      id: 4,
      name: "Minh Anh",
      avatar: products1,
      text: "Chân gà cực ngon, mình đặt 3 lần rồi. Giao nhanh và đóng gói rất kỹ.",
    },
    {
      id: 5,
      name: "Hoàng Nam",
      avatar: products2,
      text: "Snack rất giòn và giá hợp lý. Mình sẽ còn đặt tiếp.",
    },
    {
      id: 6,
      name: "Lan Chi",
      avatar: products3,
      text: "Đồ ăn ngon và giao rất nhanh. Shop phục vụ rất tốt.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* TITLE */}

        <div className="text-center mb-14">
          <h2
            className="text-2xl md:text-3xl font-bold lg:text-5xl"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Khách hàng nói gì
          </h2>
        </div>

        {/* SLIDER */}

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          spaceBetween={30}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="
              bg-gray-50
              p-6
              rounded-2xl
              text-center
              h-full
              "
                data-aos="fade-up"
                data-aos-delay="800"
              >
                {/* AVATAR */}

                <img
                  src={item.avatar}
                  loading="lazy"
                  className="
                  w-16
                  h-16
                  rounded-full
                  mx-auto
                  object-cover
                  mb-4
                  "
                />

                {/* RATING */}

                <div
                  className="
                flex
                justify-center
                text-yellow-400
                mb-3
                "
                >
                  ★★★★★
                </div>

                {/* TEXT */}

                <p className="text-gray-600 text-sm mb-4">{item.text}</p>

                {/* NAME */}

                <h4 className="font-semibold">{item.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;
