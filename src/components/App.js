import { useEffect, useState } from 'react';
import Icon, { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './GameList';
import ImageSlider from './image-sliders/ImageSlider';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';
import gamesSample from '../data/games-sample.json';
import GameSlide from './image-sliders/GameSlide';

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
          <h2
            style={{
              display: 'flex',
              gap: '4px',
            }}
          >
            Featured Games
            <Icon className="icon" icon={flameIcon} />
          </h2>
          <GameList />
        </div>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
