import { useEffect } from 'react';
import fetchGames from '../../utils/fetchGames';
import useAsyncOnce from './useAsyncOnce';
import useSessionStorage from './useSessionStorage';

function useGames({ key, url, limit = Infinity, shouldFetch = true }) {
  const [asyncOnce] = useAsyncOnce();
  const [games, setGames] = useSessionStorage(key, []);
  const [nextUrl, setNextUrl] = useSessionStorage(`${key}-next-url`, []);

  useEffect(() => {
    if (games.length !== 0) return;
    if (!shouldFetch) return;

    asyncOnce(async () => {
      const games = await fetchGames(url, {
        setNextUrlCallback: setNextUrl,
        limit,
      });
      setGames(games);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!shouldFetch) return;

    asyncOnce(async () => {
      const newGames = await fetchGames(nextUrl, {
        setNextUrlCallback: setNextUrl,
      });
      setGames((games) => [...games, ...newGames]);
    });
  };

  return { games, handleLoadMore };
}

export default useGames;
