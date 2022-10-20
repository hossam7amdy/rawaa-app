import { configureStore } from '@reduxjs/toolkit';

import { CartReducer } from './CartSlice';
import { OrdersReducer } from './OrdersSlice';
import { AddressReducer } from './AddressSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
    orders: OrdersReducer,
    address: AddressReducer,
  },
});

export default store;
