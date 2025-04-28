//store.tsx
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Types for dispatch and selector hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
