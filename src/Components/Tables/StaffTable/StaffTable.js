import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './StaffTable.css';
import StaffModal from '../../Modal/StaffModal/Modal';
import Button from "@mui/material/Button";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getStaffs, deleteStaff } from "../../../redux/staffSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";

export default function StaffTable() {
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Staff)));
  window.Buffer = Buffer;
  const account = window.Buffer.from(localStorage.getItem("Token"), 'base64').toString('ascii').split(":");
  useEffect(() => {
    if (window.Buffer.from(localStorage.getItem("permission"), 'base64').toString('ascii') === "ADMIN") {
      if (list.length < 2) {
        dispatch(getStaffs())
      }
    }
  }, [])

  const handleDelete = (staff) => {
    if (staff.taikhoan === account[0]) {
      window.alert("Bạn không thể xoá bản thân mình !")
    }
    else if (window.confirm("Bạn có chắc muốn xoá nhân viên " + staff.tennv)) {
      dispatch(deleteStaff(staff.nvid))
    } else {
      return;
    }
  };

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
                <Button className="add-btn" onClick={() => handleOpen(null)}>
                  <img src={PlusIcon} />
                </Button>
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
            rowData => ({
              icon: 'delete',
              tooltip: 'Xóa',
              onClick: (event, rowData) => handleDelete(rowData),
              iconProps: { style: { color: "#B52017" } }
            })
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
