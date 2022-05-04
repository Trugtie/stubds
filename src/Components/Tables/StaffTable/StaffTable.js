import MaterialTable, { MTableToolbar } from 'material-table';
import './StaffTable.css';
import StaffModal from '../../Modal/StaffModal/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getStaffs, setState } from "../../../redux/staffSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";

export default function StaffTable() {
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Staff)));
  window.Buffer = Buffer;
  useEffect(() => {
    if (window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') === "ADMIN") {
      if (list.length < 2) {
        dispatch(getStaffs())
      }
    }
  }, [])

  const [open, setOpen] = useState(false);
  const [staffEdit, setStaff] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (staff) => {
    setStaff(staff);
    setOpen(true);
  }

  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(status);
    if (status === HTTP_STATUS.DELETED || status === HTTP_STATUS.INSERTED || status === HTTP_STATUS.EDITED) {
      setOpen(false);
    } else if (status === HTTP_STATUS.DELETE_FAILED || status === HTTP_STATUS.INSERT_FAILED || status === HTTP_STATUS.EDIT_FAILED) {
      setOpen(true);
      if (message) {
        window.alert(`${message}`);
        dispatch(setState)
      }
    }
  }, [status])
  // TOAST

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'nvid' },
          { title: 'Họ tên', field: 'tennv' },
          { title: 'Ngày sinh', field: 'ngaysinh', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Giới tính', field: 'gioitinh', lookup: { 0: "Nam", 1: "Nữ" } },
          { title: 'SĐT', field: 'sdt', type: 'numeric' },
          { title: 'Email', field: 'email' },
          { title: 'Địa chỉ', field: 'diachi' },
          { title: 'Quyền', field: 'quyen' },
          { title: 'Doanh thu', field: 'doanhthu' },
          { title: 'Trạng thái', field: 'trangthai', lookup: { 0: "Available", 1: "Blocked" } },

        ]}
        data={list}
        components={{
          Toolbar: props => (
            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
              <Typography variant="h4" gutterBottom component="div" style={{ color: "#CF9269" }} sx={{ fontWeight: 'bold' }}>
                  Danh sách nhân viên
                </Typography>
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
              icon: 'info',
              tooltip: 'Chi tiết',
              onClick: (event, rowData) => handleOpen(rowData),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
            {
              icon: 'add_circle',
              tooltip: 'Thêm',
              iconProps: {color: "info", fontSize: "large"},
              isFreeAction: true,
              onClick: (event) => handleOpen(null)
            }
          ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20]
        }}
      />
      <StaffModal staff={staffEdit} isOpen={open} isClose={handleClose} />
    </div>
  );
}
