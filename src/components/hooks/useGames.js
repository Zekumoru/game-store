import { useEffect } from 'react';
import fetchGames from '../../utils/fetchGames';
import handleLoadMoreGames from '../../utils/handleLoadMoreGames';
import useAsyncOnce from './useAsyncOnce';
import useSessionStorage from './useSessionStorage';

function useGames({
  key,
  url,
  refetch = false,
  limit = Infinity,
  shouldFetch = true,
  once = true,
} = {}) {
  const [asyncOnce] = useAsyncOnce();
  const [games, setGames] = useSessionStorage(key, []);
  const [nextUrl, setNextUrl] = useSessionStorage(`${key}-next-url`, '');

  useEffect(() => {
    if (games.length !== 0 && !refetch) return;
    if (!shouldFetch) return;
    setGames([]);
    setNextUrl('');

    asyncOnce(
      async () => {
        console.log(url);
        const games = await fetchGames(url, {
          setNextUrlCallback: setNextUrl,
          limit,
        });

        return () => {
          setGames(games);
        };
      },
      { override: !once }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const handleLoadMore = () => {
    if (games.length === 0) return;
    if (!shouldFetch) return;

    asyncOnce(
      async () => {
        const { games: newGames, nextUrl: newNextUrl } =
          await handleLoadMoreGames(nextUrl);

        return () => {
          setGames((games) => [...games, ...newGames]);
          setNextUrl(newNextUrl);
        };
      },
      { override: !once }
    );
  };

  return { games, handleLoadMore };
}

export default useGames;
