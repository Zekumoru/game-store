import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './primary-navigation/PrimaryNavigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<Game />} />
        </Routes>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
