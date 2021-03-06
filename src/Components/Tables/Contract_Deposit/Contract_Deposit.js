import MaterialTable, { MTableToolbar } from 'material-table';
import './Contract_Deposit.css';
import Typography from '@mui/material/Typography';
import DepositModal from '../../Modal/DepositModal';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getDeposites, setState } from "../../../redux/depositSlice";
import { getConsignments } from "../../../redux/consignmentSlice";
import { getProperties } from "../../../redux/propertySlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";


export default function Contract_Deposit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Deposit)));
  useEffect(() => {
    dispatch(getDeposites())
  }, [])


  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (prop) => {
    setOpenToast(false);
    setDeposit(prop);
    setOpen(true);
  }

  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    if (status === HTTP_STATUS.DELETED || status === HTTP_STATUS.INSERTED) {
      setOpen(false);
      dispatch(getProperties())
      dispatch(getConsignments())
      setOpenToast(true);
      setToast(status);
      setTimeout(function(){
        dispatch(setState)
      },500)
    } else if (status === HTTP_STATUS.DELETE_FAILED || status === HTTP_STATUS.INSERT_FAILED) {
      setOpenToast(true);
      setToast(status);
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
          { title: 'ID', field: 'dcid' },
          { title: 'BDSID', field: 'bdsid' },
          { title: 'Ng??y l???p', field: 'ngaylap', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Ng??y h???t h???n', field: 'ngayhethan', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Gi?? tr???', field: 'giatri', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Tr???ng th??i', field: 'trangthai', lookup: { 0: "???? ?????t c???c", 1: "Kh??ng kh??? d???ng" } },

        ]}
        data={list}
        components={{
          Toolbar: props => (
            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
                <Typography variant="h4" gutterBottom component="div" style={{ color: "#CF9269" }} sx={{ fontWeight: 'bold' }}>
                  Danh s??ch h???p ?????ng ?????t c???c
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
              tooltip: 'Chi ti???t',
              onClick: (event, rowData) => handleOpen(rowData),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
            {
              icon: 'print',
              tooltip: 'In',
              onClick: (event, rowData) => navigate("/docx", { state: { rowData } }),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
            {
              icon: 'add_circle',
              tooltip: 'Th??m',
              iconProps: { color: "info", fontSize: "large" },
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
      <DepositModal contract={deposit} isOpen={open} isClose={handleClose} />
    </div>
  );
}