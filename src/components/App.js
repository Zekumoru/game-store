import Icon, { flameIcon } from '../assets/icons';
import Carousel from './Carousels/Carousel';
import GameList from './GameList';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <Carousel />
        <div className="container">
          <h2>
            Featured Games
            <Icon icon={flameIcon} />
          </h2>
          <GameList />
        </div>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
