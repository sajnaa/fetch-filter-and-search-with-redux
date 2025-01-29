import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchdata = createAsyncThunk(
  '/userdetails/fetchdata',
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const data = await response.json();
    console.log('-----')
    return data;
  }
);

const initialState = {
  user: [],
  error: null,
  status: 'idle',
  searchdata: "",
  filteredUsers: [],
  autofilldata: '',
  page:1
};

const UserList = createSlice({
  name: 'userdetails',
  initialState,
  reducers: {   
    search: (state, action) => {
      state.status = "success";
      state.searchdata = action.payload;
      console.log(action.payload)
    },
    filterdata: (state, action) => {
      state.status = "success";
      console.log(
        action.payload
      )
      state.filteredUsers = state.user.filter(
        (item) =>
          item.title.toLowerCase().includes(state.searchdata.toLowerCase()) ||
          item.id.toString().includes(state.searchdata)
      );

    },
    autofill: (state, action) => {
      state.status = 'success';
      state.autofilldata = action.payload
      console.log(action.payload)
    },
    pagination:(state,action)=>{
      state.status='success';
      if(action.payload >1 && action.payload !=state.page && action.payload <= state.user.length/10){
        state.page=action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
        // if (action.payload.length < 10) {
        // }
        state.filteredUsers = action.payload;
      })
      .addCase(fetchdata.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { search, filterdata, autofill,pagination } = UserList.actions
export default UserList.reducer;
