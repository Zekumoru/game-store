import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSessionStorage from '../useSessionStorage';

describe('useSessionStorage', () => {
  it('should return the initial value if key is not in storage', () => {
    const Component = () => {
      const [message] = useSessionStorage('message', 'Hello world!');

      return <div>{message}</div>;
    };

    render(<Component />);

    expect(screen.getByText('Hello world!')).toBeInTheDocument();
  });

  it('should save the value in storage', async () => {
    const Component = () => {
      // eslint-disable-next-line no-unused-vars
      const [message, setMessage] = useSessionStorage(
        'message',
        'Hello world!'
      );

      return (
        <button
          onClick={() => {
            setMessage('Foo and bar!');
          }}
        >
          Save
        </button>
      );
    };

    const user = userEvent.setup();
    render(<Component />);

    await user.click(screen.getByRole('button'));

    expect(sessionStorage.getItem('message')).toMatch(/Foo and bar!/);
  });
});
