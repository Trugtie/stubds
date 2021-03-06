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
import { addRequirement, editRequirement, deleteRequirement } from "../../../redux/requirementSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";

export default function RequirementModal({ request, cus, open, close }) {
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

  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.PropertyType)));
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!status) {
      dispatch(getTypes())
    }
  }, [])

  const [dait, setDait] = React.useState("");
  const [daif, setDaif] = React.useState("");
  const [rongt, setRongt] = React.useState("");
  const [rongf, setRongf] = React.useState("");
  const [giat, setGiat] = React.useState("");
  const [giaf, setGiaf] = React.useState("");
  const [mota, setMota] = React.useState("");
  const [dientich, setDientich] = React.useState("");
  const [vitri, setVitri] = React.useState("");
  const [khachhang, setKhachhang] = React.useState("");
  const [loaibd, setLoaibd] = React.useState("1");

  React.useEffect(() => {
    if (cus) {
      handleFormAdd(cus);
    } else {
      handleFormEdit(request);
    }
  }, [open]);

  const handleFormEdit = (request) => {
    if (request) {
      setDait(request.dait);
      setDaif(request.daif);
      setRongt(request.rongt);
      setRongf(request.rongf);
      setGiat(request.giat);
      setGiaf(request.giaf);
      setMota(request.mota);
      setDientich(request.dientich);
      setVitri(request.vitri);
      setKhachhang(request.khachhang);
      setLoaibd(request.loaibd);
    }
  };

  const handleFormAdd = (cus) => {
    setDait("");
    setDaif("");
    setRongt("");
    setRongf("");
    setGiat("");
    setGiaf("");
    setMota("");
    setDientich("");
    setVitri("");
    setKhachhang(cus.khid);
    setLoaibd("1");
  };

  const handleSubmit = () => {
    if (
      dait === "" ||
      daif === "" ||
      rongt === "" ||
      rongf === "" ||
      giat === "" ||
      giaf === "" ||
      dientich === "" ||
      vitri === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      dispatch(addRequirement({ dait, daif, rongt, rongf, giat, giaf, mota, vitri, khachhang, loaibd, dientich }));

    }
  };

  const handleEdit = () => {
    if (
      dait === "" ||
      daif === "" ||
      rongt === "" ||
      rongf === "" ||
      giat === "" ||
      giaf === "" ||
      dientich === "" ||
      vitri === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      const ycid = request.ycid;
      if (window.confirm("B???n c?? ch???c mu???n ch???nh s???a y??u c???u ID: " + ycid)) {
        dispatch(editRequirement({ ycid, dait, daif, rongt, rongf, giat, giaf, mota, vitri, khachhang, loaibd, dientich }));

      } else {
        return;
      }
    }
  };

  const handleDelete = () => {
    if (window.confirm("B???n c?? ch???c mu???n xo?? y??u c???u ID:" + request.ycid)) {
      dispatch(deleteRequirement(request.ycid))
    } else {
      return;
    }
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
          <h1 className="modal-title">Y??U C???U KH??CH H??NG</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Th??ng tin y??u c???u</h2>
            <hr className="modal-divider" />
            <div className="modal-form">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    disabled
                    id="filled-basic"
                    label="M?? kh??ch"
                    variant="filled"
                    defaultValue={khachhang}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Di???n t??ch"
                    variant="filled"
                    defaultValue={dientich}
                    placeholder="Nh???p di???n t??ch..."
                    onChange={(e) => setDientich(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", minHeight: "100%" }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Lo???i b???t ?????ng s???n
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      defaultValue={loaibd}
                      onChange={(e) => setLoaibd(e.target.value)}
                    >
                      {list?.map(item => {
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
                    label="V??? tr??"
                    variant="filled"
                    defaultValue={vitri}
                    placeholder="Nh???p v??? tr??..."
                    onChange={(e) => setVitri(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Gi?? tr??? t???"
                    variant="filled"
                    fullWidth
                    defaultValue={giat}
                    placeholder="Nh???p gi?? tr??? t???"
                    onChange={(e) => setGiat(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chi???u d??i t???"
                    variant="filled"
                    fullWidth
                    defaultValue={dait}
                    placeholder="Nh???p chi???u d??i t???"
                    onChange={(e) => setDait(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chi???u r???ng t???"
                    variant="filled"
                    fullWidth
                    defaultValue={rongt}
                    placeholder="Nh???p chi???u r???ng tr???"
                    onChange={(e) => setRongt(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Gi?? tr??? ?????n"
                    variant="filled"
                    fullWidth
                    defaultValue={giaf}
                    placeholder="Nh???p gi?? tr??? ?????n"
                    onChange={(e) => setGiaf(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chi???u d??i ?????n"
                    variant="filled"
                    fullWidth
                    defaultValue={daif}
                    placeholder="Nh???p chi???u d??i ?????n"
                    onChange={(e) => setDaif(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="filled-basic"
                    label="Chi???u r???ng ?????n"
                    variant="filled"
                    fullWidth
                    defaultValue={rongf}
                    placeholder="Nh???p chi???u r???ng ?????n"
                    onChange={(e) => setRongf(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-basic"
                    label="M?? t???"
                    variant="filled"
                    fullWidth
                    defaultValue={mota}
                    placeholder="Nh???p m?? t???..."
                    onChange={(e) => setMota(e.target.value)}
                    multiline
                    minRows={6}
                    maxRows={6}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" style={{ marginTop: "13rem" }}>
            {request ? (
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                    C???p nh???t y??u c???u
                  </ColorButton>
                </Grid>
                <Grid item xs={4}>
                  <DeleteButton variant="contained" onClick={(e) => handleDelete(e)}>
                    Xo?? y??u c???u
                  </DeleteButton>
                </Grid></Grid>
            ) : (
                <Grid item xs={12}>
                  <ColorButton variant="contained" onClick={(e) => handleSubmit(e)}>
                    Th??m y??u c???u
                  </ColorButton>
                </Grid>
            )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}