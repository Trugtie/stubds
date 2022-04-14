import { useEffect } from "react";
import ClockCircle from "../ClockCircle/ClockCircle";
import "./Nav.css";
import Logo from "./logo.svg";
import StarIcon from "./star.svg";
import CustomizedAccordion from "../Accordion/Accordion";
import ExitIcon from "./exit.svg";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';

function Nav() {
  useEffect(() => {
    ClockCircle();
  }, []);

  const dispatch = useDispatch()  
  const tennv = localStorage.getItem('user')  
  const onLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <header>
      <div className="nav-container">
        <nav className="nav-flex">
          <div className="nav-header">
            <img className="nav-logo" src={Logo} alt="Logo" />
            <div id="clock"></div>
            <div className="user-info">
              <h3 className="user-role">Nhân viên quản lý</h3>
              <div className="user-divider">
                <img className="user-star" src={StarIcon} />
              </div>
              <h4 className="user-name">
                {tennv}
                </h4>
            </div>
          </div>
          <div className="nav-content">
            <CustomizedAccordion />
          </div>
          <div className="nav-footer">
            <button className="exitBtn" onClick={onLogout}>
              <img src={ExitIcon} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
