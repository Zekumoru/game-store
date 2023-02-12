import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Form from '../Form';
import LabelInput from '../LabelInput';

describe('Form', () => {
  it('should show error messages when clicked on submit while required fields are empty', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <LabelInput
          label="Username"
          placeholder="e.g. Foo, Bar, Zalgo"
          requiredMessage="Username is required"
          validate={(input) => {
            if (!/^[A-Z\s]*$/i.test(input)) return 'Only letters are allowed';
            return '';
          }}
          required
          data-testid="username-input"
        />
        <LabelInput
          label="Password"
          type="password"
          requiredMessage="Password is required"
          required
          data-testid="password-input"
        />
        <button>Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button'));
    // form is submitted even though inputs are invalid hence the
    // act below triggers the needed invalid events for this test
    // issue: jsdom/jsdom#2898
    act(() => {
      screen.getByTestId('username-input').dispatchEvent(
        new InputEvent('invalid', {
          bubbles: true,
          cancelable: true,
        })
      );
      screen.getByTestId('password-input').dispatchEvent(
        new InputEvent('invalid', {
          bubbles: true,
          cancelable: true,
        })
      );
    });

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('should not show error messages if inputs are valid', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <LabelInput
          label="Username"
          placeholder="e.g. Foo, Bar, Zalgo"
          requiredMessage="Username is required"
          validate={(input) => {
            if (!/^[A-Z\s]*$/i.test(input)) return 'Only letters are allowed';
            return '';
          }}
          required
          data-testid="username-input"
        />
        <LabelInput
          label="Password"
          type="password"
          requiredMessage="Password is required"
          required
          data-testid="password-input"
        />
        <button>Submit</button>
      </Form>
    );

    await user.click(screen.getByLabelText(/username/i));
    await user.keyboard('Hello world');
    await user.click(screen.getByLabelText(/password/i));
    await user.keyboard('Some password');

    expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  it('should show error messages if inputs are invalid', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <LabelInput
          label="Username"
          placeholder="e.g. Foo, Bar, Zalgo"
          requiredMessage="Username is required"
          validate={(input) => {
            if (!/^[A-Z\s]*$/i.test(input)) return 'Only letters are allowed';
            return '';
          }}
          required
          data-testid="username-input"
        />
        <LabelInput
          label="Password"
          type="password"
          requiredMessage="Password is required"
          required
          data-testid="password-input"
        />
        <button>Submit</button>
      </Form>
    );

    await user.click(screen.getByLabelText(/username/i));
    await user.keyboard('123');
    await user.click(screen.getByLabelText(/password/i));
    await user.keyboard('a{Backspace}');

    expect(screen.getByText(/only letters are allowed/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('should show error when focusing in then focusing out, without typing anything, in a required input element', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <LabelInput
          label="Username"
          placeholder="e.g. Foo, Bar, Zalgo"
          requiredMessage="Username is required"
          validate={(input) => {
            if (!/^[A-Z\s]*$/i.test(input)) return 'Only letters are allowed';
            return '';
          }}
          required
          data-testid="username-input"
        />
        <LabelInput
          label="Password"
          type="password"
          requiredMessage="Password is required"
          required
          data-testid="password-input"
        />
        <button>Submit</button>
      </Form>
    );

    await user.click(screen.getByLabelText(/username/i));
    await user.click(screen.getByLabelText(/password/i));

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
  });

  it('should not show the error message when typed in an invalid input the first time', async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <LabelInput
          label="Username"
          placeholder="e.g. Foo, Bar, Zalgo"
          requiredMessage="Username is required"
          validate={(input) => {
            if (!/^[A-Z\s]*$/i.test(input)) return 'Only letters are allowed';
            return '';
          }}
          required
          data-testid="username-input"
        />
        <LabelInput
          label="Password"
          type="password"
          requiredMessage="Password is required"
          required
          data-testid="password-input"
        />
        <button>Submit</button>
      </Form>
    );

    await user.click(screen.getByLabelText(/username/i));
    await user.keyboard('a2');

    expect(
      screen.queryByText(/only letters are allowed/i)
    ).not.toBeInTheDocument();
  });
});
