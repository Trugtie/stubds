import * as React from "react";
import Box from "@mui/material/Box";
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

import { useDispatch } from "react-redux";
import { addCustomer, editCustomer } from "../../../redux/customerSlice";
import { HTTP_STATUS } from '../../../redux/constants';

export default function CustomerModal({ cus, isOpen, isClose }) {
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
      handleForm()
    } else {
      handleFormAdd()
    }
  }, [isOpen])

  const handleForm = () => {
    var hotenkh = cus.hoten.split(' ');
    var lenght = hotenkh.length;
    setHo(hotenkh[0]);
    setTen(hotenkh[lenght - 1]);
    if (lenght > 2) {
      setTendem(hotenkh.slice(1, lenght - 1).join(' '));
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
    if (ho === "" || ten === "" || ngaysinh === null || sodienthoai === "" || gioitinh === "" || diachi === "" || diachitt === "" || email === "" || cmnd === "" || loaikh === "") {
      window.alert("Thông tin không được để trống")
      return
    } else {
      const hoten = `${ho} ${tendem} ${ten}`
      dispatch(addCustomer({ ngaysinh, sodienthoai, gioitinh, diachi, diachitt, email, cmnd, trangthai, hoten, loaikh, mota }))
    }
  };

  const handleEdit = () => {
    if (ho === "" || ten === "" || ngaysinh === null || sodienthoai === "" || gioitinh === "" || diachi === "" || diachitt === "" || email === "" || cmnd === "" || loaikh === "") {
      window.alert("Thông tin không được để trống")
      return
    } else {
      const hoten = `${ho} ${tendem} ${ten}`
      const khid = cus.khid
      if (window.confirm("Bạn có chắc muốn chỉnh sửa khách hàng ID: " + khid)) {
        dispatch(addCustomer({ khid, ngaysinh, sodienthoai, gioitinh, diachi, diachitt, email, cmnd, trangthai, hoten, loaikh, mota }))
      } else {
        return
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
        <h1 className="modal-title">KHÁCH HÀNG</h1>
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
                    defaultValue={ngaysinh}
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
                  defaultValue={sodienthoai}
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
                  label="Địa chỉ thường trú"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập địa chỉ thường trú..."
                  defaultValue={diachitt}
                  onChange={(e) => setDiachitt(e.target.value)}
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
              <Grid item xs={6}>
                <TextField
                  required
                  id="filled-basic"
                  label="CMND"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập cmnd..."
                  type="number"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 9);
                  }}
                  defaultValue={cmnd}
                  onChange={(e) => setCmnd(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Nhân viên phụ trách"
                  variant="filled"
                  fullWidth
                  defaultValue="Nguyễn Văn A"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="Mô tả"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập mô tả..."
                  multiline
                  minRows={6}
                  maxRows={6}
                  defaultValue={mota}
                  onChange={(e) => setMota(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "4rem" }}>
          {cus ?
                <ColorButton variant="contained" onClick={e => handleEdit(e)}>Cập nhật khách hàng</ColorButton>
                :
                <ColorButton variant="contained" onClick={e => handleSubmit(e)}>Thêm khách hàng</ColorButton>
              }
          </div>
        </div>
      </Box>
    </Modal>
  );
}
