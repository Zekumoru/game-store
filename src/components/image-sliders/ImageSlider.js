import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSwiper from '../hooks/useSwiper';
import SliderDots from './SliderDots';

function ImageSlider({
  className,
  items,
  slideElement,
  multiply = 1,
  autoplay = false,
  showDots = false,
  loop = false,
  disable = false,
  autoplayDelay = 2000,
  onSlideClick = () => {},
  findSlideIndex = () => {},
  containerProps = {},
}) {
  const [swiper, setSwiperRef] = useSwiper();
  const [activeIndex, setActiveIndex] = useState(0);

  const itemsToDisplay = useMemo(() => {
    let itemsToDisplay = [...items];
    for (let i = 1; i < multiply; i++) {
      itemsToDisplay = [...itemsToDisplay, ...items];
    }
    return itemsToDisplay;
  }, [items, multiply]);

  const handleDotClick = useCallback(
    (index) => {
      const item = items[index];
      const slideIndex = swiper.slides.findIndex((slide) =>
        findSlideIndex(slide, item)
      );

      if (slideIndex < 0) return;

      swiper.slideTo(slideIndex);
    },
    [findSlideIndex, items, swiper]
  );

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
    handleDotClick(0);
    handleSlideChange();

    if (disable) swiper.disable();
    else swiper.enable();

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper, items, autoplay, disable, findSlideIndex, handleDotClick]);

  const autoplayObj = !autoplay
    ? {}
    : {
        'autoplay-delay': autoplayDelay,
        'autoplay-disable-on-interaction': false,
      };

  useEffect(() => {
    if (!autoplay) return;
    if (swiper == null) return;
    if (swiper.autoplay.running) return;

    if (items[0]?.id === undefined) {
      swiper.autoplay.pause();
    } else {
      swiper.autoplay.start();
    }
  }, [swiper, items, autoplay]);

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
        {itemsToDisplay.map((item, index) => (
          <swiper-slide
            class="slide"
            style={{ width: 'auto', height: 'auto' }}
            key={index}
          >
            {React.createElement(slideElement, {
              data: item,
              slideIndex: index,
              onClick: onSlideClick,
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
