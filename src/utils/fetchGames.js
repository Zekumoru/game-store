import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchGames = async (url, setNextUrlCallback = () => {}) => {
  const response = await axios.get(url);
  const games = await fetchPrices(response.data.results);
  setNextUrlCallback(response.data.next);
  return games;
};

export default fetchGames;
