import { useEffect } from 'react';
import fetchGames from '../../utils/fetchGames';
import useAsyncOnce from './useAsyncOnce';
import useSessionStorage from './useSessionStorage';

function useCurrency() {
  const [asyncOnce] = useAsyncOnce();
  const [currency, setCurrency] = useSessionStorage('cart-currency', {});

  useEffect(() => {
    if (currency?.symbol !== undefined) return;

    asyncOnce(async () => {
      const games = await fetchGames('/games');

      return () => {
        for (let i = 0; i < games.length; i++) {
          if (games[i].price.currency.symbol !== undefined) {
            setCurrency({
              sample_text: games[i].price.text,
              ...games[i].price.currency,
            });
            return;
          }
        }
        setCurrency({});
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currency;
}

export default useCurrency;
