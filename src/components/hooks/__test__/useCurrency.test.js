import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as fetchGamesModule from '../../../utils/fetchGames';
import useCurrency from '../useCurrency';

describe('useCurrency', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => null);
    sessionStorage.clear();
  });

  it('should show currency symbol', async () => {
    jest.spyOn(fetchGamesModule, 'default').mockImplementation(() => {
      return [
        {
          price: { value: 9.99, currency: { symbol: '€', placement: 'right' } },
        },
      ];
    });
    const Component = () => {
      const currency = useCurrency();
      return <div>{currency.symbol}</div>;
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Component />);
    });

    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it('should try and find a currency then display its symbol', async () => {
    jest.spyOn(fetchGamesModule, 'default').mockImplementation(() => {
      return [
        {
          price: { value: 9.99, currency: {} },
        },
        {
          price: { value: 9.99, currency: {} },
        },
        {
          price: { value: 9.99, currency: { symbol: '€', placement: 'right' } },
        },
      ];
    });
    const Component = () => {
      const currency = useCurrency();
      return <div>{currency.symbol}</div>;
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Component />);
    });

    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it("should not show any currency symbols if there aren't found any", async () => {
    jest.spyOn(fetchGamesModule, 'default').mockImplementation(() => {
      return [
        {
          price: { value: 9.99, currency: {} },
        },
      ];
    });
    const Component = () => {
      const currency = useCurrency();
      return <div>{currency.symbol}</div>;
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Component />);
    });

    expect(screen.queryByText('€')).not.toBeInTheDocument();
  });

  it('should not fetch games to get the currency if it is already saved in session storage', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      return '{"symbol":"€","placement":"right"}';
    });
    const spyFetchGames = jest.spyOn(fetchGamesModule, 'default');
    spyFetchGames.mockImplementation(() => {
      return [
        {
          price: { value: 9.99, currency: {} },
        },
      ];
    });
    const Component = () => {
      const currency = useCurrency();
      return <div>{currency.symbol}</div>;
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Component />);
    });

    expect(spyFetchGames).not.toHaveBeenCalledTimes(1);
  });

  it('should return a sample price text', async () => {
    const spyFetchGames = jest.spyOn(fetchGamesModule, 'default');
    spyFetchGames.mockImplementation(() => {
      return [
        {
          price: {
            value: 9.99,
            currency: { symbol: '€', placement: 'right' },
            text: '9,99€',
          },
        },
      ];
    });
    const Component = () => {
      const currency = useCurrency();
      return <div>{currency.sample_text}</div>;
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Component />);
    });

    expect(screen.getByText('9,99€')).toBeInTheDocument();
  });
});
