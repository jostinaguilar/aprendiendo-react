import { useContext } from 'react';
import { AddToCartIcon, RemoveFromCartIcon } from './Icons';
import './Products.css';
import { CartContext } from '../context/cart';

export function Products({ products }) {
  const { addToCart, removeToCart, cart } = useContext(CartContext);

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong>
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                  onClick={() =>
                    isProductInCart ? removeToCart(product) : addToCart(product)
                  }
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
