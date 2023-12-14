import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/AuthReducer';
import ScreenReducer from './Reducers/ScreenReducer';
import SignupReducer from './Reducers/SignupReducer';
import TermServicesReducer from './Reducers/TermServicesReducer';

export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ScreenReducer: ScreenReducer,
    SignupReducer: SignupReducer,
    TermServicesReducer: TermServicesReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
