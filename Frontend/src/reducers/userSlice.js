import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    userName: '', 
  },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserName(state, action) { 
      state.userName = action.payload;
    },
  },
});

export const { setUserId, setUserName } = userSlice.actions;

export default userSlice.reducer;
