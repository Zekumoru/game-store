import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import GameSlide from '../GameSlide';
import ImageSlider from '../ImageSlider';
import games from './mock-data/games-sample.json';

describe('Image Slider', () => {
  it('should load the game titles, prices, and platforms', async () => {
    render(
      <ImageSlider
        items={games}
        slideSelector=".title"
        findActiveIndex={(game, titleEl) => game.name === titleEl.textContent}
      >
        {games.map((game) => (
          <GameSlide key={game.id} game={game} />
        ))}
      </ImageSlider>
    );

    const platforms = (await screen.findAllByTestId('platforms-icons-list'))[0];

    expect(screen.getByText('Borderlands 2')).toBeInTheDocument();
    expect(screen.getByText('29,99€')).toBeInTheDocument();
    expect(within(platforms).getByTestId('windows-icon')).toBeInTheDocument();
    expect(within(platforms).getByTestId('apple-icon')).toBeInTheDocument();
    expect(
      within(platforms).getByTestId('playstation-icon')
    ).toBeInTheDocument();
    expect(within(platforms).getByTestId('xbox-icon')).toBeInTheDocument();
    expect(within(platforms).getByTestId('android-icon')).toBeInTheDocument();
    expect(within(platforms).getByTestId('linux-icon')).toBeInTheDocument();
  });
});
