import * as React from "react";
import Box from "@mui/material/Box";
import frLocale from "date-fns/locale/fr";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import "./Modal.css";

import { useDispatch } from "react-redux";
import { addStaff, editStaff } from "../../../redux/staffSlice";
import {
  HTTP_STATUS,
  validEmail,
  validPassword,
  validUsername,
} from "../../../redux/constants";

export default function BasicModal({ staff, isOpen, isClose }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "var(--button-color)",
    "&:hover": {
      backgroundColor: "#80583b",
    },
  }));

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 1181,
    height: "100%",
    maxHeight: 895,
    bgcolor: "#FBF6F3",
    color: "black",
    borderRadius: "20px 20px 10px 10px;",
    boxShadow: 24,
  };

  const dispatch = useDispatch();
  const [ho, setHo] = React.useState("");
  const [tendem, setTendem] = React.useState("");
  const [ten, setTen] = React.useState("");
  const [ngaysinh, setNgaysinh] = React.useState(null);
  const [sdt, setSdt] = React.useState("");
  const [gioitinh, setGioitinh] = React.useState("0");
  const [diachi, setDiachi] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [quyen, setQuyen] = React.useState("1");
  const [doanhthu, setDoanhthu] = React.useState("0");
  const [taikhoan, setTaikhoan] = React.useState("");
  const [matkhau, setMatkhau] = React.useState("");
  const [matkhau2, setMatkhau2] = React.useState("");
  const [trangthai, setTrangthai] = React.useState("0");

  React.useEffect(() => {
    if (staff) {
      handleForm();
    } else {
      handleFormAdd();
    }
  }, [isOpen]);

  const handleForm = () => {
    var hoten = staff.tennv.split(" ");
    var lenght = hoten.length;
    setHo(hoten[0]);
    setTen(hoten[lenght - 1]);
    if (lenght > 2) {
      setTendem(hoten.slice(1, lenght - 1).join(" "));
    }
    setNgaysinh(staff.ngaysinh);
    setSdt(staff.sdt);
    setGioitinh(staff.gioitinh);
    setDiachi(staff.diachi);
    setEmail(staff.email);
    setQuyen(staff.quyen);
    setDoanhthu(staff.doanhthu);
    setTaikhoan(staff.taikhoan);
    setTrangthai(staff.trangthai);
  };

  const handleFormAdd = () => {
    setHo("");
    setTen("");
    setTendem("");
    setNgaysinh(null);
    setSdt("");
    setGioitinh("0");
    setDiachi("");
    setEmail("");
    setQuyen("1");
    setDoanhthu("0");
    setTaikhoan("");
    setTrangthai("0");
  };

  const handleSubmit = () => {
    if (
      taikhoan === "" ||
      matkhau === "" ||
      matkhau2 === "" ||
      ho === "" ||
      ten === "" ||
      ngaysinh === null ||
      sdt === "" ||
      gioitinh === "" ||
      diachi === "" ||
      email === "" ||
      quyen === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else if (matkhau !== matkhau2) {
      window.alert("Mật khẩu xác nhận không trùng khớp");
    } else {
<<<<<<< HEAD
      const tennv = `${ho} ${tendem} ${ten}`
      dispatch(addStaff({ taikhoan, matkhau, ngaysinh, sdt, gioitinh, diachi, email, quyen, doanhthu, trangthai, tennv }));
=======
      const tennv = `${ho} ${tendem} ${ten}`;
      dispatch(
        addStaff({
          taikhoan,
          matkhau,
          ngaysinh,
          sdt,
          gioitinh,
          diachi,
          email,
          quyen,
          doanhthu,
          trangthai,
          tennv,
        })
      );
>>>>>>> b0c71318b851c7e1227e7f081cb0023cb36e320c
      isClose();
    }
  };

  const handleEdit = () => {
    if (
      taikhoan === "" ||
      ho === "" ||
      ten === "" ||
      ngaysinh === null ||
      sdt === "" ||
      gioitinh === "" ||
      diachi === "" ||
      email === "" ||
      quyen === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else if (matkhau !== matkhau2) {
      window.alert("Mật khẩu xác nhận không trùng khớp");
    } else {
      const tennv = `${ho} ${tendem} ${ten}`;
      const nvid = staff.nvid;
      if (window.confirm("Bạn có chắc muốn chỉnh sửa nhân viên ID: " + nvid)) {
<<<<<<< HEAD
        dispatch(editStaff({ nvid, taikhoan, matkhau, ngaysinh, sdt, gioitinh, diachi, email, quyen, doanhthu, trangthai, tennv }));
=======
        dispatch(
          editStaff({
            nvid,
            taikhoan,
            matkhau,
            ngaysinh,
            sdt,
            gioitinh,
            diachi,
            email,
            quyen,
            doanhthu,
            trangthai,
            tennv,
          })
        );
>>>>>>> b0c71318b851c7e1227e7f081cb0023cb36e320c
        isClose();
      } else {
        return;
      }
    }
  };
<<<<<<< HEAD
  return (    
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-title">NHÂN VIÊN</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin cá nhân</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Họ"
                    variant="filled"
                    placeholder="Nhập họ..."
                    defaultValue={ho}
                    onChange={(e) => setHo(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Tên đệm"
                    variant="filled"
                    placeholder="Nhập tên đệm..."
                    defaultValue={tendem}
                    onChange={(e) => setTendem(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Tên"
                    variant="filled"
                    placeholder="Nhập tên..."
                    defaultValue={ten}
                    onChange={(e) => setTen(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      required
                      label="Ngày sinh"
                      value={ngaysinh}
                      onChange={(newValue) => {
                        setNgaysinh(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <TextField
=======
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">NHÂN VIÊN</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin cá nhân</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  required
                  id="filled-basic"
                  label="Họ"
                  variant="filled"
                  placeholder="Nhập họ..."
                  defaultValue={ho}
                  onChange={(e) => setHo(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Tên đệm"
                  variant="filled"
                  placeholder="Nhập tên đệm..."
                  defaultValue={tendem}
                  onChange={(e) => setTendem(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  id="filled-basic"
                  label="Tên"
                  variant="filled"
                  placeholder="Nhập tên..."
                  defaultValue={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
>>>>>>> b0c71318b851c7e1227e7f081cb0023cb36e320c
                    required
                    label="Ngày sinh"
                    value={ngaysinh}
                    onChange={(newValue) => {
                      setNgaysinh(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  id="filled-basic"
                  label="Số điện thoại"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập SĐT"
                  type="number"
                  defaultValue={sdt}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  onChange={(e) => setSdt(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Giới tính
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={gioitinh}
                    onChange={(e) => setGioitinh(e.target.value)}
                  >
                    <MenuItem value={"0"}>Nam</MenuItem>
                    <MenuItem value={"1"}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="filled-basic"
                  label="Địa chỉ"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập địa chỉ..."
                  defaultValue={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập email..."
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Thông tin làm việc</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Quyền hạn
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={quyen}
                    onChange={(e) => setQuyen(e.target.value)}
                  >
                    <MenuItem value={"0"}>Quản lý</MenuItem>
                    <MenuItem value={"1"}>Nhân viên sale</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Doanh thu"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập doanh thu..."
                  type="number"
                  defaultValue={doanhthu}
                  onChange={(e) => setDoanhthu(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Thông tin tài khoản</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {staff ? (
                  <React.Fragment>
                    <TextField
                      disabled
                      id="filled-basic"
                      label="Tên tài khoản"
                      variant="filled"
                      fullWidth
                      placeholder="Nhập tên tài khoản..."
                      defaultValue={taikhoan}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <TextField
                      required
                      id="filled-basic"
                      label="Tên tài khoản"
                      variant="filled"
                      fullWidth
                      placeholder="Nhập tên tài khoản..."
                      onChange={(e) => setTaikhoan(e.target.value)}
                    />
                  </React.Fragment>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Trạng thái
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={trangthai}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Hoạt động</MenuItem>
                    <MenuItem value={"1"}>Bị khóa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-basic"
                  label="Mật khẩu"
                  variant="filled"
                  type="password"
                  fullWidth
                  placeholder="Nhập mật khẩu..."
                  onChange={(e) => setMatkhau(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-basic"
                  label="Xác nhận mật khẩu"
                  variant="filled"
                  type="password"
                  fullWidth
                  placeholder="Nhập lại mật khẩu..."
                  onChange={(e) => setMatkhau2(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "3rem" }}>
            {staff ? (
              <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                Cập nhật nhân viên
              </ColorButton>
            ) : (
              <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                Thêm nhân viên
              </ColorButton>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
