import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchGames = async (
  url,
  { limit = Number.MAX_SAFE_INTEGER, setNextUrlCallback = () => {} } = {}
) => {
  const response = await axios.get(url);

  try {
    const games = await fetchPrices(response.data.results.slice(0, limit));
    setNextUrlCallback(response.data.next);
    return games;
  } catch (e) {
    console.error(
      `An error occurred while fetching games! Make sure that the url and/or query parameters are correct! It is also possible that the data has not been found.\nUrl: ${url}`
    );
    console.error('Error:', e.message);
    return [];
  }
};

export default fetchGames;
