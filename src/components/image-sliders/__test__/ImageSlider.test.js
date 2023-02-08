import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('should change slide when user pressed on one of the slider dots', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
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

    //
    // mock swiper
    //
    const swiperEl = screen.getByTestId('swiper');
    let onSlideChange;
    swiperEl.swiper = {
      update: () => {},
      on: (eventName, callback) => {
        onSlideChange = callback;
      },
      off: () => {},
      slideTo: () => {
        onSlideChange();
      },
      realIndex: 0,
      slides: [
        {
          querySelector: () => ({ textContent: 'Borderlands 2' }),
        },
        {
          querySelector: () => ({ textContent: 'Red Dead Redemption 2' }),
        },
        {
          querySelector: () => ({ textContent: 'Half-Life 2' }),
        },
        {
          querySelector: () => ({ textContent: 'Limbo' }),
        },
      ],
    };

    rerender(
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

    const firstDot = screen.getByTestId('dot-0');
    const firstDotBeforeSlideChange = firstDot.cloneNode();
    const thirdDot = screen.getByTestId('dot-2');

    swiperEl.swiper.realIndex = 2;
    await user.click(thirdDot);

    expect(firstDotBeforeSlideChange).toHaveClass('active');
    expect(firstDot).not.toHaveClass('active');
    expect(thirdDot).toHaveClass('active');
  });
});
