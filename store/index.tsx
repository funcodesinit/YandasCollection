import { configureStore, ThunkAction, Action  } from '@reduxjs/toolkit';
import reducers from './reducers/_all';

// Create a store factory function
export const makeStore = () => {
  return configureStore({
    reducer: reducers, // Use combined reducers (if applicable),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check
      }),
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
 
// import { configureStore } from '@reduxjs/toolkit'
// import reducers from './reducers/_all';
 

// export const store =  configureStore({
//   reducer: reducers,
//   devTools: process.env.NODE_ENV !== 'production'
// }) 

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;  
