import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const moviesApi = createAsyncThunk(
  "moviesApiexpress",
  async (query, thunkApi) => {
    const {headers}=query;
    const search = query.searchquery || "";
    const filter = query.filterquery ? `${query.filterquery}` : "";
    const sort = query.Sortquery ? `&sort=${query.Sortquery}` : "";
    const field = query.Fieldquery ? `&field=${query.Fieldquery}` : "";
    const queryurl = `${search}?${filter}${sort}${field}`;
    const res = await axios.get(`http://127.0.0.1:8000/${queryurl}`,{headers});
    const data = await res.data;
    console.log(data);
    return data;
  }
);
export const userApi = createAsyncThunk(
  "user/auth",
  async (action, thunkApi) => {
    const { type } = action;

    if (type == "signup") {
      const res = await axios.post(
        "http://127.0.0.1:8000/user/signup",
        action.data
      );
      return await res.data;}
      if (type == "login") {
        const res = await axios.post(
          "http://127.0.0.1:8000/user/login",
          action.data
        );
      console.log(res);
      return await res.data;
    }
  
});
export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    fetching: false,
    fetched: false,
    error: null,
    searchdata: null,
  },
  reducers: {
    fetchingStateControl: (state, action) => {
      console.log(action.payload);
      state.fetching = action.payload.fetching;
    },
    initialfetchingStateControl: (state, action) => {
      state.fetching = action.payload.fetching;
      state.fetched = action.payload.fetched;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moviesApi.fulfilled, (state, action) => {
      state.fetched = true;
      state.fetching = false;
      state.searchdata = action.payload;
    });
    builder.addCase(moviesApi.pending, (state, action) => {
      state.fetching = true;
      state.fetched = false;
    });
    builder.addCase(moviesApi.rejected, (state, action) => {
      state.error = action.error.message;
      
    });
  },
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
    loggedin: false,
    token: undefined,
    signed: false,
    loggedout: false,
  },
  reducers: {
    checkuserapi: (state, action) => {},
    signapi: (state, action) => {},
    Logout: (state) => {
      state.loggedout = true;
      state.loggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userApi.fulfilled, (state, action) => {
      state.loggedin = true;
      state.signed = true;
      console.log(action.payload);
      // state.user=action.payload.data.usercreated.username||action.payload.data.userfound.username;
      state.user = action.payload.data.usercreated||action.payload.data.userfound;
      state.token = action.payload.data.tokenid;
    });
    builder.addCase(userApi.rejected,(state,action)=>{
      state.error= action.error.message;
    })
  },
});

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    user: userSlice.reducer,
  },
});
export const moviesAction = moviesSlice.actions;
export const userAction = userSlice.actions;
export default store;
