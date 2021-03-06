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
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
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
      if (window.confirm("H???p ?????ng sau khi th??m s??? kh??ng th??? xo?? tr?????c th???i h???n ! B???n c?? ch???c th??m ?")) {
        dispatch(addConsignment({ chiphidv, giatri, ngaybd, ngayketthuc, trangthai, khid, formBatdongsan }));
      } else {
        return;
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm("B???n c?? ch???c mu???n xo?? h???p ?????ng ID: " + contract.kgid)) {
      if (contract.trangthai === 0) {
        dispatch(deleteConsignment(contract.kgid))
        dispatch(deleteProperty(contract.bdsid))
      } else {
        window.alert("Kh??ng th??? xo?? h???p ?????ng n??y !")
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
        <h1 className="modal-title">H???P ?????NG K?? G???I</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Th??ng tin h???p ?????ng k?? g???i</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Chi ph?? d???ch v??? (VND)"
                  variant="filled"
                  placeholder="Nh???p chi ph?? d???ch v???..."
                  fullWidth
                  value={chiphidv}
                  onChange={(e) => setChiphi(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled
                  id="filled-basic"
                  label="Gi?? tr??? (VND)"
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

                    label="Ng??y b???t ?????u"
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

                    label="Ng??y k???t th??c"
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
          <h2 className="modal-subtitle">Th??ng tin b???t ?????ng s???n</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField

                  id="filled-basic"
                  label="Chi???u d??i (m)"
                  variant="filled"
                  placeholder="Nh???p chi???u d??i..."
                  defaultValue={chieudai}
                  onChange={handleChange("chieudai")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-basic"
                  label="Chi???u r???ng (m)"
                  variant="filled"
                  placeholder="Nh???p chi???u r???ng..."
                  defaultValue={chieurong}
                  onChange={handleChange("chieurong")}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField

                  disabled
                  id="filled-basic"
                  label="Di???n t??ch (m2)"
                  variant="filled"
                  placeholder="Nh???p di???n t??ch..."
                  value={dientich}
                  onChange={(e) => setDientich(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="????n gi?? (VND)"
                  variant="filled"
                  placeholder="Nh???p ????n gi??..."
                  fullWidth
                  defaultValue={dongia}
                  onChange={handleChange("dongia")}
                  type="number"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField

                  id="filled-basic"
                  label="M?? QSD??"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p m?? QSD??..."
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
                  label="Hu?? h???ng"
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
                  label="S??? nh??"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p s??? nh??..."
                  defaultValue={sonha}
                  onChange={(e) => setSonha(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField

                  id="filled-basic"
                  label="???????ng"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p t??n ???????ng..."
                  defaultValue={tenduong}
                  onChange={(e) => setTenduong(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField

                  id="filled-basic"
                  label="Th??nh ph???/T???nh"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p th??nh ph???/t???nh..."
                  defaultValue={thanhpho}
                  onChange={(e) => setThanhpho(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField

                  id="filled-basic"
                  label="Qu???n/Huy???n"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p qu???n/huy???n..."
                  defaultValue={quan}
                  onChange={(e) => setQuan(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField

                  id="filled-basic"
                  label="Ph?????ng/x??"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p ph?????ng/x??..."
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
                    T??nh tr???ng
                  </InputLabel>
                  <Select
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={tinhtrang}
                    onChange={(e) => setTinhtrang(e.target.value)}
                  >
                    <MenuItem value={"0"}>??ang k?? g???i</MenuItem>
                    <MenuItem value={"1"}>???? ?????t c???c</MenuItem>
                    <MenuItem value={"2"}>???? chuy???n nh?????ng</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Kh??ch h??ng
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
                    Lo???i B??S
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
                  label="M?? t???"
                  variant="filled"
                  fullWidth
                  placeholder="Nh???p m?? t???..."
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
                  Xo?? h???p ?????ng
                </DeleteButton>
              ) : (
                <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                  Th??m h???p ?????ng
                </ColorButton>
              )}
            </Grid>
          </div>
        </div>
      </Box>

    </Modal >
  );
}