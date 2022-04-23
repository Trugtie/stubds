import MaterialTable from "material-table";
// import data from "./requiredata.json";
import "./Requirement.css";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRequirements } from "../../../redux/requirementSlice";

export default function RequirementTable() {
  const dispatch = useDispatch();
  const { list, status } = JSON.parse(JSON.stringify(useSelector((state) => state.Requirement)));
  useEffect(() => {
    dispatch(getRequirements())
  }, [])
  return (
    <div className='requirementContainer'>
      <MaterialTable
        style={{height: '100%'}}
        columns={[
          { title: 'ID', field: 'ycid' },
          { title: 'Dài từ (m)', field: 'dait', type: 'numeric' },
          { title: 'Dài đến (m)', field: 'daif', type: 'numeric' },
          { title: 'Rộng từ(m)', field: 'rongt', type: 'numeric' },
          { title: 'Rộng đến(m)', field: 'rongf', type: 'numeric' },
          { title: 'Diện tích (m*m)', field: 'dientich', type: 'numeric' },
          { title: 'Vị trí', field: 'vitri' },
          { title: 'Giá từ', field: 'giat', type: 'currency' , currencySetting:{ locale: 'vi',currencyCode:'vnd', minimumFractionDigits:0, maximumFractionDigits:2}},
          { title: 'Giá đến', field: 'giaf', type: 'currency' , currencySetting:{ locale: 'vi',currencyCode:'vnd', minimumFractionDigits:0, maximumFractionDigits:2}},
          { title: 'Mô tả', field: 'mota' },
        ]}
        data={list}
        title="Danh sách yêu cầu"
        actions={[
          (rowData) => ({
            icon: "delete",
            tooltip: "Xóa",
            onClick: (event, rowData) =>
              alert("You want to delete " + rowData.ycid),
            iconProps: { style: { color: "#B52017" } },
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5],
          headerStyle: {
          },
        }}
      />
    </div>
  );
}
