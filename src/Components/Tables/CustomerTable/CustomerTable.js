import MaterialTable, { MTableToolbar } from 'material-table';
import { useState } from 'react';
import PlusIcon from './plus.svg';
import RequireIcon from './requirement.svg'
import staffdata from './staffdata.json';
import CustomerModal from '../../Modal/CustomerModal/CustomerModal';
import RequirementModal from '../../Modal/CustomerModal/RequirementModal';

export default function CustomerTable() {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <MaterialTable
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Họ tên', field: 'name' },
        { title: 'Ngày sinh', field: 'birthday',type:'date'},
        { title: 'Giới tính', field: 'gender' },
        { title: 'SĐT', field: 'phone',type:'numeric' },
        { title: 'CMND', field: 'cmnd',type:'numeric' },
        { title: 'Email', field: 'email' },
        { title: 'Địa chỉ', field: 'address' },
        { title: 'Loại KH', field: 'type' },
      ]}
      data={staffdata}        
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
