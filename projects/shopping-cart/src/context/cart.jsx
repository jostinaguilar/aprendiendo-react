import { createContext, useReducer } from 'react';
import { cartInitialState, cartReducer } from '../reducers/cart';

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CARD',
      payload: product,
    });

  const removeToCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    });

  const clearToCart = () =>
    dispatch({
      type: 'CLEAR_CART',
    });

  return { state, addToCart, removeToCart, clearToCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeToCart, clearToCart } = useCartReducer();

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeToCart,
        clearToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
