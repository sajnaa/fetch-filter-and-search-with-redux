import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://dummyjson.com/users');
  const data = await response.json();
  console.log(data)
  return data.users;  
});

const initialState = {
  users: [],
  filteredUsers: [],
  selectedUser: null,
  searchQuery: '',
  status: 'idle',  // status: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      console.log(state,"-------",action.payload)
      state.filteredUsers = filterUsers(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const filterUsers = (state) => {
  console.log
  (
   "statekkj", state
  )
  return state.users.filter(user =>{
    console.log("user9u09",user)
    user.name.toLowerCase().includes(state.searchQuery.toLowerCase())

  }
  );
};

export const { setSearchQuery } = UserSlice.actions;
export default UserSlice.reducer;
