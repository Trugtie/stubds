import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './StaffTable.css';
import BasicModal from '../../Modal/StaffModal/Modal';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getStaffs, deleteStaff } from "../../../redux/staffSlice";

export default function StaffTable() {
  const dispatch = useDispatch();
  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Staff)));
  useEffect(() => {
    dispatch(getStaffs())
  }, [])

  const handleDelete = (staff) => {
    if (window.confirm("Bạn có chắc muốn xoá nhân viên " + staff.tennv)) {
      dispatch(deleteStaff(staff.nvid))      
    } else {
      return;
    }
  }

  return (
    <MaterialTable
      columns={[
        { title: 'ID', field: 'nvid' },
        { title: 'Họ tên', field: 'tennv' },
        { title: 'Ngày sinh', field: 'ngaysinh', type: 'date' },
        { title: 'Giới tính', field: 'gioitinh', lookup: { 0: "Nam", 1: "Nữ" } },
        { title: 'SĐT', field: 'sdt', type: 'numeric' },
        { title: 'Email', field: 'email' },
        { title: 'Địa chỉ', field: 'diachi' },
        { title: 'Quyền', field: 'quyen', lookup: { 0: "Quản lý", 1: "Sale" } },
        { title: 'Doanh thu', field: 'doanhthu' },

      ]}
      data={list}
      components={{
        Toolbar: props => (
          <div className='table-header'>
            <MTableToolbar {...props} />
            <div>
              <BasicModal iconBtn={<img src={PlusIcon} />} />           
            </div>
          </div>
        ),
      }}

      actions={
        [
          {
            icon: 'edit',
            tooltip: 'Sửa',
            onClick: (event, rowData) => alert("You saved " + rowData.tennv),
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

  );
}