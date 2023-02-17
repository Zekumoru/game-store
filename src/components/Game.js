import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon, { arrowLeftIcon, clockIcon, webIcon } from '../assets/icons';
import fetchGame from '../utils/fetchGame';
import DateCapsule from './date-capsule/DateCapsule';
import useSessionStorage from './hooks/useSessionStorage';
import ImageSlider from './image-sliders/ImageSlider';
import ScreenshotSlide from './image-sliders/ScreenshotSlide';
import PlatformsIconsList from './platforms-icons-list/PlatformsIconsList';
import PriceButton from './price-button/PriceButton';
import useAsyncOnce from './hooks/useAsyncOnce';
import './styles/Game.scss';
import GameLoading from './game-loading/GameLoading';
import NotFound from './not-found/NotFound';
import RatingStars from './rating-stars/RatingStars';

function Game() {
  const [asyncOnce] = useAsyncOnce();
  const navigate = useNavigate();
  const [game, setGame] = useSessionStorage('game', {});
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();

  useLayoutEffect(() => {
    if (game.id !== Number(id)) {
      setGame({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (game.id === Number(id)) return;

    asyncOnce(async () => {
      const game = await fetchGame(id);
      if (game == null) {
        setNotFound(true);
        return;
      }

      setGame(game);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="Game">
      <div className="container">
        <div onClick={() => navigate(-1)} className="back">
          <Icon className="icon" icon={arrowLeftIcon} />
          Back
        </div>
      </div>
      {!game.name ? (
        notFound ? (
          <NotFound>Game not found!</NotFound>
        ) : (
          <GameLoading />
        )
      ) : (
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
            <div className="title">{game.name}</div>
            <div className="date-platforms">
              <DateCapsule date={game.released} />
              <PlatformsIconsList platforms={game.platforms} />
            </div>
            <div className="genres">
              {game.genres.map((genre) => genre.name).join(', ')}
            </div>
            <PriceButton game={game} freeStringToShrink={false} />
          </div>
          <div className="extra-info container">
            <div className="playtime">
              <h2>Playtime</h2>
              <Icon className="icon" icon={clockIcon} />
              <p>{game.playtime} hours</p>
            </div>
            <div className="rating">
              <h2>Rating</h2>
              <RatingStars rating={game.rating} />
              <p>
                {game.rating}/{game.rating_top}
              </p>
            </div>
            <div className="website">
              <h2>Website</h2>
              <Icon className="icon" icon={webIcon} />
              <p className="underlined">
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {game.website}
                </a>
              </p>
            </div>
          </div>
          <h2 className="container">Screenshots</h2>
          <ImageSlider
            className="game-image-slider image-slider-unwrapped"
            items={game.screenshots}
            slideElement={ScreenshotSlide}
            containerProps={{
              'free-mode': true,
              'slides-per-view': 'auto',
            }}
          />
          <div className="container">
            <h2>About</h2>
            <p className="overflow-wrap-word">{game.description_raw}</p>
            <h2>Developers</h2>
            <p>
              {game.developers.map((developer) => developer.name).join(', ')}
            </p>
            <h2>Platforms</h2>
            <p>
              {game.platforms
                .map((platform) => platform.platform.name)
                .join(', ')}
            </p>
            <h2>Released</h2>
            <p>{game.released}</p>
            <h2>Stores</h2>
            <ul>{game.stores.map((store) => store.store.name).join(', ')}</ul>
            <h2>Tags</h2>
            <ul>{game.tags.map((tag) => tag.name).join(', ')}</ul>
            <p className="data-provided">
              Data provided by{' '}
              <a
                className="underlined"
                href="https://rawg.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                RAWG
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
