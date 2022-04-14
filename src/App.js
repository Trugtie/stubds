import './App.css';
import Login from './Pages/Login/Login';
import MasterPage from './Pages/MasterPage/MasterPage'
import { useSelector } from 'react-redux';
import React from 'react';

function App() {
return (
  <div className="App">
     {/* <Routes>
      <Route path="/" element={<MasterPage />} />
      <Route path="/login" element={<Login />} />
      </Routes> 
    <Login /> */}        
    {
      localStorage.getItem("user") ?
        <React.Fragment>
          <MasterPage />
        </React.Fragment>
        :
        <React.Fragment>
          <Login />
        </React.Fragment>
      }
  </div>
);
}

export default App;
