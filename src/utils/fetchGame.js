import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchGame = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=f8c4731c17aa4d39a151c2de730a4e53`
  );
  const game = response.data;
  return (await fetchPrices([game]))[0];
};

export default fetchGame;
