import { useEffect, useMemo, useState } from 'react';
import { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './game-list/GameList';
import ImageSlider from './image-sliders/ImageSlider';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';
import GameSlide from './image-sliders/GameSlide';
import HeaderIcon from './header-icon/HeaderIcon';
import useAsyncOnce from './hooks/useAsyncOnce';
import axios from 'axios';
import '../data/mockAxios';

const getGamesNoUnavailable = (games, start = 0, end = games.length) => {
  return games.filter((game) => game.price !== 'Unavailable').slice(start, end);
};

function App() {
  const [asyncOnce] = useAsyncOnce();
  const [nextUrl, setNextUrl] = useState('');
  const [games, setGames] = useState([]);
  const gamesNoUnavailable = useMemo(
    () => getGamesNoUnavailable(games, 0, 4),
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
    <div className="App">
      <PrimaryHeader />
      <main>
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
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
