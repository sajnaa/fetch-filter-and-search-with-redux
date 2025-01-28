
import React, { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdata, search, filterdata, autofill,pagination} from '../../store/Userlist';
import './Table.css';

export default function Table() {
  const dispatch = useDispatch();
  const { status, user, error, searchdata, filteredUsers, autofilldata,page } = useSelector((state) => state.userdetails);
  const [id, setId] = useState(0)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchdata());
    }
  }, [dispatch, status]);

  const handleSearchChange = (e) => {
    dispatch(search(e.target.value));
    dispatch(filterdata(user));
  };
  const handleFilterData = (e) => {

    dispatch(search(e.target.value));
    dispatch(filterdata(user));
  };
  console.log(filteredUsers)
  console.log(filteredUsers.length)
  console.log(status)
  const handlefilter = (e) => {
    console.log(e.target.value)
    dispatch(autofill(e.target.value))
  }
  return (
    <div>
      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Search by title or user ID"
        value={searchdata}
        onChange={handleSearchChange}
      />
      <label>User ID</label>
      <select name="id" onChange={handlefilter} defaultValue="">
      <option value="" disabled>Select User ID</option> 
        {
          user.map((id, i) => {
            return (<option key={id.id} value={id.title}>{id.id}</option>)
          })
        }
      </select>
      <label >Title</label>
      <input type="text" name='title' value={autofilldata} id="form6Example1" className="form-control" />



      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'success' && (
        <div>
          {filteredUsers.length === 0 ? (
            <p>No results found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>
                    ID
                    <select onChange={handleFilterData} defaultValue="">
                      <option value=""></option>
                      {user.slice().map((userItem) => (
                        <option key={userItem.id} value={userItem.id}>
                          {userItem.id}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.slice(page * 10 -10 , page * 10).map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
<div>
{
<div>
<span onClick={()=>dispatch(pagination(page-1))}>+</span>

{[...Array(user.length/10)].map((_,i)=>{
  return(
    <span key={i} className={page===i ? "pagination__selected":""}onClick={()=>dispatch(pagination(i+1))}>
      {i+1}
    </span>
  )
})}

<span onClick={()=>dispatch(pagination(page+1))}>-</span>

</div>
 
            }
       
</div>

    </div>
  );
}
