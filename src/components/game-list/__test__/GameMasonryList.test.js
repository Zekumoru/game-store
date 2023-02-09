import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Masonry, useInfiniteLoader } from 'masonic';
import GameMasonryList from '../GameMasonryList';
import games from '../../../data/games-sample.json';

jest.mock('masonic');

const mockMasonry = () => {
  let actions = {};

  useInfiniteLoader.mockImplementation((loadMoreAsyncCallback) => {
    return {
      loadMoreAsyncCallback,
    };
  });

  Masonry.mockImplementation(({ onRender }) => {
    actions.scrollDown = () => onRender.loadMoreAsyncCallback();
    return null;
  });

  return actions;
};

describe('GameMasonryList', () => {
  it('should not load any games if onLoadMore is not passed', () => {
    const actions = mockMasonry();
    render(<GameMasonryList games={games} />);

    expect(() => actions.scrollDown()).toThrow(/undefined/);
  });

  it('should load more if scrolled down', () => {
    const actions = mockMasonry();
    const loadMore = jest.fn();
    render(<GameMasonryList games={games} onLoadMore={loadMore} />);

    actions.scrollDown();
    actions.scrollDown();
    actions.scrollDown();

    expect(loadMore).not.toHaveBeenCalledTimes(0);
  });
});
