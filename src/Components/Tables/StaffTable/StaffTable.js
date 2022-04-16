import MaterialTable, { MTableToolbar } from 'material-table';
import PlusIcon from './plus.svg';
import staffdata from './staffdata.json';
import './StaffTable.css';
import BasicModal from '../../Modal/StaffModal/Modal';

export default function StaffTable() {
    
  return (
    <MaterialTable
      columns={[
        { title: 'ID', field: 'id' },
        { title: 'Họ tên', field: 'name' },
        { title: 'Ngày sinh', field: 'birthday',type:'date'},
        { title: 'Giới tính', field: 'gender' },
        { title: 'SĐT', field: 'phone',type:'numeric' },
        { title: 'Email', field: 'email' },
        { title: 'Địa chỉ', field: 'address' },
        { title: 'Quyền', field: 'role' },
        { title: 'Doanh thu', field: 'currency' },
        
      ]}
      data={staffdata}        
      components={{
        Toolbar: props => (
          <div className='table-header'>
            <MTableToolbar {...props} />
            <div>
              <BasicModal iconBtn={<img src={PlusIcon}/>}/>
            </div>
          </div>
        ),
      }}

      actions={[
        {
          icon: 'edit',
          tooltip: 'Thêm',
          onClick: (event, rowData) => alert("You saved " + rowData.name),
          iconProps: { style: { color: "var(--button-green-color)" } }
        },
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
  );
}
