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
        <h2>
          Featured Games
          <Icon icon={flameIcon} />
        </h2>
        <GameList />
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
