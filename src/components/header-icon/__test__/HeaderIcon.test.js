import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { flameIcon } from '../../../assets/icons';
import HeaderIcon from '../HeaderIcon';

describe('Header Icon', () => {
  it('should show text', () => {
    render(<HeaderIcon type="h2">Hello world!</HeaderIcon>);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('should show icon', () => {
    render(
      <HeaderIcon type="h2" icon={flameIcon}>
        Hello world!
      </HeaderIcon>
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
