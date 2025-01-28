// redux/booksSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching books from the API
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, pageNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: { _page: pageNumber, _limit: 10 },
      });

      return {
        books: response.data.map((todo) => todo.title),
        hasMore: response.data.length > 0,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create a slice for books
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    hasMore: false,
    query: '',
    pageNumber: 1,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    setBooks(state, action) {
      state.books = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...state.books, ...action.payload.books];
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setQuery, setPageNumber, setBooks } = booksSlice.actions;
export default booksSlice.reducer;
