import { Routes, Route,useLocation} from "react-router-dom";
import { useEffect,useState } from "react";
import "./MasterPage.css";
import Nav from "../../Components/Nav/Nav";
import Slider from "../../Components/Slider/Slider";
import $ from "jquery";
import StaffManagement from "../StaffManagement/StaffManagement";
import CustomerManagement from "../CustomerManagement/CustommerManagement";
import { CatchingPokemonSharp } from "@mui/icons-material";

function MasterPage() {
  const handleMenu = () => {
    $(".Nav-layout").toggleClass("hide");
    $(".Container-layout").toggleClass("long");
    $(".nav-container").toggleClass("slide-left");
    $(".nav-toggle").toggleClass("slice-btn");
  };

  let location = useLocation();
  const [title,setTitle]=useState('Quản lý nhân viên');

  useEffect(() => {
    // console.log(location.pathname);
    switch (location.pathname){
      case '/staffmanagement':
        setTitle('Quản lý nhân viên');
        break;
      case '/customermanagement':
        setTitle('Quản lý khách hàng');
        break;
      default:
    }

  }, [location]);

  return (
    <div className="MasterPage-container">
      <div className="Nav-layout">
        <Nav />
      </div>
      <div className="Container-layout">
        <div className="Slider-layout">
          <Slider handle={handleMenu} title={title} />
        </div>
        <div className="Content-layout">
          <Routes>
            <Route path="/" element={<StaffManagement />} />
            <Route path="/staffmanagement" element={<StaffManagement />} />
            <Route
              path="/customermanagement"
              element={<CustomerManagement />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MasterPage;
