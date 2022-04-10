import "./MasterPage.css";
import Nav from "../../Components/Nav/Nav";
import Slider from "../../Components/Slider/Slider"

function MasterPage() {
  return (
    <div className="MasterPage-container">
      <div className="Nav-layout">
        <Nav />
      </div>
      <div className="Container-layout">
        <div className="Slider-layout">
        <Slider/>
        </div>
        <div className="Content-layout">
          
        </div>
      </div>
    </div>
  );
}

export default MasterPage;