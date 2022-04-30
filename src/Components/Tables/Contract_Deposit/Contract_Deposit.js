import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './Contract_Deposit.css';
import DepositModal from '../../Modal/DepositModal';
import Button from "@mui/material/Button";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getDeposites } from "../../../redux/depositSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";


export default function Contract_Deposit() {
  const dispatch = useDispatch();
  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Deposit)));
  useEffect(() => {
      dispatch(getDeposites())
  }, [])


  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (prop) => {
    setDeposit(prop);
    setOpen(true);
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
          { title: 'ID', field: 'dcid' },
          { title: 'BDSID', field: 'bdsid' },
          { title: 'Ngày lập', field: 'ngaylap', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Ngày hết hạn', field: 'ngayhethan', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Giá trị', field: 'giatri', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Trạng thái', field: 'trangthai', lookup: { 0: "Đã đặt cọc", 1: "Không khả dụng" } },

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
              icon: 'info',
              tooltip: 'Chi tiết',
              onClick: (event, rowData) => handleOpen(rowData),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
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