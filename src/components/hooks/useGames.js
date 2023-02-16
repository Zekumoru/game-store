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

  const handleLoadMore = (statusCallback) => {
    if (games.length === 0) {
      if (typeof statusCallback === 'function') {
        statusCallback('Loading games');
      }
      return;
    }

    if (!shouldFetch) {
      if (typeof statusCallback === 'function') {
        statusCallback('Fetching is disabled');
      }
      return;
    }

    if (nextUrl === null) {
      if (typeof statusCallback === 'function') {
        statusCallback('No more games');
      }
      return;
    }

    asyncOnce(
      async () => {
        const { games: newGames, nextUrl: newNextUrl } =
          await handleLoadMoreGames(nextUrl);

        return () => {
          setGames((games) => [...games, ...newGames]);
          setNextUrl(newNextUrl);

          if (typeof statusCallback === 'function') {
            statusCallback('Added more games');
          }
        };
      },
      { override: !once }
    );
  };

  return { games, handleLoadMore };
}

export default useGames;
