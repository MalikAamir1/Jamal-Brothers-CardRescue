import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: false,
  error: '',
  status: '',
};

const TermServicesReducer = createSlice({
  name: 'termservicesReducer',
  // initialState,
  initialState,
  reducers: {
    termservicesScreen: (state, action) => {
      state.userData = action.payload;
    },
    removetermservicesScreen: (state, action) => {
      state.userData = false;
    },
  },
});

export default TermServicesReducer.reducer;
export const {termservicesScreen, removetermservicesScreen} =
  TermServicesReducer.actions;
