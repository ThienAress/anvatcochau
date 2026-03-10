import heroFoodImg from "../assets/images/heroImg.webp";
import heroFoodImg2 from "../assets/images/heroImg2.webp";
import heroFoodImg3 from "../assets/images/heroImg3.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
function Hero() {
  return (
    <section className="w-full min-h-[50vh] md:pt-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        grabCursor
        allowTouchMove={true}
        touchStartPreventDefault={false}
        className="heroSwiper relative min-h-[70vh] md:h-[80vh]"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-orange-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              {/* TEXT */}
              <div
                className="space-y-6 text-center md:text-left"
                data-aos="fade-right"
                data-aos-delay="300"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">ngon mỗi ngày</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {/* CTA PRIMARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    bg-orange-500
                    text-white
                    font-medium
                    flex items-center justify-center gap-2
                    hover:bg-orange-600
                    cursor-pointer
                    transition
                    group
                  "
                  >
                    Đặt hàng ngay
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {/* CTA SECONDARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    font-medium
                    hover:bg-gray-100
                    cursor-pointer
                    transition
                  "
                  >
                    Xem menu
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div
                className="flex justify-center"
                data-aos="fade-left"
                data-aos-delay="800"
              >
                <img
                  src={heroFoodImg}
                  alt="hero food"
                  loading="lazy"
                  className="
                  sm:w-[300px]
                  md:w-[360px]
                  lg:w-105
                  rounded-2xl
                  shadow-lg
                
                  "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-orange-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              {/* TEXT */}
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">
                    tươi, nhà làm chất lượng
                  </span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {/* CTA PRIMARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    bg-orange-500
                    text-white
                    font-medium
                    flex items-center justify-center gap-2
                    hover:bg-orange-600
                    cursor-pointer
                    transition
                    group
                  "
                  >
                    Đặt hàng ngay
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {/* CTA SECONDARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    font-medium
                    hover:bg-gray-100
                    cursor-pointer
                    transition
                  "
                  >
                    Xem menu
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={heroFoodImg2}
                  alt="hero food"
                  loading="lazy"
                  className="
                  sm:w-[300px]
                  md:w-[360px]
                  lg:w-[420px]
                  rounded-2xl
                  shadow-lg
                  
                  "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-orange-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              {/* TEXT */}
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">
                    ngon, không chất bảo quản, được mọi người lựa chọn
                  </span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {/* CTA PRIMARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    bg-orange-500
                    text-white
                    font-medium
                    flex items-center justify-center gap-2
                    hover:bg-orange-600
                    cursor-pointer
                    transition
                    group
                  "
                  >
                    Đặt hàng ngay
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  {/* CTA SECONDARY */}
                  <button
                    className="
                    px-6 py-3
                    rounded-lg
                    border border-gray-300
                    text-gray-700
                    font-medium
                    hover:bg-gray-100
                    cursor-pointer
                    transition
                  "
                  >
                    Xem menu
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              <div className="flex justify-center">
                <img
                  src={heroFoodImg3}
                  alt="hero food"
                  loading="lazy"
                  className="
                  sm:w-[300px]
                  md:w-[360px]
                  lg:w-[420px]
                  rounded-2xl
                  shadow-lg
                  
                  "
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default Hero;
