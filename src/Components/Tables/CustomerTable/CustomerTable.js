import MaterialTable, { MTableToolbar } from 'material-table';
import { useState, useEffect } from 'react';
import PlusIcon from './plus.svg';
import RequireIcon from './requirement.svg'
import CustomerModal from '../../Modal/CustomerModal/CustomerModal';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';

import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../../../redux/customerSlice";

export default function CustomerTable() {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();  
  const {list,status}=JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
  useEffect(() => {
    dispatch(getCustomers())    
  }, [])

  return (
    <div>
    <MaterialTable
      columns={[
        { title: 'ID', field: 'khid' },
        { title: 'Họ tên', field: 'hoten' },
        { title: 'Ngày sinh', field: 'ngaysinh',type:'date'},
        { title: 'Giới tính', field: 'gioitinh', lookup: { 0: "Nam", 1: "Nữ" } },
        { title: 'SĐT', field: 'sodienthoai',type:'numeric' },
        { title: 'CMND', field: 'cmnd',type:'numeric' },
        { title: 'Email', field: 'email' },
        { title: 'Địa chỉ', field: 'diachi' },
        { title: 'Địa chỉ thanh toán', field: 'diachitt' },
        { title: 'Loại KH', field: 'loaikh', lookup: { 0: "Cá nhân", 1: "Công ty" } },
        { title: 'Trạng thái', field: 'trangthai', lookup: { 1: "Available", 0: "Blocked" } },
      ]}
      data={list}        
      components={{
        Toolbar: props => (
          <div className='table-header'>
            <MTableToolbar {...props} />
            <div>
              <CustomerModal iconBtn={<img src={PlusIcon}/>}/>
            </div>
          </div>
        )
      }}

      actions={[
        {
          icon: 'edit',
          tooltip: 'Thêm',
          onClick: (event, rowData) => alert("You saved " + rowData.name),
          iconProps: { style: { color: "var(--button-green-color)" } }
        },
        rowData => ({
          icon: () => <img src={RequireIcon} style={{width:'24px',padding:'1px 2px'}}/>,
          tooltip: 'Lập yêu cầu',
          onClick: (event, rowData) => handleOpen(),
          iconProps: { style: { color: "#B52017"} }
        }),
        rowData => ({
          icon: 'delete',
          tooltip: 'Xóa',
          onClick: (event, rowData) => alert("You want to delete " + rowData.name),
          iconProps: { style: { color: "#B52017" } }
        })
      ]}
      options={{
        actionsColumnIndex: -1,
        pageSize:10,
        pageSizeOptions:[10,15,20]
      }}
    />
    <RequirementModal open={open} close={handleClose}/>
    </div>
  );
}
