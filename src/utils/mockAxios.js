import axios from 'axios';
import gamesData1 from '../data/games-sample.json';
import gamesData2 from '../data/games-sample-2.json';
import gamesData3 from '../data/games-sample-3.json';
import gamesData4 from '../data/games-sample-4.json';
import gamesData5 from '../data/games-sample-5.json';
import portal2 from '../data/games/portal-2-game-details.json';
import portal2Screenshots from '../data/screenshots/portal-2-screenshots.json';
import counterStrikeGlobalOffensive from '../data/games/counter-strike-global-offensive-game-details.json';
import counterStrikeGlobalOffensiveScreenshots from '../data/screenshots/counter-strike-global-offensive-screenshots.json';
import portal from '../data/games/portal-game-details.json';
import portalScreenshots from '../data/screenshots/portal-screenshots.json';
import left4Dead2 from '../data/games/left-4-dead-2-game-details.json';
import left4Dead2Screenshots from '../data/screenshots/left-4-dead-2-screenshots.json';
import grandTheftAutoV from '../data/games/grand-theft-auto-v-game-details.json';
import grandTheftAutoVScreenshots from '../data/screenshots/grand-theft-auto-v-screenshots.json';

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
    url: 'https://api.rawg.io/api/games/4200/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: portal2Screenshots,
  },
  {
    url: 'https://api.rawg.io/api/games/4291?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: counterStrikeGlobalOffensive,
  },
  {
    url: 'https://api.rawg.io/api/games/4291/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: counterStrikeGlobalOffensiveScreenshots,
  },
  {
    url: 'https://api.rawg.io/api/games/13536?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: portal,
  },
  {
    url: 'https://api.rawg.io/api/games/13536/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: portalScreenshots,
  },
  {
    url: 'https://api.rawg.io/api/games/12020?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: left4Dead2,
  },
  {
    url: 'https://api.rawg.io/api/games/12020/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: left4Dead2Screenshots,
  },
  {
    url: 'https://api.rawg.io/api/games/3498?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: grandTheftAutoV,
  },
  {
    url: 'https://api.rawg.io/api/games/3498/screenshots?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: grandTheftAutoVScreenshots,
  },
  {
    url: 'https://api.rawg.io/api/games/123456789?key=f8c4731c17aa4d39a151c2de730a4e53',
    data: { detail: 'Not found.' },
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
    console.warn(
      'Blocked uncached RAWG request to prevent exhausting API calls.'
    );
    return { data: {} };
  }

  console.log(`Fetching literally now! Url: ${url}`);
  return originalAxiosGet(url);
};
