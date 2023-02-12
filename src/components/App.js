import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './primary-navigation/PrimaryNavigation';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import '../utils/mockAxios';
import Redirect from './Redirect';
import Platforms from './Platforms';
import Genres from './Genres';
import ExpandCategory from './category/ExpandCategory';
import platforms from '../data/platforms.json';
import genres from '../data/genres.json';
import SearchResults from './SearchResults';
import SignUp from './SignUp';

function App() {
  return (
    <div className="App">
      <PrimaryHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route
            path="/platforms/:id"
            element={
              <ExpandCategory
                title="Platforms"
                query="parent_platforms"
                categories={platforms}
              />
            }
          />
          <Route path="/genres" element={<Genres />} />
          <Route
            path="/genres/:id"
            element={
              <ExpandCategory
                title="Genres"
                query="genres"
                categories={genres}
              />
            }
          />
          <Route path="/search" element={<Redirect to="/" />} />
          <Route path="/search/:search" element={<SearchResults />} />
          <Route path="/games" element={<Redirect to="/" />} />
          <Route path="/games/:id" element={<Game />} />
        </Routes>
      </main>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
