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
import { getTypes } from "../../../redux/propertyTypeSlice";
import { getProperties } from "../../../redux/propertySlice";
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
  const [giatri, setGiatri] = React.useState(0);
  const [ngaylap, setNgaylap] = React.useState(null);
  const [trangthai, setTrangthai] = React.useState(0);
  const [khid, setKhid] = React.useState(0);
  const [dcid, setDcid] = React.useState();

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
  const properties = JSON.parse(JSON.stringify(useSelector((state) => state.Deposit.list.filter((item) => item.trangthai === 0))));
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
    dispatch(getDeposites())
  }, []);

  const handleForm = (e) => {
    setGiatri(e.giatri);
    setNgaylap(e.ngaylap);
    setTrangthai(e.trangthai);
    setKhid(e.khid);
  };

  const handleFormAdd = () => {
    setGiatri(0);
    setNgaylap(null);
    setTrangthai(0);
    setKhid(0);
    setDcid();
  };


  const handleSubmit = () => {
    if (
      giatri === "" ||
      ngaylap === null ||
      khid === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      var deposit = properties.filter((item) => item.dcid === dcid);
      var bdsid = deposit[0].bdsid
      dispatch(
        addAssignment({ giatri, ngaylap, bdsid, khid, trangthai, dcid })
      );
      return;
    }
  };

  const handleDelete = () => {
    if (window.confirm("B???n c?? ch???c mu???n xo?? h???p ?????ng ID: " + contract.cnid)) {
      dispatch(deleteAssignment(contract.cnid, contract.dcid))
    } else {
      return;
    }
  };

  const handleChange = (prop) => (e) => {
    var value = e.target.value;
    if (prop === "dcid") {
      setDcid(value);
      var deposit_amount = properties.find((item) => item.dcid===value).giatri
      var property_amount = propers.list.find((item) => item.bdsid === properties[0].bdsid).dongia
      var kh = properties.find((item) => item.dcid===value).khid
      setKhid(kh)
      setGiatri(Number(property_amount) - Number(deposit_amount))
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
        <h1 className="modal-title">H???P ?????NG CHUY???N NH?????NG</h1>
        <div className="modal-content">
          <h2 className="modal-subtitle">Th??ng tin h???p ?????ng chuy???n nh?????ng</h2>
          <hr className="modal-divider" />
          <div className="modal-form" style={{ marginTop: "2rem" }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
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

                    label="Ng??y l???p"
                    value={ngaylap}
                    minDate={new Date().setDate(new Date().getDate() + 1)}
                    maxDate={new Date().setMonth(new Date().getMonth() + 3)}
                    disablePast
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
                {contract ?
                  <TextField
                    disabled
                    id="filled-basic"
                    label="M?? ?????t c???c"
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
                      M?? ?????t c???c
                    </InputLabel>
                    <Select

                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      defaultValue={dcid}
                      onChange={handleChange("dcid")}
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
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Tr???ng th??i
                  </InputLabel>
                  <Select
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    defaultValue={trangthai}
                    onChange={(e) => setTrangthai(e.target.value)}
                  >
                    <MenuItem value={"0"}>Th??nh c??ng</MenuItem>
                    <MenuItem value={"1"}>Th???i b???i</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  variant="filled"
                  sx={{ width: "100%", minHeight: "100%" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Kh??ch h??ng
                  </InputLabel>
                  <Select
                    disabled
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={khid}
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
            </Grid>
          </div>

          <div
            className="modal-form"
            style={{ marginTop: "28rem", padding: "0rem 12rem" }}
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
    </Modal>
  );
}
