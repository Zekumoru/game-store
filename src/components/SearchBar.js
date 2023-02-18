import React, { useEffect, useId, useState } from 'react';
import Icon, { crossIcon, magnifyingGlassIcon } from '../assets/icons';
import SearchBarResults from './search-bar-results/SearchBarResults';
import useDebouncedValue from './hooks/useDebouncedValue';
import './styles/SearchBar.scss';
import fetchGames from '../utils/fetchGames';
import { useLocation } from 'react-router-dom';
import useAsyncOnce from './hooks/useAsyncOnce';

function SearchBar({ className }) {
  const [asyncOnce] = useAsyncOnce();
  const [input, setInput] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [games, setGames] = useState([]);
  const debouncedInput = useDebouncedValue(input);
  const location = useLocation();
  const id = useId();

  const clear = () => {
    setInput('');
    setGames([]);
    setNotFound(false);
  };

  useEffect(() => {
    if (input !== '') return;
    clear();
  }, [input]);

  useEffect(() => {
    clear();
  }, [location]);

  useEffect(() => {
    if (debouncedInput === '') return;

    asyncOnce(
      async () => {
        setGames([]); // clear games to show skeleton loading on new search
        const games = await fetchGames(`/games?search=${debouncedInput}`, {
          limit: 5,
        });

        return () => {
          setNotFound(games.length === 0);
          setGames(games);
        };
      },
      { override: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  return (
    <div className={`SearchBar ${className ?? ''}`}>
      <label htmlFor={id}>
        <Icon icon={magnifyingGlassIcon} className="icon" />
      </label>
      <input
        id={id}
        type="text"
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      {input !== '' && (
        <>
          <Icon className="icon cross" icon={crossIcon} onClick={clear} />
          <SearchBarResults
            search={debouncedInput}
            className="results container"
            games={games}
            blurBackground={location.pathname.includes('/games')}
            notFound={notFound}
          />
        </>
      )}
    </div>
  );
}

export default SearchBar;
