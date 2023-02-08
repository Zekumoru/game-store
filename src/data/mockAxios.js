import axios from 'axios';
import gamesData1 from './games-sample.json';
import gamesData2 from './games-sample-2.json';
import gamesData3 from './games-sample-3.json';
import gamesData4 from './games-sample-4.json';
import gamesData5 from './games-sample-5.json';

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
    data: {},
  },
];

const originalAxiosGet = axios.get;
axios.get = async (url) => {
  const prefetch = prefetches.find((prefetch) => prefetch.url === url);
  if (prefetch != null) {
    console.log('Fetch from cache! Url:', url);
    return { data: prefetch.data };
  }

  return originalAxiosGet(url);
};
