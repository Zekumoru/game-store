import Icon, { flameIcon } from '../assets/icons';
import GameList from './GameList';
import ImageSlider from './image-sliders/ImageSlider';
import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './PrimaryNavigation';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <ImageSlider />
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
