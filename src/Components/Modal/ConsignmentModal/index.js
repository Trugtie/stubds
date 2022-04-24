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

import { useDispatch, useSelector } from "react-redux";
import { addCustomer, editCustomer } from "../../../redux/customerSlice";
import { HTTP_STATUS } from "../../../redux/constants";

export default function ConsignmentModal({ cus, isOpen, isClose }) {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "var(--button-color)",
    "&:hover": {
      backgroundColor: "#80583b",
    },
  }));

  const DeleteButton = styled(Button)(({ theme }) => ({
    color: "white",
    fontWeight: "bolder",
    width: "100%",
    backgroundColor: "rgb(181, 32, 23)",
    "&:hover": {
      backgroundColor: "red",
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
  const [sodienthoai, setSdt] = React.useState("");
  const [cmnd, setCmnd] = React.useState("");
  const [gioitinh, setGioitinh] = React.useState("0");
  const [diachi, setDiachi] = React.useState("");
  const [diachitt, setDiachitt] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mota, setMota] = React.useState("");
  const [loaikh, setLoai] = React.useState("0");
  const [trangthai, setTrangthai] = React.useState("0");

  React.useEffect(() => {
    if (cus) {
      handleForm();
    } else {
      handleFormAdd();
    }
  }, [isOpen]);
  const handleForm = () => {
    var hotenkh = cus.hoten.split(" ");
    var lenght = hotenkh.length;
    setHo(hotenkh[0]);
    setTen(hotenkh[lenght - 1]);
    if (lenght > 2) {
      setTendem(hotenkh.slice(1, lenght - 1).join(" "));
    }
    setNgaysinh(cus.ngaysinh);
    setSdt(cus.sodienthoai);
    setGioitinh(cus.gioitinh);
    setDiachi(cus.diachi);
    setEmail(cus.email);
    setTrangthai(cus.trangthai);
    setDiachitt(cus.diachitt);
    setMota(cus.mota);
    setLoai(cus.loaikh);
    setCmnd(cus.cmnd);
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
    setTrangthai("0");
    setDiachitt("");
    setMota("");
    setLoai("0");
    setCmnd("");
  };

  const handleSubmit = () => {
    if (
      ho === "" ||
      ten === "" ||
      ngaysinh === null ||
      sodienthoai === "" ||
      gioitinh === "" ||
      diachi === "" ||
      diachitt === "" ||
      email === "" ||
      cmnd === "" ||
      loaikh === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      const hoten = `${ho} ${tendem} ${ten}`;
      dispatch(
        addCustomer({
          ngaysinh,
          sodienthoai,
          gioitinh,
          diachi,
          diachitt,
          email,
          cmnd,
          trangthai,
          hoten,
          loaikh,
          mota,
        })
      );
      isClose();
    }
  };

  const handleEdit = () => {
    if (
      ho === "" ||
      ten === "" ||
      ngaysinh === null ||
      sodienthoai === "" ||
      gioitinh === "" ||
      diachi === "" ||
      diachitt === "" ||
      email === "" ||
      cmnd === "" ||
      loaikh === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      const hoten = `${ho} ${tendem} ${ten}`;
      const khid = cus.khid;
      if (window.confirm("Bạn có chắc muốn chỉnh sửa khách hàng ID: " + khid)) {
        dispatch(
          editCustomer({
            khid,
            ngaysinh,
            sodienthoai,
            gioitinh,
            diachi,
            diachitt,
            email,
            cmnd,
            trangthai,
            hoten,
            loaikh,
            mota,
          })
        );
        isClose();
      } else {
        return;
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">HỢP ĐỒNG KÝ GỬI</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin hợp đồng ký gửi</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Chi phí dịch vụ (VND)"
                  variant="filled"
                  placeholder="Nhập chi phí dịch vụ..."
                  fullWidth
                  defaultValue={tendem}
                  onChange={(e) => setTendem(e.target.value)}
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-basic"
                  label="Giá trị (VND)"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập giá trị..."
                  type="number"
                  defaultValue={sodienthoai}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                  onChange={(e) => setSdt(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    required
                    label="Ngày bắt đầu"
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
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    required
                    label="Ngày kết thúc"
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
                    defaultValue={loaikh}
                    onChange={(e) => setLoai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Cá nhân</MenuItem>
                    <MenuItem value={"1"}>Công ty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Khách hàng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={loaikh}
                    onChange={(e) => setLoai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Cá nhân</MenuItem>
                    <MenuItem value={"1"}>Công ty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Loại BĐS
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={loaikh}
                    onChange={(e) => setLoai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Cá nhân</MenuItem>
                    <MenuItem value={"1"}>Công ty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div
            className="modal-form"
            style={{ marginTop: "28rem", padding: "0rem 12rem" }}
          >
            <Grid container spacing={2}>
            <Grid item xs={8}>
              {cus ? (
                <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                  Cập nhật khách hàng
                </ColorButton>
              ) : (
                <ColorButton
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                >
                  Thêm khách hàng
                </ColorButton>
              )}
              </Grid>
              <Grid item xs={4}>
              {cus ? (
                <DeleteButton variant="contained" onClick={(e) => handleEdit(e)}>
                  XÓA
                </DeleteButton>
              ) : (
                <DeleteButton
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                >
                  XÓA
                </DeleteButton>
              )}
              </Grid>
            </Grid>
          </div>
          {/* <div className="modal-form" style={{ marginTop: "8rem" }}>
            {cus ? (
              <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                Cập nhật khách hàng
              </ColorButton>
            ) : (
              <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                Thêm khách hàng
              </ColorButton>
            )}
          </div> */}
        </div>
      </Box>
    </Modal>
  );
}
