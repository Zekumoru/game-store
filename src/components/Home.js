import { useEffect, useMemo } from 'react';
import { flameIcon } from '../assets/icons';
import GameMasonryList from './game-list/GameMasonryList';
import HeaderIcon from './header-icon/HeaderIcon';
import useAsyncOnce from './hooks/useAsyncOnce';
import GameSlide from './image-sliders/GameSlide';
import ImageSlider from './image-sliders/ImageSlider';
import useSessionStorage from './hooks/useSessionStorage';
import './styles/Home.scss';
import fetchGames from '../utils/fetchGames';

function Home() {
  const [asyncOnce] = useAsyncOnce();
  const [nextUrl, setNextUrl] = useSessionStorage('home-next-url', '');
  const [games, setGames] = useSessionStorage('home-games', []);
  const gamesNoUnavailable = useMemo(
    () => games.filter((game) => game.price !== 'Unavailable').slice(0, 4),
    [games]
  );

  useEffect(() => {
    if (games.length !== 0) return;

    asyncOnce(async () => {
      const games = await fetchGames(
        'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53',
        setNextUrl
      );
      setGames(games);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    asyncOnce(async () => {
      const newGames = await fetchGames(nextUrl, setNextUrl);
      setGames((games) => [...games, ...newGames]);
    });
  };

  return (
    <>
      <ImageSlider
        className={`home-image-slider ${
          gamesNoUnavailable.length === 0 ? 'skeleton-loading' : ''
        }`}
        items={gamesNoUnavailable}
        slideElement={GameSlide}
        showDots={true}
        loop={true}
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
        <GameMasonryList games={games} onLoadMore={handleLoadMore} />
      </div>
    </>
  );
}

export default Home;
