import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { flameIcon } from '../assets/icons';
import fetchPrices from '../utils/fetchPrices';
import GameList from './game-list/GameList';
import HeaderIcon from './header-icon/HeaderIcon';
import useAsyncOnce from './hooks/useAsyncOnce';
import GameSlide from './image-sliders/GameSlide';
import ImageSlider from './image-sliders/ImageSlider';
import useSessionStorage from './hooks/useSessionStorage';
import '../data/mockAxios';

function Home() {
  const [asyncOnce] = useAsyncOnce();
  const [nextUrl, setNextUrl] = useSessionStorage('home-next-url', '');
  const [games, setGames] = useSessionStorage('home-games', []);
  const gamesNoUnavailable = useMemo(
    () => games.filter((game) => game.price !== 'Unavailable').slice(0, 4),
    [games]
  );

  const fetchGames = async (url) => {
    const response = await axios.get(url);
    const games = await fetchPrices(response.data.results);
    setNextUrl(response.data.next);
    return games;
  };

  useEffect(() => {
    if (games.length !== 0) return;

    asyncOnce(async () => {
      const games = await fetchGames(
        'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53'
      );
      setGames(games);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    asyncOnce(async () => {
      const newGames = await fetchGames(nextUrl);
      setGames((games) => [...games, ...newGames]);
    });
  };

  return (
    <>
      <ImageSlider
        items={gamesNoUnavailable}
        slideElement={GameSlide}
        showDots={true}
        autoplay={true}
        autoplayDelay={4000}
        findSlideIndex={(slide, game) =>
          slide.querySelector('.title').textContent === game.name
        }
      />
      <div className="container">
        <HeaderIcon type="h2" icon={flameIcon}>
          Featured Games
        </HeaderIcon>
        <GameList games={games} onLoadMore={handleLoadMore} />
      </div>
    </>
  );
}

export default Home;
