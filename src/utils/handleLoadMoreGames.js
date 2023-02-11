import fetchGames from './fetchGames';

const handleLoadMoreGames = async (url) => {
  if (url === '') return null;

  let nextUrl = false;
  const games = await fetchGames(url, {
    setNextUrlCallback: (url) => (nextUrl = url),
  });

  return {
    games,
    nextUrl,
  };
};

export default handleLoadMoreGames;
