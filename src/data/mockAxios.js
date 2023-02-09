import axios from 'axios';
import gamesData1 from './games-sample.json';
import gamesData2 from './games-sample-2.json';
import gamesData3 from './games-sample-3.json';
import gamesData4 from './games-sample-4.json';
import gamesData5 from './games-sample-5.json';
import portal2 from './portal-2-game-details.json';
import counterStrikeGlobalOffensive from './counter-strike-global-offensive-game-details.json';
import portal from './portal-game-details.json';
import left4Dead2 from './left-4-dead-2-game-details.json';
import grandeTheftAutoV from './grand-theft-auto-v-game-details.json';

const prefetches = [
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: gamesData1,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=2',
    data: gamesData2,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=3',
    data: gamesData3,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=4',
    data: gamesData4,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=5',
    data: gamesData5,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=6',
    data: {
      results: [],
      next: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&page=5',
    },
  },
  {
    url: 'https://api.rawg.io/api/games/4200?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: portal2,
  },
  {
    url: 'https://api.rawg.io/api/games/4291?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: counterStrikeGlobalOffensive,
  },
  {
    url: 'https://api.rawg.io/api/games/13536?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: portal,
  },
  {
    url: 'https://api.rawg.io/api/games/12020?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: left4Dead2,
  },
  {
    url: 'https://api.rawg.io/api/games/3498?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: grandeTheftAutoV,
  },
];

const originalAxiosGet = axios.get;
axios.get = async (url) => {
  const prefetch = prefetches.find((prefetch) => prefetch.url === url);
  if (prefetch != null) {
    console.log('Fetched from cache! Url:', url);
    return { data: prefetch.data };
  }

  if (url.includes('f8c4731c17aa4d39a151c2de730a4e53')) {
    console.log(
      'Blocked uncached RAWG request to prevent exhausting API calls.'
    );
    return { data: {} };
  }

  console.log(`Fetching literally now! Url: ${url}`);
  return originalAxiosGet(url);
};
