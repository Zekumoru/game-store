import { useEffect } from 'react';
import useAsyncOnce from '../hooks/useAsyncOnce';
import fetchGames from '../../utils/fetchGames';
import ImageSlider from '../image-sliders/ImageSlider';
import GameCardSlide from '../image-sliders/GameCardSlide';
import useSessionStorage from '../hooks/useSessionStorage';

function Platform({ platform }) {
  const [asyncOnce] = useAsyncOnce();
  const [games, setGames] = useSessionStorage(`platform-${platform.id}`, []);

  useEffect(() => {
    if (games.length !== 0) return;

    asyncOnce(async () => {
      const games = await fetchGames(
        `https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=${platform.id}`,
        {
          limit: 5,
        }
      );
      setGames(games);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Platform">
      <div className="container mg-b4">
        <h2>{platform.name}</h2>
      </div>
      <ImageSlider
        className="image-slider-unwrapped mg-b8"
        // passing 5 nulls will make GameCardSlide to render 5 loading cards
        items={games.length !== 0 ? games : [null, null, null, null, null]}
        slideElement={GameCardSlide}
        containerProps={{
          'free-mode': true,
          'slides-per-view': 'auto',
        }}
      />
      <div className="container mg-b16">
        <div className="underlined">View more</div>
      </div>
    </div>
  );
}

export default Platform;
