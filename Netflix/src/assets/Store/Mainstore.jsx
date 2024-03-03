import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const moviesApi = createAsyncThunk(
  "moviesApiexpress",
  async (query, thunkApi) => {
    // console.log(query);
    const search = query.searchquery || "";
    const filter = query.filterquery ? `${query.filterquery}` : "";
    const sort = query.Sortquery ? `&sort=${query.Sortquery}` : "";
    const field = query.Fieldquery ? `&field=${query.Fieldquery}` : "";

    // console.log(search,filter,sort,field,"still here");
    const queryurl = `${search}?${filter}${sort}${field}`;
    console.log(queryurl,"hellooooo");
    const res = await axios.get(`http://127.0.0.1:8000/${queryurl}`);
   const data= await res.data;
    console.log(data);
    return data;
  }
);
export const userApi= createAsyncThunk("user/auth",async(thunkApi)=>{
  const res= await axios.post('http://127.0.0.1:8000/user/signup',{
    "username": "t77",
    "email": "t77@gmail.com",
    "photo": "bnvkfge",
    "password": "123456789",
    "confirmPassword": "123456789",
    "role": "admin1"
  });
  return await res.data;
  
  // console.log(res);
})
export const moviesSlice = createSlice({
  name: "movies",
  initialState: { fetching: false, fetched: false, error: null, searchdata: null },
  reducers: {
    fetchingStateControl: (state, action) => {
      state.fetching = action.payload.fetching;
    },
    initialfetchingStateControl: (state, action) => {
      state.fetching = action.payload.fetching;
      state.fetched = action.payload.fetched;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(moviesApi.fulfilled, (state, action) => {
      console.log("whithin thunk");
      state.fetched = true;
      state.fetching = false;
      // console.log(action.payload,"we r here");
      state.searchdata = action.payload;
      // console.log(state.searchdata);
    });
    builder.addCase(moviesApi.pending, (state, action) => {
      //  action.payload.abortsignal();
      state.fetching = true;
      state.fetched = false;
    });
    builder.addCase(moviesApi.rejected, (state, action) => {
      // console.log(action);

      state.error = action.payload;
    });
    
  },
  // extraReducers:(builder)=>{
  //   builder.addCase(userApi.fulfilled,(state,action)=>{
  //     console.log(action.payload,"inside thunk of userapi");
  //   });
  // }
});
export const userSlice= createSlice({
  name:"user",
  initialState:{user:null,loggedin:false,token:null},
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(userApi.fulfilled,(state,action)=>{
      console.log(action.payload,"inside thunk of userapi");
      state.loggedin=true;
      state.token=action.payload.data.tokenid;
    });
  }
});

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    user:userSlice.reducer
  },
});
export const moviesAction = moviesSlice.actions;
export const userAction = userSlice.actions;
export default store;
