import React, { useEffect, useState } from 'react';
import Icon, { magnifyingGlassIcon } from '../assets/icons';
import SearchBarResults from './search-bar-results/SearchBarResults';
import useDebouncedValue from './hooks/useDebouncedValue';
import './styles/SearchBar.scss';
import fetchGames from '../utils/fetchGames';
import { useLocation } from 'react-router-dom';

function SearchBar({ className }) {
  const [input, setInput] = useState('');
  const [games, setGames] = useState([]);
  const debouncedInput = useDebouncedValue(input);
  const location = useLocation();

  useEffect(() => {
    if (input === '') setGames([]);
  }, [input]);

  useEffect(() => {
    setInput('');
  }, [location]);

  useEffect(() => {
    if (debouncedInput === '') return;

    (async () => {
      const games = await fetchGames(
        `https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&search=${debouncedInput}`,
        {
          limit: 5,
        }
      );
      setGames(games);
    })();
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
          className="results container"
          games={games}
          blurBackground={location.pathname.includes('/games')}
        />
      )}
    </div>
  );
}

export default SearchBar;
