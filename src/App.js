import './App.css';
import Login from './Pages/Login/Login';
import MasterPage from './Pages/MasterPage/MasterPage'
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  // const userInfo = useSelector(state=>state.User.userInfo)
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<MasterPage />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
