import * as React from "react";
import Box from "@mui/material/Box";
import frLocale from "date-fns/locale/vi";
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
import { addCustomer, editCustomer, deleteCustomer } from "../../../redux/customerSlice";
import { getStaffs, getStaff } from "../../../redux/staffSlice";

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

  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Staff)));
  const dispatch = useDispatch();
  let acc = window.Buffer.from(localStorage.getItem("Token"), 'base64').toString('ascii').split(":");
  var taikhoan = new FormData();
  taikhoan.append('taikhoan', acc[0]);
  taikhoan.append('matkhau', acc[1]);
  React.useEffect(() => {
    if (window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') === "ADMIN") {
      if (list.length < 2) {
        dispatch(getStaffs())
      }
    } else {
      if (list.length === 0) {
        dispatch(getStaff(taikhoan))
      }
    }
  }, [])
  const [ho, setHo] = React.useState("");
  const [tendem, setTendem] = React.useState("");
  const [ten, setTen] = React.useState("");
  const [nvid, setNvid] = React.useState("");
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
    setNvid(cus.nvid);
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
    setNvid("");
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
      loaikh === "" ||
      nvid === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      const hoten = `${ho} ${tendem} ${ten}`
      dispatch(addCustomer({ ngaysinh, sodienthoai, gioitinh, diachi, diachitt, email, cmnd, trangthai, hoten, loaikh, mota, nvid }));
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
      loaikh === "" ||
      nvid === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      const hoten = `${ho} ${tendem} ${ten}`;
      const khid = cus.khid;
      if (window.confirm("B???n c?? ch???c mu???n ch???nh s???a kh??ch h??ng ID: " + khid)) {
        dispatch(editCustomer({ khid, ngaysinh, sodienthoai, gioitinh, diachi, diachitt, email, cmnd, trangthai, hoten, loaikh, mota, nvid }));

      } else {
        return;
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm("B???n c?? ch???c mu???n xo?? kh??ch h??ng " + cus.hoten)) {
      dispatch(deleteCustomer(cus.khid))
    } else {
      return;
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
        <h1 className="modal-title">KH??CH H??NG</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Th??ng tin c?? nh??n</h2>
          <hr className="modal-divider" />
          <div className="modal-form">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  
                  id="filled-basic"
                  label="H???"
                  variant="filled"
                  placeholder="Nh???p h???..."
                  defaultValue={ho}
                  onChange={(e) => setHo(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="T??n ?????m"
                  variant="filled"
                  placeholder="Nh???p t??n ?????m..."
                  defaultValue={tendem}
                  onChange={(e) => setTendem(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  
                  id="filled-basic"
                  label="T??n"
                  variant="filled"
                  placeholder="Nh???p t??n..."
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
                    
                    label="Ng??y sinh"
                    value={ngaysinh}
                    openTo="year"
                    views={["year", "month", "day"]}
                    minDate={new Date().setFullYear(new Date().getFullYear() - 60)}
                    maxDate={new Date().setFullYear(new Date().getFullYear() - 18)}
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
                  
                  id="filled-basic"
                  label="S??? ??i???n tho???i"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p S??T"
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
                    Gi???i t??nh
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={gioitinh}
                    onChange={(e) => setGioitinh(e.target.value)}
                  >
                    <MenuItem value={"0"}>Nam</MenuItem>
                    <MenuItem value={"1"}>N???</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  id="filled-basic"
                  label="?????a ch???"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p ?????a ch???..."
                  defaultValue={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  id="filled-basic"
                  label="?????a ch??? th?????ng tr??"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p ?????a ch??? th?????ng tr??..."
                  defaultValue={diachitt}
                  onChange={(e) => setDiachitt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p email..."
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  
                  id="filled-basic"
                  label="CMND"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p cmnd..."
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
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Nh??n vi??n ph??? tr??ch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={nvid}
                    onChange={(e) => setNvid(e.target.value)}
                  >
                    {
                      window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') === "ADMIN" ?
                        list?.map(item => {
                          return (
                            <MenuItem value={item.nvid}>
                              {item.tennv}
                            </MenuItem>
                          );
                        })
                        :
                        <MenuItem value={list.nvid}>
                          {list.tennv}
                        </MenuItem>
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Lo???i kh??ch h??ng
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={loaikh}
                    onChange={(e) => setLoai(e.target.value)}
                  >
                    <MenuItem value={"0"}>C?? nh??n</MenuItem>
                    <MenuItem value={"1"}>C??ng ty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Tr???ng th??i
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={trangthai}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Ho???t ?????ng</MenuItem>
                    <MenuItem value={"1"}>B??? kho??</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic"
                  label="M?? t???"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p m?? t???..."
                  multiline
                  minRows={6}
                  maxRows={6}
                  defaultValue={mota}
                  onChange={(e) => setMota(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            {cus ? (
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                    C???p nh???t kh??ch h??ng
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <DeleteButton variant="contained" onClick={(e) => handleDelete(e)}>
                    Xo?? kh??ch h??ng
                  </DeleteButton>
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                  Th??m kh??ch h??ng
                </ColorButton>
              </Grid>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
