import React from 'react';

// import store from './store';
import FilterableUserTable from './components/FilterableUserTable';
import Parentcom from './components/ChildToParent/Parentcom';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Profile from './components/HOC/Profile';
import Login from './components/HOC/Login';
import Dashboard from './components/HOC/Dashboard';
import withAuth from './components/HOC/withAuth';
import Table from './components/POC/Table';
import ScrollPage from './infinity scroll/ScrollPage';
import ScrollPages from './infinity scroll/ScrollPages';
function App() {
  return (
    // <Provider store={store}>
    //   <div className="App">
    //     <h1>Filterable User Table</h1>
    //     <FilterableUserTable />
    //   </div>
    // </Provider>

  //   <>
  // <Router>
  //   <Routes>
  //     <Route path='/' element={<Login/>}/>
  //     <Route path='profile' element={<Profile/>}/>
  //     <Route path='/dashboard' Component={withAuth(Dashboard)} />
  //   </Routes>
  // </Router>
  //   </>
  <>
 <Table/>
 
  </>
  );
}

export default App;

