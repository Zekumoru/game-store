import axios from 'axios';

const PRICE_API_URL = 'http://194.163.190.50:3001/steam-price';

const fetchPrices = async (games) => {
  const response = await axios.post(PRICE_API_URL, {
    titles: games.map((game) => game.name),
  });

  const fetchedItems = response.data.items;
  games.forEach((game) => {
    const index = fetchedItems.findIndex((item) => item.title === game.name);
    game.price = fetchedItems[index].price || 'Unavailable';
  });

  return games;
};

export default fetchPrices;
