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
import { getDeposites } from "../../../redux/depositSlice";
import { getCustomers } from "../../../redux/customerSlice";
import { addAssignment, deleteAssignment } from "../../../redux/assignmentSlice";
import { HTTP_STATUS } from "../../../redux/constants";

export default function AssignmentModal({ contract, isOpen, isClose }) {
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
  const [giatri, setGiatri] = React.useState();
  const [ngaylap, setNgaylap] = React.useState(null);
  const [trangthai, setTrangthai] = React.useState(0);
  const [khid, setKhid] = React.useState();
  const [dcid, setDcid] = React.useState();

  React.useEffect(() => {
    if (contract) {
      handleForm(contract);
    } else {
      handleFormAdd();
    }
  }, [isOpen]);

  const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  const properties = JSON.parse(JSON.stringify(useSelector((state) => state.Deposit.list.filter((item) => item.trangthai === 0))));

  React.useEffect(() => {
    dispatch(getCustomers())
    dispatch(getDeposites())
  }, []);

  const handleForm = (e) => {
    setGiatri(e.giatri);
    setNgaylap(e.ngaylap);
    setTrangthai(e.trangthai);
    setKhid(e.khid);
  };

  const handleFormAdd = () => {
    setGiatri();
    setNgaylap(null);
    setTrangthai(0);
    setKhid();
    setDcid();
  };


  const handleSubmit = () => {
    if (
      giatri === "" ||
      ngaylap === null ||
      khid === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      var deposit = properties.filter((item) => item.dcid === dcid);
      var bdsid = deposit[0].bdsid
      dispatch(
        addAssignment({ giatri, ngaylap, bdsid, khid, trangthai, dcid })
      );
      isClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xoá hợp đồng ID: " + contract.cnid)) {
      dispatch(deleteAssignment(contract.cnid, contract.dcid))
    } else {
      return;
    }
    isClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-title">HỢP ĐỒNG CHUYỂN NHƯỢNG</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Thông tin hợp đồng chuyển nhượng</h2>
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
                    <MenuItem value={"0"}>Thành công</MenuItem>
                    <MenuItem value={"1"}>Thấi bại</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Mã bất động sản
                  </InputLabel>
                  <Select
                    disabled
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
              </Grid> */}
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                {contract ?
                  <TextField
                    disabled
                    id="filled-basic"
                    label="Mã đặt cọc"
                    variant="filled"
                    fullWidth
                    defaultValue={contract.dcid}
                  />
                  :
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Mã đặt cọc
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      defaultValue={dcid}
                      onChange={(e) => {
                        setDcid(e.target.value)
                      }}
                    >
                      {properties?.map(item => {
                        return (
                          <MenuItem value={item.dcid}>
                            {item.dcid}
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
