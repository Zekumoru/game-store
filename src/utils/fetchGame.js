import axios from 'axios';
import fetchPrices from './fetchPrices';

const fetchScreenshots = async (id) => {
  const response = await axios.get(`/games/${id}/screenshots`);
  return response.data.results;
};

const fetchGame = async (id) => {
  const response = await axios.get(`/games/${id}`);

  if (response.data.detail === 'Not found.') {
    return null;
  }

  const game = response.data;
  game.screenshots = await fetchScreenshots(id);
  return (await fetchPrices([game]))[0];
};

export default fetchGame;
