import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSearchQuery } from '../store/UserSlice';

const FilterableUserTable = () => {
  const dispatch = useDispatch();
  const { users, filteredUsers, searchQuery, status, error } = useSelector(state => state.users);
console.log(filteredUsers)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }

  }, [dispatch, status]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <label htmlFor="search-input">Search Users:</label>
        <input
          type="text"
          id="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by user name"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilterableUserTable;
