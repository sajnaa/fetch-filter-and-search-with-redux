import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice.js';
import UserList from './Userlist.js'
import booksReducer from './booksSlice';
const store = configureStore({
  reducer: {
    // users: userReducer,
    userdetails:UserList,
    // booksState: booksReducer,
  },
});

export default store;
