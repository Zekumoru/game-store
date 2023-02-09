import React, { useEffect, useState } from 'react';
import useSwiper from '../hooks/useSwiper';
import SliderDots from './SliderDots';

function ImageSlider({
  className,
  items,
  slideElement,
  autoplay = false,
  showDots = false,
  loop = false,
  autoplayDelay = 2000,
  findSlideIndex = () => {},
  containerProps = {},
}) {
  const [swiper, setSwiperRef] = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiper == null) return;
    swiper.update();

    const handleSlideChange = () => {
      if (items.length === 0) return;

      const currentSlide = swiper.slides[swiper.activeIndex];
      const activeIndex = items.findIndex((item) =>
        findSlideIndex(currentSlide, item)
      );
      setActiveIndex(activeIndex);
    };

    swiper.on('slideChange', handleSlideChange);
    handleSlideChange();

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper, items, autoplay, findSlideIndex]);

  const handleDotClick = (index) => {
    const item = items[index];
    const slideIndex = swiper.slides.findIndex((slide) =>
      findSlideIndex(slide, item)
    );
    swiper.slideTo(slideIndex);
  };

  const autoplayObj = !autoplay
    ? {}
    : {
        'autoplay-delay': autoplayDelay,
        'autoplay-disable-on-interaction': false,
      };

  return (
    <div className={`ImageSlider ${className}`}>
      <swiper-container
        ref={setSwiperRef}
        speed={1000}
        loop={loop}
        data-testid="swiper"
        {...containerProps}
        {...autoplayObj}
      >
        {items.map((item, index) => (
          <swiper-slide style={{ width: 'auto' }} key={index}>
            {React.createElement(slideElement, {
              data: item,
            })}
          </swiper-slide>
        ))}
      </swiper-container>
      {!showDots ? (
        <></>
      ) : (
        <SliderDots
          activeIndex={activeIndex}
          length={items.length}
          onClick={handleDotClick}
        />
      )}
    </div>
  );
}

export default ImageSlider;
