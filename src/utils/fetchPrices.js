import axios from 'axios';

const PRICE_API_URL = 'https://www.zekumoru.com/steam-price';

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
