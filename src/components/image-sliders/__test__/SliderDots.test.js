import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SliderDots from '../SliderDots';

describe('Slider Dots', () => {
  it('should show 3 dots', () => {
    render(<SliderDots activeIndex={0} length={3} />);

    expect(screen.getByTestId('dot-0')).toBeInTheDocument();
    expect(screen.getByTestId('dot-1')).toBeInTheDocument();
    expect(screen.getByTestId('dot-2')).toBeInTheDocument();
  });

  it('should show the right active dot', () => {
    render(<SliderDots activeIndex={1} length={3} />);

    expect(screen.getByTestId('dot-1')).toHaveClass('active');
  });

  it('should call onClick when a dot is clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(<SliderDots activeIndex={0} length={4} onClick={handleClick} />);

    const thirdDot = screen.getByTestId('dot-2');
    await user.click(thirdDot);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(2);
  });
});
