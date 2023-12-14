import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: false,
  error: '',
  status: '',
};

const SignupReducer = createSlice({
  name: 'signupReducer',
  // initialState,
  initialState,
  reducers: {
    signupScreen: (state, action) => {
      state.userData = action.payload;
    },
    removeSignupScreen: (state, action) => {
      state.userData = false;
    },
  },
});

export default SignupReducer.reducer;
export const {signupScreen, removeSignupScreen} = SignupReducer.actions;
