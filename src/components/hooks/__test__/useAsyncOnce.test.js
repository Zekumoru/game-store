import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
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
});
