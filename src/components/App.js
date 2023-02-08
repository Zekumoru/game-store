import { useEffect, useState } from 'react';
import { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './GameList';
import ImageSlider from './image-sliders/ImageSlider';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';
import gamesSample from '../data/games-sample.json';
import GameSlide from './image-sliders/GameSlide';
import HeaderIcon from './header-icon/HeaderIcon';

function App() {
  const [games, setGames] = useState([]);

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

  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <ImageSlider
          items={games}
          slideSelector=".title"
          findActiveIndex={(game, titleEl) => game.name === titleEl.textContent}
        >
          {games.map((game) => (
            <GameSlide key={game.id} game={game} />
          ))}
        </ImageSlider>
        <div className="container">
          <HeaderIcon type="h2" icon={flameIcon}>
            Featured Games
          </HeaderIcon>
          <GameList />
        </div>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
