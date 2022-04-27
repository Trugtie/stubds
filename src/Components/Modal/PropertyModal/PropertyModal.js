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
import { useDispatch, useSelector } from "react-redux";
import { addProperty, editProperty } from "../../../redux/propertySlice";
import { getCustomers } from "../../../redux/customerSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";
import ConsignmentModal from '../../Modal/ConsignmentModal';
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";

export default function PropertyModal({ property, isOpen, isClose }) {
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

  const types = JSON.parse(JSON.stringify(useSelector((state) => state.PropertyType)));
  const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  const propAdd = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTypes())
    dispatch(getCustomers())
  }, [])
  React.useEffect(() => {
    if(propAdd.status === HTTP_STATUS.INSERTED){
      setOpen(true);
    }
  }, [propAdd.status])

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [chieudai, setChieudai] = React.useState("");
  const [chieurong, setChieurong] = React.useState("");
  const [dientich, setDientich] = React.useState("");
  const [dongia, setDongia] = React.useState("0");
  const [hinhanh, setHinhanh] = React.useState(null);
  const [huehong, setHuehong] = React.useState("0");
  const [masoqsdd, setMasoqsdd] = React.useState("");
  const [mota, setMota] = React.useState("");
  const [phuong, setPhuong] = React.useState("");
  const [quan, setQuan] = React.useState("");
  const [sonha, setSonha] = React.useState("");
  const [tenduong, setTenduong] = React.useState("");
  const [thanhpho, setThanhpho] = React.useState("");
  const [khid, setKhid] = React.useState("");
  const [tinhtrang, setTinhtrang] = React.useState("0");
  const [loaibdid, setLoaibdid] = React.useState("");

  React.useEffect(() => {
    if (property) {
      handleFormEdit(property);
    } else {
      handleFormAdd();
    }
  }, [isOpen]);
  const handleFormEdit = (prop) => {
    setChieudai(prop.chieudai);
    setChieurong(prop.chieurong);
    setDientich(prop.dientich);
    setDongia(prop.dongia);
    setHinhanh(prop.hinhanh);
    setHuehong(prop.huehong);
    setMasoqsdd(prop.masoqsdd);
    setMota(prop.mota);
    setPhuong(prop.phuong)
    setQuan(prop.quan);
    setSonha(prop.sonha);
    setTenduong(prop.tenduong);
    setThanhpho(prop.thanhpho);
    setKhid(prop.khid);
    setTinhtrang(prop.tinhtrang);
    setLoaibdid(prop.loaibdid);
  };

  const handleFormAdd = () => {
    setChieudai("");
    setChieurong("");
    setDientich("");
    setDongia("0");
    setHinhanh(null);
    setHuehong("0");
    setMasoqsdd("");
    setMota("");
    setPhuong("");
    setQuan("");
    setSonha("");
    setTenduong("");
    setThanhpho("");
    setKhid("");
    setTinhtrang("0");
    setLoaibdid("");
  };

  const handleSubmit = () => {
    if (
      chieudai === "" ||
      chieurong === "" ||
      dientich === "" ||
      dongia === "" ||
      huehong === "" ||
      masoqsdd === "" ||
      phuong === "" ||
      quan === "" ||
      sonha === "" ||
      tenduong === "" ||
      thanhpho === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      dispatch(addProperty({ chieudai, chieurong, dientich, dongia, hinhanh, huehong, masoqsdd, mota, phuong, quan, sonha, thanhpho, tenduong, khid, tinhtrang, loaibdid }));
      isClose();
    }
  };
  
  const handleEdit = () => {
    if (
      chieudai === "" ||
      chieurong === "" ||
      dientich === "" ||
      dongia === "" ||
      huehong === "" ||
      masoqsdd === "" ||
      phuong === "" ||
      quan === "" ||
      sonha === "" ||
      tenduong === "" ||
      thanhpho === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      const bdsid = property.bdsid;
      if (window.confirm("Bạn có chắc muốn chỉnh sửa bất động sản ID: " + bdsid)) {
        dispatch(editProperty({ bdsid,chieudai, chieurong, dientich, dongia, hinhanh, huehong, masoqsdd, mota, phuong, quan, sonha, thanhpho, tenduong, khid, tinhtrang, loaibdid }));
        isClose();
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-title">BẤT ĐỘNG SẢN</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Thông tin bất động sản</h2>
            <hr className="modal-divider" />
            <div className="modal-form" style={{ marginTop: '2rem' }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Chiều dài (m)"
                    variant="filled"
                    placeholder="Nhập chiều dài..."
                    defaultValue={chieudai}
                    onChange={(e) => setChieudai(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chiều rộng (m)"
                    variant="filled"
                    placeholder="Nhập chiều rộng..."
                    defaultValue={chieurong}
                    onChange={(e) => setChieurong(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Diện tích (m2)"
                    variant="filled"
                    placeholder="Nhập diện tích..."
                    defaultValue={dientich}
                    onChange={(e) => setDientich(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="filled-basic"
                    label="Đơn giá (VND)"
                    variant="filled"
                    placeholder="Nhập đơn giá..."
                    fullWidth
                    defaultValue={dongia}
                    onChange={(e) => setDongia(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Mã QSDĐ"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập mã QSDĐ..."
                    type="number"
                    defaultValue={masoqsdd}
                    // onInput={(e) => {
                    //   e.target.value = Math.max(0, parseInt(e.target.value))
                    //     .toString()
                    //     .slice(0, 10);
                    // }}
                    onChange={(e) => setMasoqsdd(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Huê hồng (%)"
                    variant="filled"
                    fullWidth
                    placeholder="%"
                    type="number"
                    defaultValue={huehong}
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 2);
                    }}
                    onChange={(e) => setHuehong(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Số nhà"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập số nhà..."
                    defaultValue={sonha}
                    onChange={(e) => setSonha(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Đường"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập tên đường..."
                    defaultValue={tenduong}
                    onChange={(e) => setTenduong(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Thành phố/Tỉnh"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập thành phố/tỉnh..."
                    defaultValue={thanhpho}
                    onChange={(e) => setThanhpho(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Quận/Huyện"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập quận/huyện..."
                    defaultValue={quan}
                    onChange={(e) => setQuan(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="filled-basic"
                    label="Phường/xã"
                    variant="filled"
                    fullWidth
                    placeholder="Nhập phường/xã..."
                    defaultValue={phuong}
                    onChange={(e) => setPhuong(e.target.value)}
                  />
                </Grid>

                {/* <Grid item xs={4}>
              <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Thành phố/Tỉnh
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
                   Quận/Huyện
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
                    Phường/Xã
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
              </Grid> */}

                <Grid item xs={4}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Tình trạng
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      defaultValue={tinhtrang}
                      onChange={(e) => setTinhtrang(e.target.value)}
                    >
                      <MenuItem value={"0"}>Đang ký gửi</MenuItem>
                      <MenuItem value={"1"}>Hết hạn</MenuItem>
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
                            {item.hoten}
                          </MenuItem>
                        );
                      })}
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
                      defaultValue={loaibdid}
                      onChange={(e) => setLoaibdid(e.target.value)}
                    >
                      {types.list?.map(item => {
                        return (
                          <MenuItem value={item.loaiid}>
                            {item.tenloai}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
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
            <div className="modal-form" style={{ marginTop: "8rem" }}>
              {property ? (
                <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                  Cập nhật bất động sản
                </ColorButton>
              ) : (
                <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                  Thêm bất động sản
                </ColorButton>
              )}
            </div>
          </div>
        </Box>

      </Modal>
      <ConsignmentModal  isOpen={open} isClose={handleClose} contract={null} />
      {propAdd.status === HTTP_STATUS.PENDING ?
                  <Loading
                    loading={true}
                    background="rgba(0,0,0,0.2)"
                    loaderColor="#CF9269"
                  />
                  : ""}
    </div>
  );
}
