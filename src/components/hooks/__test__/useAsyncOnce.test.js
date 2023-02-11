import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import useAsyncOnce from '../useAsyncOnce';

const waitByMilliseconds = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

describe('useAsyncOnce', () => {
  it('should not fire more than one while the first one is not finished yet', async () => {
    const DELAY_MS = 100;

    const run = jest.fn();
    let timesRunAsyncOnceCallback = 0;

    const Component = () => {
      const [asyncOnce] = useAsyncOnce();

      return (
        <button
          onClick={() => {
            run();
            asyncOnce(async () => {
              timesRunAsyncOnceCallback++;
              await waitByMilliseconds(DELAY_MS);
            });
          }}
        >
          Run
        </button>
      );
    };

    const user = userEvent.setup();
    render(<Component />);
    const button = screen.getByRole('button');

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(run).toBeCalledTimes(3);
    expect(timesRunAsyncOnceCallback).toBe(1);
  });

  test('that running is true then turns to false after async callback on asyncOnce', async () => {
    const DELAY_MS = 100;

    let resolve = null;
    const promise = new Promise((resolveInPromise) => {
      resolve = resolveInPromise;
    });

    let running = false;
    const Component = () => {
      const [asyncOnce, runningInComponent] = useAsyncOnce();

      useEffect(() => {
        running = runningInComponent;
      }, [runningInComponent]);

      return (
        <button
          onClick={() => {
            asyncOnce(async () => {
              await waitByMilliseconds(DELAY_MS);
              resolve();
            });
          }}
        >
          Run
        </button>
      );
    };

    const user = userEvent.setup();
    render(<Component />);
    const button = screen.getByRole('button');

    // Nothing called yet, so should be false
    expect(running).toBe(false);

    // Now called, so should be true
    await user.click(button);
    expect(running).toBe(true);

    // Make sure running is still true
    await user.click(button);
    await user.click(button);
    await user.click(button);
    expect(running).toBe(true);

    // Wait to finish and assert that running is false
    await act(async () => {
      await promise;
    });
    expect(running).toBe(false);
  });

  it('should cancel the previous promise if cancelled option is true', async () => {
    const data = {
      message: '',
      promise: Promise.resolve(),
      resolve: null,
      delay: 100,
      createPromise() {
        this.promise = new Promise((resolveInPromise) => {
          this.resolve = resolveInPromise;
        });
      },
    };

    const Component = () => {
      const [asyncOnce] = useAsyncOnce();
      const [messages, setMessages] = useState([]);

      return (
        <>
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
          <button
            onClick={() => {
              asyncOnce(
                async () => {
                  const message = data.message;
                  await waitByMilliseconds(data.delay);

                  return () => {
                    setMessages((messages) => [...messages, message]);
                    data.resolve();
                  };
                },
                { override: true }
              );
            }}
          >
            Run
          </button>
        </>
      );
    };

    const user = userEvent.setup();
    render(<Component />);
    const button = screen.getByRole('button');

    data.createPromise();
    data.message = 'First message!';
    await user.click(button);

    // since it has just been clicked, the message
    // in the component shouldn't be updated yet
    expect(screen.queryByText(/first message/i)).not.toBeInTheDocument();

    await act(async () => {
      await data.promise;
    });

    // now it should be updated
    expect(screen.getByText(/first message/i)).toBeInTheDocument();

    data.createPromise();
    data.message = 'Do not let this message come through!';
    await user.click(button);

    data.message = 'Second message!';
    await user.click();
    await act(async () => {
      await data.promise;
    });

    // previous async call should have been cancelled
    expect(
      screen.queryByText(/do not let this message/i)
    ).not.toBeInTheDocument();
    expect(screen.getByText(/second message/i)).toBeInTheDocument();
  });
});
