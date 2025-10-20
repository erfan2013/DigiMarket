// frontend/src/components/ui/HomeSlider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import SummaryApi from "../../common";
import "swiper/css";
import "swiper/css/pagination";

export default function HomeSlider() {
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(SummaryApi.sliderPublic.url, { credentials: "include" });
        const data = await res.json();
        setImages(Array.isArray(data.images) ? data.images : []);
      } catch (e) {
        console.error("Slider fetch error:", e);
      }
    })();
  }, []);

  if (!images.length) return null;

  return (
    <div className="slider-wrap w-full rounded-2xl overflow-hidden shadow bg-transparent">
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={0}
        speed={700}
      >
        {images
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <SwiperSlide key={img.publicId}>
              <img src={img.url} alt="" className="block w-full h-full object-cover" loading="lazy" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
