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
import { editProperty } from "../../../redux/propertySlice";
import { uploadImage } from "../../../redux/imageSlice";
import { getCustomers } from "../../../redux/customerSlice";
import { getTypes } from "../../../redux/propertyTypeSlice";
import { useDropzone } from 'react-dropzone'


export default function PropertyModal({ property, isOpen, isClose }) {
  const dropzone = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#2196f3',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };

  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

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
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (types.list.length === 0) {
      dispatch(getTypes())
    }
    if (customers.list.length === 0) {
      dispatch(getCustomers())
    }
  }, [])

  const [chieudai, setChieudai] = React.useState(0);
  const [chieurong, setChieurong] = React.useState(0);
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
  let file = null;

  React.useEffect(() => {
    if (property) {
      handleFormEdit(property);
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
  };

  const handleEdit = () => {
    if (
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
      thanhpho === ""
    ) {
      window.alert("Th??ng tin kh??ng ???????c ????? tr???ng");
      return;
    } else {
      const bdsid = property.bdsid;
      if (window.confirm("B???n c?? ch???c mu???n ch???nh s???a b???t ?????ng s???n ID: " + bdsid)) {
        if (file) {
          dispatch(uploadImage({ file, bdsid }))
        }
        dispatch(editProperty({ bdsid, chieudai, chieurong, dientich, dongia, hinhanh, huehong, masoqsdd, mota, phuong, quan, sonha, thanhpho, tenduong, khid, tinhtrang, loaibdid }));
      } else {
        return;
      }
    }
  };

  function Dropzone(props) {
    const [files, setFiles] = React.useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      maxFiles: 5,
      accept: 'image/*',
      onDrop: acceptedFiles => {
        file = acceptedFiles
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });


    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt={file.name}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));

    React.useEffect(() => {
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
      <section style={dropzone}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>K??o ???nh ho???c click v??o ????y ????? t???i ???nh (T???i ??a ch??? c?? 5 ???nh)</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={isClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-title">B???T ?????NG S???N</h1>
          <div className="modal-content">
            <h2 className="modal-subtitle">Th??ng tin b???t ?????ng s???n</h2>
            <hr className="modal-divider" />
            <div className="modal-form" style={{ marginTop: '2rem' }}>
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
                    disabled
                    id="filled-basic"
                    label="????n gi?? (VND)"
                    variant="filled"
                    placeholder="Nh???p ????n gi??..."
                    fullWidth
                    defaultValue={dongia}
                    onChange={(e) => setDongia(e.target.value)}
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
                    label="Hu?? h???ng (%)"
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
                    minRows={2}
                    maxRows={4}
                    defaultValue={mota}
                    onChange={(e) => setMota(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Dropzone />
                </Grid>
              </Grid>
            </div>
            <div className="modal-form" >
              {property ? (
                <ColorButton variant="contained" onClick={(e) => handleEdit(e)}>
                  C???p nh???t b???t ?????ng s???n
                </ColorButton>
              ) : (
                ""
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
