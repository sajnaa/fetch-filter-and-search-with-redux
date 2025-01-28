// ScrollPage.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, setPageNumber, fetchBooks ,setBooks} from '../store/booksSlice';

export default function ScrollPages() {
  const dispatch = useDispatch();
  
  const { books, loading, hasMore, query, pageNumber } = useSelector(
    (state) => state.booksState
  );

  // Fetch books whenever query or pageNumber changes
  useEffect(() => {
    if (!query) return; // Skip if no query
    dispatch(fetchBooks({ query, pageNumber })); // Dispatch API call
  }, [query, pageNumber, dispatch]);

  const loadMoreBooks = () => {
    if (!loading && hasMore) {
      dispatch(setPageNumber(pageNumber + 1)); // Load more books when triggered
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          dispatch(setQuery(e.target.value)); // Update the query in Redux
          dispatch(setPageNumber(1)); // Reset to page 1 when new search is initiated
          dispatch(setBooks([])); // Clear previous books
        }}
      />
      <div>
        {books.map((book, index) => (
          <div key={index}>
            {book}
            {index === books.length - 1 && (
              <div onScroll={loadMoreBooks}>Load More</div> // Trigger more load when reaching last book
            )}
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </>
  );
}
