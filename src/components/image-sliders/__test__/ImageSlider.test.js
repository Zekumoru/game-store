import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import GameSlide from '../GameSlide';
import ImageSlider from '../ImageSlider';
import games from './mock-data/games-sample-230214.json';

describe('Image Slider', () => {
  it('should load the game titles, prices, and platforms', async () => {
    render(
      <BrowserRouter>
        <ImageSlider items={games} slideElement={GameSlide} />
      </BrowserRouter>
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
      <BrowserRouter>
        <ImageSlider items={games} slideElement={GameSlide} showDots={true} />
      </BrowserRouter>
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
      activeIndex: 0,
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
      <BrowserRouter>
        <ImageSlider
          className={`home-image-slider ${
            games.length === 0 ? 'skeleton-loading' : ''
          }`}
          items={games}
          slideElement={GameSlide}
          showDots={true}
          autoplay={true}
          autoplayDelay={4000}
          findSlideIndex={(slide, game) =>
            // eslint-disable-next-line testing-library/no-node-access
            slide.querySelector('.title').textContent === game.name
          }
        />
      </BrowserRouter>
    );

    const firstDot = screen.getByTestId('dot-0');
    const firstDotBeforeSlideChange = firstDot.cloneNode();
    const thirdDot = screen.getByTestId('dot-2');

    swiperEl.swiper.activeIndex = 2;
    await user.click(thirdDot);

    expect(firstDotBeforeSlideChange).toHaveClass('active');
    expect(firstDot).not.toHaveClass('active');
    expect(thirdDot).toHaveClass('active');
  });
});
