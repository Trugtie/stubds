import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './Contract_Consignment.css';
import ConsignmentModal from '../../Modal/ConsignmentModal';
import Button from "@mui/material/Button";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getConsignments } from "../../../redux/consignmentSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";


export default function Contract_Consignment() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Consignment)));
  useEffect(() => {
    dispatch(getConsignments())
  }, [])

  const [open, setOpen] = useState(false);
  const [consignmentEdit, setConsignment] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (prop) => {
    setConsignment(prop);
    setOpen(true);
  };

  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(status);
    if (status === HTTP_STATUS.DELETED || status === HTTP_STATUS.INSERTED) {
      setOpen(false);
    } else if (status === HTTP_STATUS.DELETE_FAILED || status === HTTP_STATUS.INSERT_FAILED) {
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
          { title: 'ID', field: 'kgid' },
          { title: 'BDSID', field: 'bdsid' },
          { title: 'KHID', field: 'khid' },
          { title: 'Ngày bắt đầu', field: 'ngaybd', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Ngày kết thúc', field: 'ngayketthuc', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Giá trị', field: 'giatri', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Dịch vụ', field: 'chiphidv', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Trạng thái', field: 'trangthai', lookup: { 0: "Đang ký gửi", 1: "Không khả dụng" } },
        ]}
        data={list}
        components={{
          Toolbar: props => (

            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
                <ConsignmentModal contract={consignmentEdit} isOpen={open} isClose={handleClose} />
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
            {
              icon: 'print',
              tooltip: 'In',
              onClick: (event, rowData) => navigate("/docx", { state: { rowData } }),
              iconProps: { style: { color: "var(--button-green-color)" } }
            },
          ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 15, 20]
        }}
      />
    </div>
  );
}