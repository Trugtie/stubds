import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClockCircle from "../ClockCircle/ClockCircle";
import "./Nav.css";
import Logo from "./logo.svg";
import StarIcon from "./star.svg";
import CustomizedAccordion from "../Accordion/Accordion";
import ExitIcon from "./exit.svg";
import Link from '@mui/material/Link';
import { logout, getStaff, getStaffs } from '../../redux/staffSlice';
import { useSelector, useDispatch } from "react-redux";
import { Buffer } from "buffer";
import StaffModal from "../Modal/StaffModal/Modal";
import { HTTP_STATUS } from "../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../Alert/alert";

function Nav() {
  useEffect(() => {
    ClockCircle();
    handleTitle();
  }, []);

  const staff = JSON.parse(JSON.stringify(useSelector((state) => state.Staff)));
  // window.Buffer = Buffer;
  // let acc = window.Buffer.from(localStorage.getItem("Token"), 'base64').toString('ascii').split(":");
  // var taikhoan = new FormData();
  // taikhoan.append('taikhoan', acc[0]);
  // taikhoan.append('matkhau', acc[1]);
  // useEffect(() => {
  //   if (window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') !== "ADMIN") {
  //     if (staff.list.length ) {
  //       // dispatch(getStaff(taikhoan))
  //     }
  //   }}, [])

  const handleName = () => {
    window.Buffer = Buffer;
    let acc = window.Buffer.from(localStorage.getItem("Token"), 'base64').toString('ascii').split(":");
    var taikhoan = new FormData();
    taikhoan.append('taikhoan', acc[0]);
    taikhoan.append('matkhau', acc[1]);
    if (window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') !== "ADMIN") {
      if (staff.list.length === 0) {
        dispatch(getStaff(taikhoan))
      }
      handleOpen(staff.list)
    } else {
      if (staff.list.length < 2) {
        dispatch(getStaffs())
      }
      handleOpen(staff.list.find(item => item.taikhoan === acc[0]))
    }
  }

  const [open, setOpen] = useState(false);
  const [staffEdit, setStaff] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (staff) => {
    setStaff(staff);
    setOpen(true);
  }

  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(staff.status);
  }, [staff.status])
  // TOAST

  const dispatch = useDispatch()
  const tennv = localStorage.getItem('user')
  const [quyen, setQuyen] = useState("")
  window.Buffer = Buffer;
  const onLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  const handleTitle = () => {
    window.Buffer.from(`ADMIN`).toString('base64') === localStorage.getItem("permission") ? setQuyen('Nhân viên quản lý') : setQuyen('Nhân viên Sales')
  }

  return (
    <header>
      <div className="nav-container">
        <nav className="nav-flex">
          <div className="nav-header">
            <img className="nav-logo" src={Logo} alt="Logo" />
            <div id="clock"></div>
            <div className="user-info">
              <h3 className="user-role">
                {quyen}
              </h3>
              <div className="user-divider">
                <img className="user-star" src={StarIcon} />
              </div>
              {/* <h4 className="user-name">
                {tennv}
              </h4> */}
              <Link
                color="inherit"
                component="button"
                underline="hover"
                variant="body2"
                onClick={() => {
                  handleName()
                }}
              >
                {tennv}
              </Link>
            </div>
          </div>
          <div className="nav-content">
            <CustomizedAccordion permission={window.Buffer.from(`ADMIN`).toString('base64')} />
          </div>
          <div className="nav-footer">
            <button className="exitBtn" onClick={onLogout}>
              <img src={ExitIcon} />
              {staff.status === HTTP_STATUS.PENDING ?
                  <Loading
                    loading={true}
                    background="rgba(0,0,0,0.2)"
                    loaderColor="#CF9269"
                  />
                  : ""}
                <AlertToast value={toast} open={openToast} close={handleCloseToast} />
            </button>
          </div>
        </nav>
      </div>
      <StaffModal staff={staffEdit} isOpen={open} isClose={handleClose} />
    </header>
  );
}

export default Nav;
