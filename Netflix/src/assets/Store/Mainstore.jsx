import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
export const moviesApi = createAsyncThunk(
  "moviesApi/express",
  async (query, thunkApi) => {
    console.log(query);
    let queryurl;
    const arrangeQuery = (query) => {
      console.log('itshere');
    //   const a= query.join('&');
      // console.log(a);
      queryurl = `${query.searchquery}?${query.filterquery}`;
      console.log(queryurl);
      console.log('hellooo');
      return queryurl;
    };
    const url= arrangeQuery(query);
    console.log(url);
    const res = await axios.get(`http://127.0.0.1:8000/${url}`);
    const { data } = await res.data;
    // console.log(data);
    return data;
  }
);
export const moviesSlice = createSlice({
  name: "movies",
  initialState: { fetching: false, fetched: false, error: null, data: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moviesApi.fulfilled, (state, action) => {
      console.log("whithin thunk");
      state.fetched = true;
      state.data = action.payload;
      console.log(state.data);
    });
    builder.addCase(moviesApi.pending, (state, action) => {
      //  action.payload.abortsignal();
      state.fetching = true;
    });
    builder.addCase(moviesApi.rejected, (state, action) => {
      // console.log(action);
      state.error = action.payload;
    });
  },
});

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
  },
});
export const moviesAction = moviesSlice.actions;
export default store;
