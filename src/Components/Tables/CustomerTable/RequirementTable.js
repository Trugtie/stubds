import MaterialTable, { MTableToolbar } from 'material-table';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';
import "./Requirement.css";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRequirements, deleteRequirement } from "../../../redux/requirementSlice";
import { HTTP_STATUS } from "../../../redux/constants";
import Loading from "react-fullscreen-loading";
import AlertToast from "../../Alert/alert";

export default function CustomerTable() {
  const dispatch = useDispatch();
  const { list, status, message } = JSON.parse(JSON.stringify(useSelector((state) => state.Requirement)));
  useEffect(() => {
    if (list.length < 2) {
    dispatch(getRequirements())
  }}, [])


  const handleDelete = (request) => {
    if (window.confirm("Bạn có chắc muốn xoá yêu cầu ID:" + request.ycid)) {
      dispatch(deleteRequirement(request.ycid))
    } else {
      return;
    }
  };
  const [openRe, setOpenRe] = useState(false);
  const [request, setRequest] = useState(null);
  const handleClose = () => setOpenRe(false);
  const handleRequest = (request) => {
    setRequest(request);
    setOpenRe(true);;
  }
  // TOAST
  const [toast, setToast] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const handleCloseToast = () => setOpenToast(false);
  useEffect(() => {
    setOpenToast(true);
    setToast(status);
    if (status === HTTP_STATUS.DELETED || status === HTTP_STATUS.INSERTED || status === HTTP_STATUS.EDITED) {
      setOpenRe(false);
    } else if (status === HTTP_STATUS.DELETE_FAILED || status === HTTP_STATUS.INSERT_FAILED || status === HTTP_STATUS.EDIT_FAILED) {
      setOpenRe(true);
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
          { title: 'ID', field: 'ycid' },
          { title: 'Loại BDS', field: 'loaibd' },
          { title: 'Dài từ (m)', field: 'dait', type: 'numeric' },
          { title: 'Dài đến (m)', field: 'daif', type: 'numeric' },
          { title: 'Rộng từ(m)', field: 'rongt', type: 'numeric' },
          { title: 'Rộng đến(m)', field: 'rongf', type: 'numeric' },
          { title: 'Diện tích (m*m)', field: 'dientich', type: 'numeric' },
          { title: 'Vị trí', field: 'vitri' },
          { title: 'Giá từ', field: 'giat', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
          { title: 'Giá đến', field: 'giaf', type: 'currency', currencySetting: { locale: 'vi', currencyCode: 'vnd', minimumFractionDigits: 0, maximumFractionDigits: 2 } },
        ]}
        title="Danh sách yêu cầu"
        data={list}
        components={{
          Toolbar: props => (
            <div className='table-header'>
              <MTableToolbar {...props} />
              <div>
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
            icon: 'edit',
            tooltip: 'Sửa',
            onClick: (event, rowData) => handleRequest(rowData),
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
          pageSize: 5,
          pageSizeOptions: [5, 10],
        }}
      />
      <RequirementModal request={request} cus={null} open={openRe} close={handleClose} />

    </div>
  );
}

