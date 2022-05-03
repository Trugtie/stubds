import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import WebViewer from '@pdftron/webviewer';
import { useLocation } from 'react-router-dom';
import { getCustomers } from "../../redux/customerSlice";
import { getTypes } from "../../redux/propertyTypeSlice";
import { getProperties } from "../../redux/propertySlice";
export default function Docx() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const viewer = useRef(null);
    const types = JSON.parse(JSON.stringify(useSelector((state) => state.PropertyType)));
    const customers = JSON.parse(JSON.stringify(useSelector((state) => state.Customer)));
    const properties = JSON.parse(JSON.stringify(useSelector((state) => state.Property)));
    useEffect(() => {
        if (types.list.length === 0) {
            dispatch(getTypes())
          }
          if (customers.list.length === 0) {
            dispatch(getCustomers())
          }
          if (properties.list.length === 0) {
            dispatch(getProperties())
          }
    }, [])
    if (state.rowData) {
        var property = properties.list.find(item => item.bdsid === state.rowData.bdsid)
        var customer = customers.list.find(item => item.khid === state.rowData.khid)
        var typeProperty = types.list.find(item => item.loaiid === property.loaibdid);
        if (state.rowData.kgid) {
            var id = state.rowData.kgid
            var type = "KÝ GỬI"
            var ngaybd = state.rowData.ngaybd
            var ngaykt = state.rowData.ngayketthuc
        } else if (state.rowData.cnid) {
            var id = state.rowData.cnid
            var type = "CHUYỂN NHƯỢNG"
            var ngaybd = state.rowData.ngaylap
            var ngaykt = "Vĩnh viễn"
        } else if (state.rowData.dcid) {
            var id = state.rowData.dcid
            var type = "ĐẶT CỌC"
            var ngaybd = state.rowData.ngaylap
            var ngaykt = state.rowData.ngayhethan
        }
        if (customer.gioitinh === 0) {
            var gioitinh = "Nam"
        } else {
            var gioitinh = "Nữ"
        }
        var data = {
            type: type,
            id: id.toString(),
            hoten: customer.hoten,
            gioitinh: gioitinh,
            ngaysinh: customer.ngaysinh.toString(),
            cmnd: customer.cmnd.toString(),
            diachitt: customer.diachitt,
            diachi: customer.diachi,
            sodienthoai: customer.sodienthoai.toString(),
            email: customer.email.toString(),
            loaibd: typeProperty.tenloai,
            sonha: property.sonha,
            duong: property.tenduong,
            phuong: property.phuong,
            quan: property.quan,
            thanhpho: property.thanhpho,
            masoqsdd: property.masoqsdd.toString(),
            dientich: property.dientich.toString(),
            ngaybd: ngaybd,
            ngaykt: ngaykt,
        }
    }
    console.log(data)
    useEffect(() => {
        WebViewer(
            {
                path: '/lib',
                initialDoc: '/files/contract.docx',
            },
            viewer.current,
        ).then((instance) => {
            const { disableElements, disableFeatures, setTheme, Feature, Theme } = instance.UI;
            disableFeatures([Feature.Annotations]);
            disableFeatures([Feature.Ribbons]);
            disableFeatures([Feature.NotesPanel]);
            disableFeatures([Feature.FilePicker]);
            disableElements(['panToolButton', 'searchButton']);
            setTheme(Theme.DARK);
            instance.UI.setLanguage('vi');
            const { documentViewer } = instance.Core;
            documentViewer.addEventListener('documentLoaded', async () => {
                await documentViewer.getDocument().documentCompletePromise();
                documentViewer.updateView();
                await documentViewer.getDocument().applyTemplateValues(data);
            });
        });
    }, [viewer]);

    return (
        <div className="webviewer" style={{ height: '100vh', }} ref={viewer}></div>
    );
};