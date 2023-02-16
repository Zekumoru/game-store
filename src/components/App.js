import PrimaryHeader from './PrimaryHeader';
import PrimaryNavigation from './primary-navigation/PrimaryNavigation';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import Login from './Login';
import Cart from './Cart';
import { CartProvider } from './contexts/CartContext';
import useCurrency from './hooks/useCurrency';
import SidebarNavigation from './sidebar-navigation/SidebarNavigation';
import './styles/App.scss';

function App() {
  useCurrency(); // loads up currency in session storage
  const location = useLocation();
  const hideSidebar = /\/(login|signup)/i.test(location.pathname);

  return (
    <div className="App">
      <PrimaryHeader />
      <CartProvider>
        <main>
          {hideSidebar || <SidebarNavigation />}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
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
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </main>
      </CartProvider>
      <PrimaryNavigation />
    </div>
  );
}

export default App;
