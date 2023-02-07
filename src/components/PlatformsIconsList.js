import React, { useEffect, useState } from 'react';
import Icon, {
  androidIcon,
  appleIcon,
  consoleIcon,
  linuxIcon,
  nintendoIcon,
  playstationIcon,
  webIcon,
  windowsIcon,
  xboxIcon,
} from '../assets/icons';
import platformsIds from '../data/platforms.json';

const getIcons = (names) => {
  const icons = [];

  if (names.includes('pc')) {
    icons.push(<Icon key="pc" icon={windowsIcon} />);
  }

  if (names.includes('mac') || names.includes('ios')) {
    icons.push(<Icon key="mac" icon={appleIcon} />);
  }

  if (names.includes('playstation')) {
    icons.push(<Icon key="playstation" icon={playstationIcon} />);
  }

  if (names.includes('xbox')) {
    icons.push(<Icon key="xbox" icon={xboxIcon} />);
  }

  if (names.includes('nintendo')) {
    icons.push(<Icon key="nintendo" icon={nintendoIcon} />);
  }

  if (names.includes('android')) {
    icons.push(<Icon key="android" icon={androidIcon} />);
  }

  if (names.includes('linux')) {
    icons.push(<Icon key="linux" icon={linuxIcon} />);
  }

  if (
    names.includes('neo-geo') ||
    names.includes('atari') ||
    names.includes('sega') ||
    names.includes('3do') ||
    names.includes('commodore-amiga')
  ) {
    icons.push(<Icon key="console" icon={consoleIcon} />);
  }

  if (names.includes('web')) {
    icons.push(<Icon key="web" icon={webIcon} />);
  }

  return icons;
};

function PlatformsIconsList({ platforms = [] }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    if (platforms.length === 0) return;

    const platformsNames = platforms.map((platform) => {
      const { parentSlug } = platformsIds.find(
        (f) => f.id === platform.platform.id
      );
      return parentSlug;
    });

    const icons = getIcons(platformsNames);
    setIcons(icons);
  }, [platforms]);

  return <div className="PlatformsIconsList">{icons}</div>;
}

export default PlatformsIconsList;
