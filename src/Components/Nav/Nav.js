import { useEffect } from "react";
import ClockCircle from "../ClockCircle/ClockCircle";
import MenuIcon from "@mui/icons-material/Menu";
import "./Nav.css";
import Logo from "./logo.svg";
import StarIcon from "./star.svg";
import CustomizedAccordion from "../Accordion/Accordion";

function Nav() {
  useEffect(() => {
    ClockCircle();
  }, []);

  return (
    <header>
      <div className="nav-container">
        <nav className="nav-flex">
          <div className="nav-header">
            <div className="nav-toggle">
              <MenuIcon
                sx={{ fontSize: 40, padding: ".5rem", transition: "all .3s" }}
                className="nav-button"
              />
            </div>
            <img className="nav-logo" src={Logo} alt="Logo" />
            <div id="clock"></div>
            <div className="user-info">
              <h3 className="user-role">Nhân viên quản lý</h3>
              <div className="user-divider">
                <img className='user-star' src={StarIcon}/>
              </div>
              <h4 className="user-name">Trugtie</h4>
            </div>
          </div>
          <div className="nav-content">
          <CustomizedAccordion/>
          </div>
          <div className="nav-footer">3</div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
