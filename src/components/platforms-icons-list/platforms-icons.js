import {
  androidIcon,
  appleIcon,
  consoleIcon,
  linuxIcon,
  nintendoIcon,
  playstationIcon,
  webIcon,
  windowsIcon,
  xboxIcon,
} from '../../assets/icons';

const platformsIcons = [
  {
    name: 'windows',
    platforms: ['pc'],
    icon: windowsIcon,
  },
  {
    name: 'apple',
    platforms: ['mac', 'ios'],
    icon: appleIcon,
  },
  {
    name: 'playstation',
    platforms: ['playstation'],
    icon: playstationIcon,
  },
  {
    name: 'xbox',
    platforms: ['xbox'],
    icon: xboxIcon,
  },
  {
    name: 'nintendo',
    platforms: ['nintendo'],
    icon: nintendoIcon,
  },
  {
    name: 'android',
    platforms: ['android'],
    icon: androidIcon,
  },
  {
    name: 'linux',
    platforms: ['linux'],
    icon: linuxIcon,
  },
  {
    name: 'console',
    platforms: ['neo-geo', 'atari', 'sega', '3do', 'commodore-amiga'],
    icon: consoleIcon,
  },
  {
    name: 'web',
    platforms: ['web'],
    icon: webIcon,
  },
];

export default platformsIcons;
