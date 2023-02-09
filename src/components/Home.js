import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './game-list/GameList';
import HeaderIcon from './header-icon/HeaderIcon';
import useAsyncOnce from './hooks/useAsyncOnce';
import GameSlide from './image-sliders/GameSlide';
import ImageSlider from './image-sliders/ImageSlider';
import '../data/mockAxios';

function Home() {
  const [asyncOnce] = useAsyncOnce();
  const [nextUrl, setNextUrl] = useState('');
  const [games, setGames] = useState([]);
  const gamesNoUnavailable = useMemo(
    () => games.filter((game) => game.price !== 'Unavailable').slice(0, 4),
    [games]
  );

  const fetchGames = async (url) => {
    const response = await axios.get(url);
    const games = await fetchPrices(response.data.results);
    setNextUrl(response.data.next);
    return games;
  };

  useEffect(() => {
    asyncOnce(async () => {
      const games = await fetchGames(
        'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53'
      );
      setGames(games);
    });
  }, [asyncOnce]);

  const handleLoadMore = () => {
    asyncOnce(async () => {
      const newGames = await fetchGames(nextUrl);
      setGames((games) => [...games, ...newGames]);
    });
  };

  return (
    <>
      <ImageSlider
        items={gamesNoUnavailable}
        slideSelector=".title"
        findActiveIndex={(game, titleEl) => game.name === titleEl.textContent}
      >
        {gamesNoUnavailable.map((game) => (
          <GameSlide key={game.id} game={game} />
        ))}
      </ImageSlider>
      <div className="container">
        <HeaderIcon type="h2" icon={flameIcon}>
          Featured Games
        </HeaderIcon>
        <GameList games={games} onLoadMore={handleLoadMore} />
      </div>
    </>
  );
}

export default Home;
