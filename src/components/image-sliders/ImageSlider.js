import React, { useEffect, useState } from 'react';
import useSwiper from '../hooks/useSwiper';
import GameSlide from './GameSlide';
import data from './data.json';
import axios from 'axios';

function ImageSlider() {
  const [swiper, setSwiperRef] = useSwiper();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const games = data.results;
      const response = await axios.post(
        'http://194.163.190.50:3001/steam-price',
        {
          titles: games.map((game) => game.name),
        }
      );
      const fetchedItems = response.data.items;
      games.forEach((game) => {
        const index = fetchedItems.findIndex(
          (item) => item.title === game.name
        );
        game.price = fetchedItems[index].price || 'Unavailable';
      });

      setGames(games.filter((game) => game.price !== 'Unavailable'));
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    swiper?.update();
  }, [swiper]);

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
    </div>
  );
}

export default ImageSlider;
