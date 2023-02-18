import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchGames = async (
  url,
  {
    limit = Number.MAX_SAFE_INTEGER,
    setNextUrlCallback = () => {},
    includePrices = true,
  } = {}
) => {
  try {
    const response = await axios.get(url);

    if (response.data.next === null) {
      setNextUrlCallback(null);
    } else {
      const params = new URLSearchParams({ ...response.data.next });
      setNextUrlCallback(`/games?${params.toString()}`);
    }

    if (!includePrices) {
      return response.data.results;
    }

    const gamesWithPrices = await fetchPrices(
      response.data.results.slice(0, limit)
    );
    return gamesWithPrices;
  } catch (e) {
    console.error(
      `An error occurred while fetching games! Make sure that the url and/or query parameters are correct! It is also possible that the data has not been found.\nUrl: ${url}`
    );
    console.error('Error:', e.message);
    return [];
  }
};

export default fetchGames;
