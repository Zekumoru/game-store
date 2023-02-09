import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './primary-navigation/PrimaryNavigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import '../data/mockAxios';
import Redirect from './Redirect';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Redirect to="/" />} />
          <Route path="/games/:id" element={<Game />} />
        </Routes>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
