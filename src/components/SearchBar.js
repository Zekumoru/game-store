import React, { useEffect, useState } from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';
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

  useEffect(() => {
    if (input !== '') return;

    setGames([]);
    setNotFound(false);
  }, [input]);

  useEffect(() => {
    setInput('');
    setNotFound(false);
  }, [location]);

  useEffect(() => {
    if (debouncedInput === '') return;

    asyncOnce(
      async () => {
        const games = await fetchGames(
          `https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&search=${debouncedInput}`,
          {
            limit: 5,
          }
        );

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
    <div className={`SearchBar ${className}`}>
      <Icon icon={magnifyingGlassIcon} className="icon" />
      <input
        type="text"
        className="text-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      {input !== '' && (
        <SearchBarResults
          search={debouncedInput}
          className="results container"
          games={games}
          blurBackground={location.pathname.includes('/games')}
          notFound={notFound}
        />
      )}
    </div>
  );
}

export default SearchBar;
