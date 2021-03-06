import MaterialTable, { MTableToolbar } from 'material-table';
import { useState, useEffect } from 'react';
import RequireIcon from './requirement.svg'
import CustomerModal from '../../Modal/CustomerModal/CustomerModal';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, setState } from "../../../redux/customerSlice";
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
          { title: 'H??? t??n', field: 'hoten' },
          { title: 'Ng??y sinh', field: 'ngaysinh', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Gi???i t??nh', field: 'gioitinh', lookup: { 0: "Nam", 1: "N???" } },
          { title: 'S??T', field: 'sodienthoai', type: 'numeric' },
          { title: 'CMND', field: 'cmnd', type: 'numeric' },
          { title: 'Email', field: 'email' },
          { title: '?????a ch???', field: 'diachi' },
          { title: '?????a ch??? th?????ng tr??', field: 'diachitt' },
          { title: 'Lo???i KH', field: 'loaikh', lookup: { 0: "C?? nh??n", 1: "C??ng ty" } },
          { title: 'Tr???ng th??i', field: 'trangthai', lookup: { 0: "Available", 1: "Blocked" } },
        ]}
        data={list}
        components={{
          Toolbar: props => (
            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
              <Typography variant="h4" gutterBottom component="div" style={{ color: "#CF9269" }} sx={{ fontWeight: 'bold' }}>
                  Danh s??ch kh??ch h??ng
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
          )
        }}

        actions={[
          {
            icon: 'info',
              tooltip: 'Chi ti???t',
            onClick: (event, rowData) => handleOpen(rowData),
            iconProps: { style: { color: "var(--button-green-color)" } }
          },
          rowData => ({
            icon: () => <img src={RequireIcon} style={{ width: '24px', padding: '1px 2px' }} />,
            tooltip: 'L???p y??u c???u',
            onClick: (event, rowData) => handleRequest(rowData),
            iconProps: { style: { color: "#B52017" } }
          }),
          {
            icon: 'add_circle',
            tooltip: 'Th??m',
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
      <CustomerModal cus={cusEdit} isOpen={openAdd} isClose={handleClose} />
      <RequirementModal cus={cusEdit} request={null} open={openRe} close={handleClose} />
    </div>
  );
}

