import React, { useEffect, useState } from 'react';
import useSwiper from '../hooks/useSwiper';
import GameSlide from './GameSlide';
import gamesSample from '../../data/games-sample.json';
import '../../styles/components/ImageSlider.scss';
import SliderDots from './SliderDots';
import fetchPrices from '../../utils/fetchPrices';

function ImageSlider() {
  const [swiper, setSwiperRef] = useSwiper();
  const [games, setGames] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const initializeGames = async () => {
      const games = await fetchPrices(gamesSample.results);
      const gamesNoUnavailable = games.filter(
        (game) => game.price !== 'Unavailable'
      );

      setGames(gamesNoUnavailable.slice(5, 9));
    };

    initializeGames();
  }, []);

  useEffect(() => {
    if (swiper == null) return;
    swiper.update();

    const handleSlideChange = () => {
      if (games.length === 0) return;

      const currentSlide = swiper.slides[swiper.realIndex];
      const title = currentSlide.querySelector('.title').textContent;

      const activeIndex = games.findIndex((game) => game.name === title);
      setActiveIndex(activeIndex);
    };

    swiper.on('slideChange', handleSlideChange);
    handleSlideChange();

    return () => {
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper, games]);

  const handleDotClick = (index) => {
    const game = games[index];
    const slideIndex = swiper.slides.findIndex(
      (slide) => slide.querySelector('.title').textContent === game.name
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
        {games.map((game) => (
          <swiper-slide key={game.id}>
            <GameSlide game={game} />
          </swiper-slide>
        ))}
      </swiper-container>
      <SliderDots
        activeIndex={activeIndex}
        length={games.length}
        onClick={handleDotClick}
      />
    </div>
  );
}

export default ImageSlider;
