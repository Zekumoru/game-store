import { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon, { arrowLeftIcon } from '../assets/icons';
import fetchGame from '../utils/fetchGame';
import DateCapsule from './date-capsule/DateCapsule';
import useSessionStorage from './hooks/useSessionStorage';
import ImageSlider from './image-sliders/ImageSlider';
import ScreenshotSlide from './image-sliders/ScreenshotSlide';
import PlatformsIconsList from './platforms-icons-list/PlatformsIconsList';
import PriceButton from './price-button/PriceButton';
import './styles/Game.scss';

function Game() {
  const navigate = useNavigate();
  const [game, setGame] = useSessionStorage('game', {});
  const { id } = useParams();

  useLayoutEffect(() => {
    if (game.id !== Number(id)) {
      setGame({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (game.id === Number(id)) return;

    const loadGameData = async () => {
      const game = await fetchGame(id);
      setGame(game);
    };

    loadGameData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="Game">
      {game.name && (
        <>
          <div
            className="background-image"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 0, 0, 0), rgba(33, 35, 34, 1)),
                url(${game.background_image})`,
            }}
          />
          <div className="overview container">
            <div onClick={() => navigate(-1)} className="back">
              <Icon className="icon" icon={arrowLeftIcon} />
              Back
            </div>
            <div className="title">{game.name}</div>
            <div className="date-platforms">
              <DateCapsule date={game.released} />
              <PlatformsIconsList platforms={game.platforms} />
            </div>
            <div className="genres">
              {game.genres.map((genre) => genre.name).join(', ')}
            </div>
            <PriceButton price={game.price} shrink={false} />
          </div>
          <h2 className="container">Screenshots</h2>
          <ImageSlider
            className="game-image-slider"
            items={game.screenshots}
            slideElement={ScreenshotSlide}
            containerProps={{
              'free-mode': true,
              'slides-per-view': 'auto',
            }}
          />
          <div className="container">
            <h2>About</h2>
            <p>{game.description_raw}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
