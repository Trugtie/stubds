import {Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import MasterPage from './Pages/MasterPage/MasterPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/masterpage' element={<MasterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
