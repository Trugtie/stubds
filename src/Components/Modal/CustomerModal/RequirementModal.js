import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import RequirementTable from '../../Tables/CustomerTable/RequirementTable';

export default function RequirementModal({ iconBtn,open,close }) {
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


  const [type, setType] = React.useState("");

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-title">YÊU CẦU KHÁCH HÀNG</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin yêu cầu</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Mã khách"
                    variant="filled"
                    defaultValue="1"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Loại khách
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={type}
                      onChange={handleType}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"A"}>Loại A</MenuItem>
                      <MenuItem value={"B"}>Loại B</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Diện tích"
                    variant="filled"
                    placeholder="Nhập diện tích..."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Vị trí"
                    variant="filled"
                    placeholder="Nhập vị trí..."
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Giá trị từ"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập giá trị từ"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chiều dài từ"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập chiều dài từ"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chiều rộng từ"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập chiều rộng trừ"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Giá trị đến"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập giá trị đến"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chiều dài đến"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập chiều dài đến"
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chiều rộng đến"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập chiều rộng đến"
                    type="number"
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
                    minRows={4}
                    maxRows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                <RequirementTable/>
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: "1rem" }}>
              <ColorButton variant="contained">Thêm</ColorButton>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
