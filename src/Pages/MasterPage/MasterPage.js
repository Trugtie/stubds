import { Routes, Route } from "react-router-dom";
import "./MasterPage.css";
import Nav from "../../Components/Nav/Nav";
import Slider from "../../Components/Slider/Slider";
import $ from "jquery";
import StaffManagement from "../StaffManagement/StaffManagement";
import CustomerManagement from "../CustomerManagement/CustommerManagement"

function MasterPage() {
  const handleMenu = () => {
    $(".Nav-layout").toggleClass("hide");
    $(".Container-layout").toggleClass("long");
    $(".nav-container").toggleClass("slide-left");
    $(".nav-toggle").toggleClass("slice-btn");
  };

  return (
    <div className="MasterPage-container">
      <div className="Nav-layout">
        <Nav />
      </div>
      <div className="Container-layout">
        <div className="Slider-layout">
          <Slider handle={handleMenu} />
        </div>
        <div className="Content-layout">
          <Routes>          
            <Route path="/" element={<StaffManagement />} />
            <Route path="/staffmanagement" element={<StaffManagement />} />
            <Route path="/customermanagement" element={<CustomerManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MasterPage;
