import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchGames = async (
  url,
  { limit = Infinity, setNextUrlCallback = () => {} }
) => {
  const response = await axios.get(url);
  const games = await fetchPrices(response.data.results.slice(0, limit));
  setNextUrlCallback(response.data.next);
  return games;
};

export default fetchGames;
