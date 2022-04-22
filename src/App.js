import './App.css';
import Login from './Pages/Login/Login';
import MasterPage from './Pages/MasterPage/MasterPage'
import React from 'react';

function App() {
return (
  <div className="App">
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
