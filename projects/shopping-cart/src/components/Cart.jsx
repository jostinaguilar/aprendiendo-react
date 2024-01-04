import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons';

import './Cart.css';
import { useContext } from 'react';
import { CartContext } from '../context/cart';

function CartItem({ thumbnail, price, quantity, title, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>
      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartId = useId();
  const { cart, clearToCart, addToCart } = useContext(CartContext);

  return (
    <>
      <label htmlFor={cartId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartId} hidden />
      <aside className="cart">
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
          <button onClick={clearToCart}>
            <ClearCartIcon />
          </button>
        </ul>
      </aside>
    </>
  );
}
