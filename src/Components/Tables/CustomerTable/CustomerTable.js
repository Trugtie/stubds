import MaterialTable, { MTableToolbar } from 'material-table';
import { useState, useEffect } from 'react';
import PlusIcon from './plus.svg';
import RequireIcon from './requirement.svg'
import CustomerModal from '../../Modal/CustomerModal/CustomerModal';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';
import Button from "@mui/material/Button";

import { useSelector, useDispatch } from "react-redux";
import { getCustomers, deleteCustomer } from "../../../redux/customerSlice";

export default function CustomerTable() {
  const dispatch = useDispatch();
  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const handleDelete = (cus) => {
    if (window.confirm("Bạn có chắc muốn xoá khách hàng " + cus.hoten)) {
      dispatch(deleteCustomer(cus.khid))
    } else {
      return;
    }
  };

  const [openAdd, setOpenAdd] = useState(false);
  const [openRe, setOpenRe] = useState(false);
  const [cusEdit, setCustomer] = useState(null);
  const handleClose = () => {
    setOpenAdd(false);
    setOpenRe(false);
  }
  const handleOpen = (cus) => {
    setCustomer(cus);
    setOpenAdd(true);
  }
  const handleRequest = (cus) => {
    setCustomer(cus);
    setOpenRe(true);;
  }

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'khid' },
          { title: 'Họ tên', field: 'hoten' },
          { title: 'Ngày sinh', field: 'ngaysinh', type: 'date' },
          { title: 'Giới tính', field: 'gioitinh', lookup: { 0: "Nam", 1: "Nữ" } },
          { title: 'SĐT', field: 'sodienthoai', type: 'numeric' },
          { title: 'CMND', field: 'cmnd', type: 'numeric' },
          { title: 'Email', field: 'email' },
          { title: 'Địa chỉ', field: 'diachi' },
          { title: 'Địa chỉ thường trú', field: 'diachitt' },
          { title: 'Loại KH', field: 'loaikh', lookup: { 0: "Cá nhân", 1: "Công ty" } },
          { title: 'Trạng thái', field: 'trangthai', lookup: { 1: "Available", 0: "Blocked" } },
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
              </div>
            </div>
          )
        }}

        actions={[
          {
            icon: 'edit',
            tooltip: 'Thêm',
            onClick: (event, rowData) => handleOpen(rowData),
            iconProps: { style: { color: "var(--button-green-color)" } }
          },
          rowData => ({
            icon: () => <img src={RequireIcon} style={{ width: '24px', padding: '1px 2px' }} />,
            tooltip: 'Lập yêu cầu',
            onClick: (event, rowData) => handleRequest(rowData),
            iconProps: { style: { color: "#B52017" } }
          }),
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
      <CustomerModal cus={cusEdit} isOpen={openAdd} isClose={handleClose} />
      <RequirementModal open={openRe} close={handleClose} />
    </div>
  );
}
