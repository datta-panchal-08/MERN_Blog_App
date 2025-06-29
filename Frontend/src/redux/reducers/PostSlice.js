import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  refresh:false
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    removePosts: (state) => {
      state.posts = [];
    },
    setApiRefresher:(state)=>{
      state.refresh = !state.refresh
    }
  },
});

export const { setPosts,setApiRefresher, removePosts } = postSlice.actions;
export default postSlice.reducer;
