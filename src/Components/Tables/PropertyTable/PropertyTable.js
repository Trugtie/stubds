import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './PropertyTable.css';
import PropertyModal from '../../Modal/PropertyModal/PropertyModal';
import Button from "@mui/material/Button";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProperties } from "../../../redux/propertySlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";
import ThumbGallery from "../../ThumbGallery"


export default function PropertyTable() {
  window.Buffer=Buffer;
  const dispatch = useDispatch();
  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
  useEffect(() => {
    if (list.length < 2) {
    dispatch(getProperties())
  }}, [])

  const [open, setOpen] = useState(false);
  const [propertyEdit, setProperty] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (prop) => {
    if(window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') === "ADMIN")
    {
    setProperty(prop);
    setOpen(true);
  }else{
    window.alert("Bạn không có quyền chỉnh sửa !")
  }
  }

  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(status);
  }, [status])
  // TOAST


  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'bdsid' },
          { title: 'Dài (m)', field: 'chieudai', type: 'numeric' },
          { title: 'Rộng (m)', field: 'chieurong', type: 'numeric' },
          { title: 'Diện tích (m*m)', field: 'dientich', type: 'numeric' },
          { title: 'Đơn giá', field: 'dongia', type: 'currency' , currencySetting:{ locale: 'vi',currencyCode:'vnd', minimumFractionDigits:0, maximumFractionDigits:2}},
          { title: 'Huê hồng (%)', field: 'huehong', type: 'numeric' },
          { title: 'Mã QSDĐ', field: 'masoqsdd', type: 'numeric' },
          { title: 'Đường', field: 'tenduong' },
          { title: 'Phường/Xã', field: 'phuong' },
          { title: 'Quận/Huyện', field: 'quan' },
          { title: 'Thành phố/Tỉnh', field: 'thanhpho' },
          { title: 'Tình trạng', field: 'tinhtrang', lookup: { 0: "Đang ký gửi", 1: "Đã chuyển nhượng" } },

        ]}
        data={list}
        components={{
          Toolbar: props => (
            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
                {/* <Button className="add-btn" onClick={() => handleOpen(null)}>
                  <img src={PlusIcon} />
                </Button> */}
                {status === HTTP_STATUS.PENDING ?
                  <Loading
                    loading={true}
                    background="rgba(0,0,0,0.2)"
                    loaderColor="#CF9269"
                  />
                  : ""}
                <AlertToast value={toast} open={openToast} close={handleCloseToast} />
              </div>
            </div>
          ),
        }}

        actions={
          [
            {
              icon: 'edit',
              tooltip: 'Sửa',
              onClick: (event, rowData) => handleOpen(rowData),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
          ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20]
        }}
        detailPanel={
          rowData => {
          return (
            <div style={{display: 'flex',justifyContent: 'center'}}>
            <ThumbGallery/>
            </div>
          )
        }
      }
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
      <PropertyModal property={propertyEdit} isOpen={open} isClose={handleClose} />
    </div>
  );
}

