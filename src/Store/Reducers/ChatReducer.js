import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  chatsData: {},
};

const chatReducer = createSlice({
  name: 'chatRedeucer',
  initialState,
  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = {...action.payload.chatsData};
    },
  },
});
export const setChatsData = chatReducer.actions.setChatsData;
export default chatReducer.reducer;
