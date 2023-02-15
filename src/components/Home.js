import { useMemo } from 'react';
import { flameIcon } from '../assets/icons';
import GameMasonryList from './game-list/GameMasonryList';
import HeaderIcon from './header-icon/HeaderIcon';
import GameSlide from './image-sliders/GameSlide';
import ImageSlider from './image-sliders/ImageSlider';
import './styles/Home.scss';
import useGames from './hooks/useGames';

function Home() {
  const { games, handleLoadMore } = useGames({
    key: 'home-games',
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53',
  });

  const gamesNoUnavailable = useMemo(
    () => games.filter((game) => game.price.text !== 'Unavailable').slice(0, 4),
    [games]
  );

  return (
    <>
      <ImageSlider
        className={`home-image-slider ${
          gamesNoUnavailable.length === 0 ? 'skeleton-loading' : ''
        }`}
        items={gamesNoUnavailable}
        slideElement={GameSlide}
        multiply={3}
        showDots={true}
        loop={true}
        autoplay={true}
        autoplayDelay={4000}
        findSlideIndex={(slide, game) =>
          slide.querySelector('.title').textContent === game.name
        }
        containerProps={{
          'slides-per-view': 'auto',
        }}
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
