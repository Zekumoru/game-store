import React from 'react';
import Icon, {
  cartIcon,
  githubIcon,
  homeIcon,
  logoIcon,
  pcIcon,
  svgrepoIcon,
  swordIcon,
} from '../../assets/icons';
import SidebarNavItem from './SidebarNavItem';
import './styles/SidebarNavigation.scss';
import platforms from '../../data/platforms.json';
import genres from '../../data/genres.json';
import CartItemsCount from '../cart-items-count/CartItemsCount';
import { Link } from 'react-router-dom';

function SidebarNavigation() {
  return (
    <div className="SidebarNavigation container">
      <SidebarNavItem icon={homeIcon} linkTo="/">
        Home
      </SidebarNavItem>
      <SidebarNavItem icon={cartIcon} linkTo="/cart">
        Cart <CartItemsCount />
      </SidebarNavItem>
      <SidebarNavItem subitems={platforms} icon={pcIcon} linkTo="/platforms">
        Platforms
      </SidebarNavItem>
      <SidebarNavItem subitems={genres} icon={swordIcon} linkTo="/genres">
        Genres
      </SidebarNavItem>
      <section className="credits">
        <Link to="/">
          <div className="logo">
            <Icon className="icon" icon={logoIcon} />
            GameStore
          </div>
        </Link>
        <p className="credits-item">
          Made by Zekumoru
          <a
            href="https://github.com/Zekumoru/game-store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="icon" icon={githubIcon} />
          </a>
        </p>
        <p className="credits-item">
          Icons provided by
          <a
            href="https://www.svgrepo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              className="icon"
              icon={svgrepoIcon}
              style={{ width: '48px' }}
            />
          </a>
        </p>
        <p style={{ lineHeight: '1.2' }}>
          All games data are fetched from{' '}
          <a
            className="underlined fw-bold"
            href="https://rawg.io/"
            rel="noopener noreferrer"
            target="_blank"
            style={{
              letterSpacing: '3px',
            }}
          >
            RAWG
          </a>{' '}
          and the prices are web scraped using my own{' '}
          <a
            className="underlined"
            href="https://github.com/Zekumoru/steam-price-fetcher"
            rel="noopener noreferrer"
            target="_blank"
          >
            Steam Prices API
            <Icon className="icon paragraph-icon" icon={githubIcon} />
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default SidebarNavigation;
