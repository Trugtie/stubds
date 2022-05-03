import MaterialTable, { MTableToolbar } from 'material-table';
import { useState, useEffect } from 'react';
import PlusIcon from './plus.svg';
import RequireIcon from './requirement.svg'
import CustomerModal from '../../Modal/CustomerModal/CustomerModal';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, deleteCustomer, setState } from "../../../redux/customerSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";

export default function CustomerTable() {
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  const requirement = JSON.parse(JSON.stringify(useSelector((state) => state.Requirement)));
  useEffect(() => {
    if (list.length < 2) {
      dispatch(getCustomers())
    }
  }, [])

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
  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(status);
    if (status === HTTP_STATUS.DELETED || status === HTTP_STATUS.INSERTED || status === HTTP_STATUS.EDITED || requirement.status === HTTP_STATUS.INSERTED) {
      setOpenAdd(false);
      setOpenRe(false);
    } else if (status === HTTP_STATUS.DELETE_FAILED || status === HTTP_STATUS.INSERT_FAILED || status === HTTP_STATUS.EDIT_FAILED) {
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
          { title: 'ID', field: 'khid' },
          { title: 'Họ tên', field: 'hoten' },
          { title: 'Ngày sinh', field: 'ngaysinh', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Giới tính', field: 'gioitinh', lookup: { 0: "Nam", 1: "Nữ" } },
          { title: 'SĐT', field: 'sodienthoai', type: 'numeric' },
          { title: 'CMND', field: 'cmnd', type: 'numeric' },
          { title: 'Email', field: 'email' },
          { title: 'Địa chỉ', field: 'diachi' },
          { title: 'Địa chỉ thường trú', field: 'diachitt' },
          { title: 'Loại KH', field: 'loaikh', lookup: { 0: "Cá nhân", 1: "Công ty" } },
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
          )
        }}

        actions={[
          {
            icon: 'info',
              tooltip: 'Chi tiết',
            onClick: (event, rowData) => handleOpen(rowData),
            iconProps: { style: { color: "var(--button-green-color)" } }
          },
          rowData => ({
            icon: () => <img src={RequireIcon} style={{ width: '24px', padding: '1px 2px' }} />,
            tooltip: 'Lập yêu cầu',
            onClick: (event, rowData) => handleRequest(rowData),
            iconProps: { style: { color: "#B52017" } }
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20]
        }}
      />
      <CustomerModal cus={cusEdit} isOpen={openAdd} isClose={handleClose} />
      <RequirementModal cus={cusEdit} request={null} open={openRe} close={handleClose} />
    </div>
  );
}

