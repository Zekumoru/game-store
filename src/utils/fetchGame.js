import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchScreenshots = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53`
  );
  return response.data.results;
};

const fetchGame = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=f8c4731c17aa4d39a151c2de730a4e53`
  );

  if (response.data.detail === 'Not found.') {
    return null;
  }

  const game = response.data;
  game.screenshots = await fetchScreenshots(id);
  return (await fetchPrices([game]))[0];
};

export default fetchGame;
