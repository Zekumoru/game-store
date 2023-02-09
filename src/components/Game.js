import { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetchGame from '../utils/fetchGame';
import DateCapsule from './date-capsule/DateCapsule';
import useSessionStorage from './hooks/useSessionStorage';
import PlatformsIconsList from './platforms-icons-list/PlatformsIconsList';
import PriceButton from './price-button/PriceButton';
import './styles/Game.scss';

function Game() {
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
            <div className="back">Back</div>
            <div className="title">{game.name}</div>
            <DateCapsule date={game.released} />
            <PlatformsIconsList platforms={game.platforms} />
            <div className="genres">
              {game.genres.map((genre) => genre.name).join(', ')}
            </div>
            <PriceButton price={game.price} shrink={false} />
          </div>
          <div className="details container">
            <div>
              <h2>Screenshots</h2>
            </div>
            <div>
              <h2>About</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
