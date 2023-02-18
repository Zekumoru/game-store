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
    url: '/games',
  });

  const gamesNoUnavailable = useMemo(() => {
    if (games.length === 0) {
      return Array(4).fill({});
    }

    return games
      .filter((game) => game.price.text !== 'Unavailable')
      .slice(0, 4);
  }, [games]);

  return (
    <>
      <ImageSlider
        className={`home-image-slider`}
        items={gamesNoUnavailable}
        slideElement={GameSlide}
        multiply={3}
        showDots={true}
        loop={true}
        autoplay={true}
        disable={gamesNoUnavailable[0]?.id === undefined}
        autoplayDelay={4000}
        findSlideIndex={(slide, game) =>
          slide.querySelector('.title')?.textContent === game.name
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
