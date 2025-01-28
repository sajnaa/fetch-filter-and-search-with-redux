import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function ScrollPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef(null); // Ref for intersection observer

  // Fetch books whenever query or pageNumber changes
  useEffect(() => {
    if (!query) return; // Skip if no query
    setLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/todos', {
        params: { _page: pageNumber, _limit: 10 },
      })
      .then((res) => {
        setBooks((prevBooks) => [
          ...prevBooks,
          ...res.data.map((todo) => todo.title),
        ]); // Extract titles
  
        setHasMore(res.data.length > 0); // Check if there are more items to load
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query, pageNumber]);

  // Set up the IntersectionObserver to detect when the last item is visible
  const lastBookElementRef = (node) => {
    if (loading) return; // Skip if loading
    if (observer.current) observer.current.disconnect(); // Disconnect the observer to avoid multiple triggers
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prev) => prev + 1); // Increment page number to load more items
      }
    });
    if (node) observer.current.observe(node); // Observe the last item
  };

  const loadMoreBooks = () => {
    if (!loading && hasMore) {
      setPageNumber((prev) => prev + 1); // Load more books when triggered
    }
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPageNumber(1); // Reset to page 1 when new search is initiated
          setBooks([]); // Clear previous books
        }}
      />
      <div>
        {books.map((book, index) => (
          <div
            key={book}
            ref={index === books.length - 1 ? lastBookElementRef : null} // Set ref for the last book item
          >
            {book}
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </>
   
  );
}


