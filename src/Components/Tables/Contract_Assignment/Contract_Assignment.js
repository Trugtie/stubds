import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import './Contract_Assignment.css';
import AssignmentModal from '../../Modal/AssignmentModal';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAssignments, setState } from "../../../redux/assignmentSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";


export default function Contract_Assignment() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Assignment)));
  useEffect(() => {
    dispatch(getAssignments())
  }, [])


  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (prop) => {
    setAssignment(prop);
    setOpen(true);
  }

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
        dispatch(setState)
      }
    }
  }, [status])
  // TOAST

  return (
    <div>
      <MaterialTable
        columns={[
          { title: 'ID', field: 'cnid' },
          { title: 'BDSID', field: 'bdsid' },
          { title: 'KHID', field: 'khid' },
          { title: 'DCID', field: 'dcid' },
          { title: 'Ngày lập', field: 'ngaylap', type: 'date', dateSetting: { locale: "vi-VN" } },
          { title: 'Giá trị', field: 'giatri', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Trạng thái', field: 'trangthai', lookup: { 0: "Thành công", 1: "Thất bại" } },

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
      <AssignmentModal contract={assignment} isOpen={open} isClose={handleClose} />
    </div>
  );
}