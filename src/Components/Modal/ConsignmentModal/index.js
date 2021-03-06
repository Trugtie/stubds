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
import { addConsignment, deleteConsignment } from "../../../redux/consignmentSlice";
import { deleteProperty, getProperties } from "../../../redux/propertySlice";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../../redux/customerSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";


export default function ConsignmentModal({ isOpen, isClose, contract }) {
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

  const types = JSON.parse(JSON.stringify(useSelector((state) => state.PropertyType)));
  const properties = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
  const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));


  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!types.status) {
      dispatch(getTypes())
    }
    if (!customers.status) {
      dispatch(getCustomers())
    }
    if (!properties.status) {
      dispatch(getProperties())
    }
  }, [])

  React.useEffect(() => {
    if (contract) {
      handleForm(contract);
    } else {
      handleFormAdd();
    }
  }, [isOpen]);

  const [chiphidv, setChiphi] = React.useState(0);
  const [giatri, setGiatri] = React.useState(0);
  const [ngaybd, setNgaybd] = React.useState(null);
  const [ngayketthuc, setNgaykt] = React.useState(null);
  const [trangthai, setTrangthai] = React.useState("0");
  const [khid, setKhachhang] = React.useState("");
  const [chieudai, setChieudai] = React.useState(0);
  const [chieurong, setChieurong] = React.useState(0);
  const [dientich, setDientich] = React.useState(chieudai * chieurong);
  const [dongia, setDongia] = React.useState(0);
  const [hinhanh, setHinhanh] = React.useState(null);
  const [huehong, setHuehong] = React.useState(0);
  const [masoqsdd, setMasoqsdd] = React.useState("");
  const [mota, setMota] = React.useState("");
  const [phuong, setPhuong] = React.useState("");
  const [quan, setQuan] = React.useState("");
  const [sonha, setSonha] = React.useState("");
  const [tenduong, setTenduong] = React.useState("");
  const [thanhpho, setThanhpho] = React.useState("");
  const [tinhtrang, setTinhtrang] = React.useState("0");
  const [loaibdid, setLoaibdid] = React.useState("");

  const handleForm = (e) => {
    var prop = properties.list.find(item => item.bdsid === e.bdsid)
    setChiphi(e.chiphidv);
    setGiatri(e.giatri);
    setNgaybd(e.ngaybd);
    setNgaykt(e.ngayketthuc);
    setTrangthai(e.trangthai);
    setKhachhang(e.khid);
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
    setTinhtrang(prop.tinhtrang);
    setLoaibdid(prop.loaibdid);
  };

  const handleFormAdd = () => {
    setChiphi(0);
    setGiatri(0);
    setNgaybd(null);
    setNgaykt(null);
    setTrangthai(0);
    setKhachhang(0);
    setChieudai(0);
    setChieurong(0);
    setDientich(0);
    setDongia(0);
    setHinhanh(null);
    setHuehong(0);
    setMasoqsdd("");
    setMota("");
    setPhuong("");
    setQuan("");
    setSonha("");
    setTenduong("");
    setThanhpho("");
    setTinhtrang(0);
    setLoaibdid(1);
  };

  const handleSubmit = () => {
    if (
      chiphidv === "" ||
      giatri === "" ||
      ngaybd === null ||
      ngayketthuc === null ||
      chieudai === "" ||
      chieurong === "" ||
      chieudai === 0 ||
      chieurong === 0 ||
      dientich === "" ||
      dongia === "" ||
      huehong === "" ||
      masoqsdd === "" ||
      phuong === "" ||
      quan === "" ||
      sonha === "" ||
      tenduong === "" ||
      thanhpho === "" ||
      khid === "" ||
      loaibdid === ""
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      let formBatdongsan = {
        chieudai: chieudai,
        chieurong: chieurong,
        dientich: dientich,
        dongia: dongia,
        hinhanh: hinhanh,
        huehong: huehong,
        masoqsdd: masoqsdd,
        mota: mota,
        phuong: phuong,
        quan: quan,
        sonha: sonha,
        tenduong: tenduong,
        thanhpho: thanhpho,
        tinhtrang: tinhtrang,
        khid: khid,
        loaibdid: loaibdid
      }
      if (window.confirm("Hợp đồng sau khi thêm sẽ không thể xoá trước thời hạn ! Bạn có chắc thêm ?")) {
        dispatch(addConsignment({ chiphidv, giatri, ngaybd, ngayketthuc, trangthai, khid, formBatdongsan }));
      } else {
        return;
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xoá hợp đồng ID: " + contract.kgid)) {
      if (contract.trangthai === 0) {
        dispatch(deleteConsignment(contract.kgid))
        dispatch(deleteProperty(contract.bdsid))
      } else {
        window.alert("Không thể xoá hợp đồng này !")
      }
    } else {
      return;
    }
  };

  const handleChange = (prop) => (e) => {
    var value = e.target.value;
    if (prop === "chieudai") {
      setChieudai(value)
      setDientich(value * chieurong)
    }
    if (prop === "chieurong") {
      setChieurong(value)
      setDientich(value * chieudai)
    }
    if (prop === "dongia") {
      setDongia(value)
      setHuehong(Math.round(value * 1 / 100))
      setChiphi(Math.round(value * 2 / 100))
      setGiatri(Number(value) + Number(Math.round(value * 1 / 100)) + Number(Math.round(value * 2 / 100)))
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
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Chi phí dịch vụ (VND)"
                  variant="filled"
                  placeholder="Nhập chi phí dịch vụ..."
                  fullWidth
                  value={chiphidv}
                  onChange={(e) => setChiphi(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Giá trị (VND)"
                  variant="filled"
                  fullWidth
                  type="number"
                  value={giatri}
                  onChange={(e) => setGiatri(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <DatePicker

                    label="Ngày bắt đầu"
                    value={ngaybd}
                    disablePast
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    onChange={(newValue) => {
                      setNgaybd(newValue);
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

                    label="Ngày kết thúc"
                    value={ngayketthuc}
                    disablePast
                    openTo="year"
                    views={["year", "month", "day"]}
                    minDate={new Date().setMonth(new Date().getMonth() + 3)}
                    maxDate={new Date().setFullYear(new Date().getFullYear() + 5)}
                    onChange={(newValue) => {
                      setNgaykt(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </div>
          <h2 className="modal-subtitle">Thông tin bất động sản</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField

                  id="filled-basic"
                  label="Chiều dài (m)"
                  variant="filled"
                  placeholder="Nhập chiều dài..."
                  defaultValue={chieudai}
                  onChange={handleChange("chieudai")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Chiều rộng (m)"
                  variant="filled"
                  placeholder="Nhập chiều rộng..."
                  defaultValue={chieurong}
                  onChange={handleChange("chieurong")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField

                  disabled
                  id="filled-basic"
                  label="Diện tích (m2)"
                  variant="filled"
                  placeholder="Nhập diện tích..."
                  value={dientich}
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
                  onChange={handleChange("dongia")}
                  type="number"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField

                  id="filled-basic"
                  label="Mã QSDĐ"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập mã QSDĐ..."
                  type="number"
                  defaultValue={masoqsdd}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 8);
                  }}
                  onChange={(e) => setMasoqsdd(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Huê hồng"
                  variant="filled"
                  fullWidth
                  type="number"
                  value={huehong}
                  onChange={(e) => setHuehong(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField

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

                  id="filled-basic"
                  label="Phường/xã"
                  variant="filled"
                  fullWidth
                  placeholder="Nhập phường/xã..."
                  defaultValue={phuong}
                  onChange={(e) => setPhuong(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Tình trạng
                  </InputLabel>
                  <Select
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={tinhtrang}
                    onChange={(e) => setTinhtrang(e.target.value)}
                  >
                    <MenuItem value={"0"}>Đang ký gửi</MenuItem>
                    <MenuItem value={"1"}>Đã đặt cọc</MenuItem>
                    <MenuItem value={"2"}>Đã chuyển nhượng</MenuItem>
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
                    onChange={(e) => { setKhachhang(e.target.value) }}
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
                  minRows={3}
                  maxRows={3}
                  defaultValue={mota}
                  onChange={(e) => setMota(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div
            className="modal-form"
            style={{ marginTop: "1rem", padding: "0rem 12rem" }}
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

    </Modal >
  );
}