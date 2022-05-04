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
import { HTTP_STATUS } from "../../../redux/constants";
import { useDispatch, useSelector } from "react-redux";
import { addDeposit, deleteDeposit } from "../../../redux/depositSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";
import { getProperties } from "../../../redux/propertySlice";
import { getCustomers } from "../../../redux/customerSlice";
import { getConsignments } from "../../../redux/consignmentSlice";

export default function DepositModal({ contract, isOpen, isClose }) {
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
  const [giatri, setGiatri] = React.useState("");
  const [ngayhethan, setNgayhethan] = React.useState(null);
  const [ngaylap, setNgaylap] = React.useState(null);
  const [trangthai, setTrangthai] = React.useState(0);
  const [bdsid, setBdsid] = React.useState("");
  const [khid, setKhid] = React.useState("");

  React.useEffect(() => {
    if (contract) {
      handleForm(contract);
    } else {
      handleFormAdd();
    }
  }, [isOpen]);
  const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  const types = JSON.parse(JSON.stringify(useSelector((state) => state.PropertyType)));
  const propers = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
  const properties = JSON.parse(JSON.stringify(useSelector((state) => state.Consignment.list.filter((item) => item.trangthai === 0))));
  const property = JSON.parse(JSON.stringify(useSelector((state) => state.Consignment.list.filter((item) => item.trangthai === 1))));
  React.useEffect(() => {
    if (types.list.length === 0) {
      dispatch(getTypes())
    }
    if (customers.list.length === 0) {
      dispatch(getCustomers())
    }
    if (propers.list.length === 0) {
      dispatch(getProperties())
    }
    dispatch(getConsignments())
  }, []);

  const handleForm = (e) => {
    setGiatri(e.giatri);
    setNgayhethan(e.ngayhethan);
    setNgaylap(e.ngaylap);
    setTrangthai(e.trangthai);
    setBdsid(e.bdsid);
    setKhid(e.khid);
  };

  const handleFormAdd = () => {
    setGiatri("");
    setNgayhethan(null);
    setNgaylap(null);
    setTrangthai(0);
    setBdsid("");
    setKhid("");
  };

  const handleSubmit = () => {
    if (
      giatri === "" ||
      ngayhethan === null ||
      ngaylap === null ||
      bdsid === "" ||
      khid === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      var consignment = properties.filter((item) => item.bdsid === bdsid);
      var kgid = consignment[0].kgid;
      var tinhtrang = 0;
      dispatch(
        addDeposit({ giatri, ngayhethan, ngaylap, bdsid, khid, trangthai, tinhtrang, kgid })
      );
      
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xoá hợp đồng ID: " + contract.dcid)) {
      var consignment = property.filter((item) => item.bdsid === bdsid);
      var kgid = consignment[0].kgid;
      dispatch(deleteDeposit(contract.dcid, kgid))
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
        <h1 className="modal-title">HỢP ĐỒNG ĐẶT CỌC</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin hợp đồng đặt cọc</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="filled-basic"
                  label="Giá trị (VND)"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập giá trị..."
                  type="number"
                  defaultValue={giatri}
                  onChange={(e) => setGiatri(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker
                    required
                    label="Ngày lập"
                    value={ngaylap}
                    disablePast
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    onChange={(newValue) => {
                      setNgaylap(newValue);
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
                    label="Ngày hết hạn"
                    value={ngayhethan}
                    disablePast
                    openTo="year"
                    views={["year", "month", "day"]}
                    minDate={new Date().setMonth(new Date().getMonth() + 3)}
                    maxDate={new Date().setFullYear(new Date().getFullYear() + 5)}
                    onChange={(newValue) => {
                      setNgayhethan(newValue);
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
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={trangthai}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Đã đặt cọc</MenuItem>
                    <MenuItem value={"1"}>Không khả dụng</MenuItem>
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
                    defaultValue={khid}
                    onChange={(e) => setKhid(e.target.value)}
                  >
                    {customers.list?.map(item => {
                      return (
                        <MenuItem value={item.khid}>
                          {item.khid + " - " + item.hoten}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {contract ?
                  <TextField
                    disabled
                    id="filled-basic"
                    label="Mã bất động sản"
                    variant="filled"
                    fullWidth
                    defaultValue={bdsid}
                  />
                  :
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Mã bất động sản
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      defaultValue={bdsid}
                      onChange={(e) => {
                        setBdsid(e.target.value)
                      }}
                    >
                      {properties?.map(item => {
                        return (
                          <MenuItem value={item.bdsid}>
                            {item.bdsid}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                }
              </Grid>
            </Grid>
          </div>

          <div
            className="modal-form"
            style={{ marginTop: "28rem", padding: "0rem 12rem" }}
          >
            <Grid item xs={12}>
              {contract ? (
                <DeleteButton variant="contained" onClick={(e) => handleDelete(e)}>
                  Xoá hợp đồng
                </DeleteButton>
              ) : (
                <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                  Thêm hợp đồng
                </ColorButton>
              )}
            </Grid>
          </div>
        </div>
      </Box>
    </Modal>
  );
}