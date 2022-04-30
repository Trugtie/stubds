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
import { addConsignment, editConsignment, deleteConsignment } from "../../../redux/consignmentSlice";
import { getCustomers } from "../../../redux/customerSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";
import { getProperty } from "../../../redux/propertySlice";
import { getCities } from "../../../redux/citySlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import axios from "axios";


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
  const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  const property = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
  // const cities = JSON.parse(JSON.stringify(useSelector((state) => state.City)));
  const [cities, setCities] = React.useState();
  const [districts, setDistricts] = React.useState();
  const [wards, setWards] = React.useState();

  
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTypes())
    dispatch(getCustomers())
    // if (cities !== null) {
    //   dispatch(getCities())
    // }
    // fetchCities();
  }, [])
  

  async function fetchCities() {
     setCities(await axios.get(`https://provinces.open-api.vn/api/`))
  }
  
  async function fetchDistricts(value) {
     setDistricts(await axios.get(`https://provinces.open-api.vn/api/p/${value}?depth=2`))
  }
  
  async function fetchWards(value) {
     setWards(await axios.get(`https://provinces.open-api.vn/api/d/${value}?depth=2`))
  }

  const [chiphidv, setChiphi] = React.useState("0");
  const [giatri, setGiatri] = React.useState("0");
  const [ngaybd, setNgaybd] = React.useState(null);
  const [ngayketthuc, setNgaykt] = React.useState(null);
  const [trangthai, setTrangthai] = React.useState("0");
  const [khid, setKhachhang] = React.useState("");

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
  const [tinhtrang, setTinhtrang] = React.useState("0");
  const [loaibdid, setLoaibdid] = React.useState("");

  const [cityCode, setCityCode] = React.useState();
  const [districtCode, setDistrictCode] = React.useState();


  React.useEffect(() => {
    fetchDistricts(cityCode)
  }, [cityCode])
  
  React.useEffect(() => {
    fetchWards(districtCode)
  }, [districtCode])

  React.useEffect(() => {
    if (property) {
      handleForm(property.list);
    }
  }, [property.status]);

  const handleForm = (prop) => {
    if (contract) {
      setChiphi(contract.chiphidv);
      setGiatri(contract.giatri);
      setNgaybd(contract.ngaybd);
      setNgaykt(contract.ngayketthuc);
      setTrangthai(contract.trangthai);
      setKhachhang(contract.khid);
      if (prop) {
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
      }
    } else {
      setChiphi("");
      setGiatri("");
      setNgaybd(null);
      setNgaykt(null);
      setTrangthai(0);
      setKhachhang("");
      setChieudai("");
      setChieurong("");
      setDientich("");
      setDongia("");
      setHinhanh(null);
      setHuehong("");
      setMasoqsdd("");
      setMota("");
      setPhuong("");
      setQuan("");
      setSonha("");
      setTenduong("");
      setThanhpho("");
      setTinhtrang(0);
      setLoaibdid(1);
    }
  };

  const handleSubmit = () => {
    if (
      chiphidv === "" ||
      giatri === "" ||
      ngaybd === null ||
      ngayketthuc === null ||
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
      dispatch(addConsignment({ chiphidv, giatri, ngaybd, ngayketthuc, trangthai, khid, formBatdongsan }));
      isClose();
    }
  };

  const handleEdit = () => {
    if (
      chiphidv === "" ||
      giatri === "" ||
      ngaybd === null ||
      ngayketthuc === null
    ) {
      window.alert("Thông tin không được để trống");
      return;
    } else {
      const kgid = contract.kgid;
      if (window.confirm("Bạn có chắc muốn chỉnh sửa hợp đồng ID: " + kgid)) {
        // dispatch(editConsignment({ kgid, chiphidv, giatri, ngaybd, ngayketthuc, trangthai, khid }));
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
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Chi phí dịch vụ (VND)"
                  variant="filled"
                  placeholder="Nhập chi phí dịch vụ..."
                  fullWidth
                  defaultValue={chiphidv}
                  onChange={(e) => setChiphi(e.target.value)}
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
                  defaultValue={giatri}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
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
                    label="Ngày bắt đầu"
                    value={ngaybd}
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
                    required
                    label="Ngày kết thúc"
                    value={ngayketthuc}
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
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
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
              {/* CITY */}
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
                    defaultValue={thanhpho}
                    onChange={(e) => setCityCode(e.target.value)}
                  >
                    {cities?.map(item => {
                      return (
                        <MenuItem value={item.code}>
                          {item.name}
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
                    Quận/Huyện
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={quan}
                    onChange={(e) => setDistrictCode(e.target.value)}
                  >
                    {districts?.map(item => {
                      return (
                        <MenuItem value={item.code}>
                          {item.name}
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
                    Phường/Xã
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={phuong}
                    onChange={(e) => setPhuong(e.target.value)}
                  >
                    {wards?.map(item => {
                      return (
                        <MenuItem value={item.wards.name}>
                          {item.wards.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid> */}
              {/* CITY */}

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
                    required
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
                    required
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


            {/* <Grid item xs={4}>
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
                    <MenuItem value={"0"}>Đang ký gửi</MenuItem>
                    <MenuItem value={"1"}>Hết hạn</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Mã khách hàng"
                  variant="filled"
                  placeholder="Nhập mã khách hàng..."
                  fullWidth
                  defaultValue={khid}
                  onChange={(e) => setKhachhang(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Mã BĐS"
                  variant="filled"
                  placeholder="Nhập mã bất động sản..."
                  fullWidth
                  defaultValue={bdsid}
                  onChange={(e) => setBds(e.target.value)}
                />
              </Grid> */}

            {/* <Grid item xs={4}>
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
                    onChange={(e) => setKhachhang(e.target.value)}
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
              </Grid> */}
          </div>
          <div
            className="modal-form"
            style={{ marginTop: "1rem", padding: "0rem 12rem" }}
          >
            {contract ? (
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                    Cập nhật hợp đồng
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <DeleteButton variant="contained"
                  // onClick={handleDelete(contract.kgid)}
                  >
                    Xoá hợp đồng
                  </DeleteButton>
                </Grid>
              </Grid>
            ) : (
              <ColorButton
                variant="contained"
                onClick={(e) => handleSubmit(e)}
              >
                Thêm hợp đồng
              </ColorButton>
            )}
          </div>
        </div>
      </Box>

    </Modal >
  );
}