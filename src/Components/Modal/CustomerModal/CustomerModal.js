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

export default function CustomerModal({ iconBtn }) {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState(null);
  const [gender, setGender] = React.useState("");
  const [role, setRole] = React.useState("");
  const [userState, setUserState] = React.useState("");

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const handleUserState = (event) => {
    setUserState(event.target.value);
  };

  return (
    <div>
      <Button className="add-btn" onClick={handleOpen}>
        {iconBtn}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
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
                    id="filled-basic"
                    label="Họ"
                    variant="filled"
                    placeholder="Nhập họ..."
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Tên lót"
                    variant="filled"
                    placeholder="Nhập tên lót..."
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Tên"
                    variant="filled"
                    placeholder="Nhập tên..."
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Ngày sinh"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
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
                    label="Số điện thoại"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập SĐT"
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 10);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Giới
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={gender}
                      onChange={handleGender}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Nam"}>Nam</MenuItem>
                      <MenuItem value={"Nữ"}>Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Địa chỉ"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập địa chỉ..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Địa chỉ thường trú"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập địa chỉ thường trú..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập email..."
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="CMND"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập cmnd..."
                    type="number"
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
                  />
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: "4rem" }}>
              <ColorButton variant="contained">Thêm</ColorButton>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
