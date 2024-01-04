export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export function updateLocalStorage(state) {
  window.localStorage.setItem('cart', JSON.stringify(state));
}

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case 'ADD_TO_CARD': {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        /* 👀  const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1; */

        /* 👶 const newState = state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }); */

        // ⚡
        const newState = [
          ...state.slice(0, productInCartIndex),
          {
            ...state[productInCartIndex],
            quantity: state[productInCartIndex].quantity + 1,
          },
          ...state.slice(productInCartIndex + 1),
        ];

        updateLocalStorage(newState);

        return newState;
      }

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];

      updateLocalStorage(newState);

      return newState;
    }
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }
    case 'CLEAR_CART': {
      updateLocalStorage([]);
      return [];
    }
  }

  return state;
};
