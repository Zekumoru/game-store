import { useState } from 'react';

function useSwiper() {
  const [swiper, setSwiper] = useState(null);

  const setSwiperRef = (elementRef) => {
    if (elementRef === null) {
      setSwiper(null);
      return;
    }

    setSwiper(elementRef.swiper);
  };

  return [swiper, setSwiperRef];
}

export default useSwiper;
