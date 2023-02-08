import { useEffect, useMemo, useState } from 'react';
import { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './game-list/GameList';
import ImageSlider from './image-sliders/ImageSlider';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';
import gamesSample from '../data/games-sample.json';
import GameSlide from './image-sliders/GameSlide';
import HeaderIcon from './header-icon/HeaderIcon';

const getGamesNoUnavailable = (games, start = 0, end = games.length) => {
  return games.filter((game) => game.price !== 'Unavailable').slice(start, end);
};

function App() {
  const [games, setGames] = useState([]);
  const gamesNoUnavailable = useMemo(
    () => getGamesNoUnavailable(games, 5, 9),
    [games]
  );

  useEffect(() => {
    const initializeGames = async () => {
      const games = await fetchPrices(gamesSample.results);
      setGames(games);
    };

    initializeGames();
  }, []);

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
          <GameList games={games} />
        </div>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
