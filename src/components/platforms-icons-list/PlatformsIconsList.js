import React, { useEffect, useState } from 'react';
import Icon from '../../assets/icons';
import platformsIds from './data/platforms.json';
import platformsIcons from './platforms-icons';
import '../../styles/components/PlatformsIconsList.scss';

const getIcons = (names, iconProps = {}) => {
  const icons = [];

  platformsIcons.forEach((parentPlatform) => {
    for (let i = 0; i < parentPlatform.platforms.length; i++) {
      const platform = parentPlatform.platforms[i];

      if (names.includes(platform)) {
        icons.push(
          <Icon
            key={parentPlatform.name}
            icon={parentPlatform.icon}
            className="icon"
            data-testid={`${parentPlatform.name}-icon`}
            {...iconProps}
          />
        );
        break;
      }
    }
  });

  return icons;
};

function PlatformsIconsList({ platforms = [], iconProps }) {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    if (platforms.length === 0) return;

    const platformsNames = platforms.map((platform) => {
      const { parentSlug } = platformsIds.find(
        (f) => f.id === platform.platform.id
      );
      return parentSlug;
    });

    const icons = getIcons(platformsNames, iconProps);
    setIcons(icons);
  }, [platforms, iconProps]);

  return (
    <div className="PlatformsIconsList" data-testid="platforms-icons-list">
      {icons}
    </div>
  );
}

export default PlatformsIconsList;
