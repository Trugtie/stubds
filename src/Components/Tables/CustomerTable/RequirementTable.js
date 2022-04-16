import MaterialTable from "material-table";
import data from "./requiredata.json";
import "./Requirement.css";

export default function RequirementTable() {
  return (
    <div className='requirementContainer'>
      <MaterialTable
        style={{height: '100%'}}
        columns={[
          { title: "ID", field: "id" },
          { title: "Diện tích", field: "size" },
          { title: "Vị trí", field: "location"},
          { title: "Mô tả", field: "description" },
          { title: "Giá trị", field: "cost" },
          { title: "Chiều dài", field: "lenght" },
          { title: "Chiều rộng", field: "width" },
          { title: "Loại", field: "type" },
        ]}
        data={data}
        title="Danh sách yêu cầu"
        actions={[
          (rowData) => ({
            icon: "delete",
            tooltip: "Xóa",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.name),
            iconProps: { style: { color: "#B52017" } },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5],
          headerStyle: {
            
            
          },
          cellStyle: {
            
          }
        }}
      />
    </div>
  );
}
