import { useMemo } from "react";

import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper";
import { SwiperProps } from "swiper/react";
import { v4 as uuid } from "uuid";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface UseSliderOptions {
  direction?: "vertical" | "horizontal";
  hasPagination?: boolean;
  hasNavigation?: boolean;
  prefix?: string;
  className?: string;
  delay?: number;
  slidesPerView?: number;
}

const useSlider = (options: UseSliderOptions = { hasPagination: true }) => {
  const generatedID = useMemo(
    () => (options.prefix || "sliderID") + "-" + uuid(),
    [options.prefix]
  );

  const sliderOptions: SwiperProps = useMemo(
    () => ({
      direction: options.direction || "vertical",
      pagination: {
        clickable: true,
      },
      navigation: options.hasNavigation || false,
      spaceBetween: 30,
      slidesPerView: options.slidesPerView || 1,
      autoplay: {
        delay: options.delay || 1800,
        disableOnInteraction: false,
      },
      mousewheel: true,
      modules: [Autoplay, Pagination, Navigation, Mousewheel],
      className: options.className || generatedID,
      id: generatedID,
    }),
    [options]
  );

  return [sliderOptions, generatedID];
};

export default useSlider;
