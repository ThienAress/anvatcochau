import heroFoodImg from "../assets/images/heroImg.jpg";
import heroFoodImg2 from "../assets/images/heroImg2.jpg";
import heroFoodImg3 from "../assets/images/heroImg3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
function Hero() {
  return (
    <section className="w-full pb-10 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={false}
        breakpoints={{
          768: {
            navigation: true,
          },
        }}
        className="heroSwiper min-h-[80vh]"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-orange-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              {/* TEXT */}
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pt-5">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">ngon mỗi ngày</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
                  src={heroFoodImg}
                  alt="hero food"
                  className=" rounded-xl"
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
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pt-5">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">ngon mỗi ngày</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
                  className=" rounded-xl"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="h-full flex items-center bg-orange-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              {/* TEXT */}
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight pt-5">
                  Đồ ăn vặt{" "}
                  <span className="text-orange-500">ngon mỗi ngày</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg">
                  Khám phá hàng trăm món ăn vặt hấp dẫn, giao nhanh trong 30
                  phút.
                </p>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
                  className=" rounded-xl"
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
