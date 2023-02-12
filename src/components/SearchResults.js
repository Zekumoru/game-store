import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListPage from './list-page/ListPage';
import fetchGames from '../utils/fetchGames';
import handleLoadMoreGames from '../utils/handleLoadMoreGames';
import useAsyncOnce from './hooks/useAsyncOnce';

function SearchResults() {
  const [asyncOnce] = useAsyncOnce();
  const { search } = useParams();
  const [games, setGames] = useState([]);
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    setGames([]);
    setNextUrl('');

    asyncOnce(
      async () => {
        const url = `https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&search=${search}`;
        const games = await fetchGames(url, {
          setNextUrlCallback: setNextUrl,
        });

        return () => {
          setGames(games);
        };
      },
      { override: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleLoadMore = () => {
    if (games.length === 0) return;

    asyncOnce(async () => {
      const { games: newGames, nextUrl: newNextUrl } =
        await handleLoadMoreGames(nextUrl);

      return () => {
        setGames((games) => [...games, ...newGames]);
        setNextUrl(newNextUrl);
      };
    });
  };

  return (
    <ListPage
      title={`Search results for ${search}`}
      games={games}
      onLoadMore={handleLoadMore}
    />
  );
}

export default SearchResults;