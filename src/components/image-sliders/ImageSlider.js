import React, { useEffect, useState } from 'react';
import useSwiper from '../hooks/useSwiper';
import '../../styles/components/ImageSlider.scss';
import SliderDots from './SliderDots';

function ImageSlider({
  children = [],
  items,
  slideSelector,
  findActiveIndex = () => {},
}) {
  const [swiper, setSwiperRef] = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiper == null) return;
    swiper.update();

    const handleSlideChange = () => {
      if (items.length === 0) return;

      const currentSlide = swiper.slides[swiper.realIndex];
      const element = currentSlide.querySelector(slideSelector);

      const activeIndex = items.findIndex((item) =>
        findActiveIndex(item, element)
      );
      setActiveIndex(activeIndex);
    };

    swiper.on('slideChange', handleSlideChange);
    handleSlideChange();

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper, items, slideSelector, findActiveIndex]);

  const handleDotClick = (index) => {
    const item = items[index];
    const slideIndex = swiper.slides.findIndex(
      (slide) => slide.querySelector('.title').textContent === item.name
    );
    swiper.slideTo(slideIndex);
  };

  return (
    <div className="ImageSlider">
      <swiper-container
        ref={setSwiperRef}
        autoplay-delay={4000}
        autoplay-disable-on-interaction={false}
        speed={1000}
        loop={true}
      >
        {children.map((child, index) => (
          <swiper-slide key={index}>{child}</swiper-slide>
        ))}
      </swiper-container>
      <SliderDots
        activeIndex={activeIndex}
        length={items.length}
        onClick={handleDotClick}
      />
    </div>
  );
}

export default ImageSlider;
