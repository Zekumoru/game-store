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
import pcPlatform from '../data/parent-platform-games/pc.json';
import macPlatform from '../data/parent-platform-games/mac.json';
import playstationPlatform from '../data/parent-platform-games/playstation.json';
import xboxPlatform from '../data/parent-platform-games/xbox.json';
import nintendoPlatform from '../data/parent-platform-games/nintendo.json';
import androidPlatform from '../data/parent-platform-games/android.json';
import iosPlatform from '../data/parent-platform-games/ios.json';
import linuxPlatform from '../data/parent-platform-games/linux.json';
import webPlatform from '../data/parent-platform-games/web.json';
import action from '../data/genres-games/action.json';
import adventure from '../data/genres-games/adventure.json';
import arcade from '../data/genres-games/arcade.json';
import boardGames from '../data/genres-games/board-games.json';
import card from '../data/genres-games/card.json';
import casual from '../data/genres-games/casual.json';
import educational from '../data/genres-games/educational.json';
import family from '../data/genres-games/family.json';
import fighting from '../data/genres-games/fighting.json';
import indie from '../data/genres-games/indie.json';
import massiveMultiplayer from '../data/genres-games/massive-multiplayer.json';
import platformer from '../data/genres-games/platformer.json';
import puzzle from '../data/genres-games/puzzle.json';
import racing from '../data/genres-games/racing.json';
import rpg from '../data/genres-games/rpg.json';
import shooter from '../data/genres-games/shooter.json';
import simulation from '../data/genres-games/simulation.json';
import sports from '../data/genres-games/sports.json';
import strategy from '../data/genres-games/strategy.json';

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
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=1',
    data: pcPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=5',
    data: macPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=2',
    data: playstationPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=3',
    data: xboxPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=7',
    data: nintendoPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=8',
    data: androidPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=4',
    data: iosPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=6',
    data: linuxPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&parent_platforms=14',
    data: webPlatform,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=19',
    data: family,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=15',
    data: sports,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=4',
    data: action,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=28',
    data: boardGames,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=3',
    data: adventure,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=6',
    data: fighting,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=59',
    data: massiveMultiplayer,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=1',
    data: racing,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=2',
    data: shooter,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=5',
    data: rpg,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=11',
    data: arcade,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=40',
    data: casual,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=51',
    data: indie,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=14',
    data: simulation,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=34',
    data: educational,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=10',
    data: strategy,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=83',
    data: platformer,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=7',
    data: puzzle,
  },
  {
    url: 'https://api.rawg.io/api/games?key=f8c4731c17aa4d39a151c2de730a4e53&genres=17',
    data: card,
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
