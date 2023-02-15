import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from '../CartContext';
import { render, screen } from '@testing-library/react';
import { useCartItems } from '../CartItemsContext';

describe('CartContext', () => {
  it('must not rerender a component if items in the cart changed because of referential equality', async () => {
    const user = userEvent.setup();
    const rendered = jest.fn();
    const Game = () => {
      const { addToCart } = useCart();
      rendered();
      return (
        <button onClick={() => addToCart({ id: 10992, name: 'OneShot' })}>
          Add to Cart
        </button>
      );
    };
    const Cart = () => {
      const items = useCartItems();
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      );
    };
    render(
      <CartProvider>
        <Game />
        <Cart />
      </CartProvider>
    );

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button'));

    // it's 1 because there's the mount render
    expect(rendered).toHaveBeenCalledTimes(1);
  });

  it('should add game to cart', async () => {
    const user = userEvent.setup();
    const Game = () => {
      const { addToCart } = useCart();
      return (
        <button onClick={() => addToCart({ id: 10992, name: 'OneShot' })}>
          Add to Cart
        </button>
      );
    };
    const Cart = () => {
      const items = useCartItems();
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };
    render(
      <CartProvider>
        <Game />
        <Cart />
      </CartProvider>
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText(/oneshot/i)).toBeInTheDocument();
  });

  test("that the 'Remove from Cart' button appears", async () => {
    const user = userEvent.setup();
    const Game = () => {
      const { addToCart, removeFromCart, inTheCart } = useCart();
      const game = { id: 10992, name: 'OneShot' };
      return inTheCart(game.id) ? (
        <button onClick={() => removeFromCart(game.id)}>
          Remove from Cart
        </button>
      ) : (
        <button onClick={() => addToCart(game)}>Add to Cart</button>
      );
    };
    const Cart = () => {
      const items = useCartItems();
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };
    const Component = () => (
      <CartProvider>
        <Game />
        <Cart />
      </CartProvider>
    );
    const { rerender } = render(<Component />);

    await user.click(screen.getByRole('button'));
    rerender(<Component />);

    expect(screen.getByRole('button')).toHaveTextContent('Remove from Cart');
  });

  it('should remove the game from the cart', async () => {
    const user = userEvent.setup();
    const Game = () => {
      const { addToCart, removeFromCart, inTheCart } = useCart();
      const game = { id: 10992, name: 'OneShot' };
      return inTheCart(game.id) ? (
        <button onClick={() => removeFromCart(game.id)}>
          Remove from Cart
        </button>
      ) : (
        <button onClick={() => addToCart(game)}>Add to Cart</button>
      );
    };
    const Cart = () => {
      const items = useCartItems();
      return (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    };
    const Component = () => (
      <CartProvider>
        <Game />
        <Cart />
      </CartProvider>
    );
    const { rerender } = render(<Component />);

    await user.click(screen.getByRole('button'));
    rerender(<Component />);
    await user.click(screen.getByRole('button'));
    rerender(<Component />);

    expect(screen.queryByText(/oneshot/i)).not.toBeInTheDocument();
  });
});
