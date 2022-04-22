import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { HTTP_STATUS } from "../../redux/constants";

export default function AlertToast({value, open, close}) {
    const [openToast, setOpenToast] = useState(false);
    const [messageToast, setMessageToast] = useState("");
    const [statusToast, setStatusToast] = useState("");

    const handleToast = (status) => {
        if (status === HTTP_STATUS.EDITED) {
            setMessageToast("Chỉnh sửa thành công !");
            setStatusToast("success");
        } else if (status === HTTP_STATUS.EDIT_FAILED) {
            setMessageToast("Chỉnh sửa thất bại !");
            setStatusToast("error");
        } else if (status === HTTP_STATUS.DELETED) {
            setMessageToast("Xoá thành công !");
            setStatusToast("success");
        } else if (status === HTTP_STATUS.DELETE_FAILED) {
            setMessageToast("Xoá thất bại !");
            setStatusToast("error");
        } else if (status === HTTP_STATUS.INSERTED) {
            setMessageToast("Thêm thành công !");
            setStatusToast("success");
        } else if (status === HTTP_STATUS.INSERT_FAILED) {
            setMessageToast("Thêm thất bại !");
            setStatusToast("error");
        }
        setOpenToast(open);
    }

    useEffect(() => {
        handleToast(value)
    }, [open])

    return (
        <Snackbar open={openToast} autoHideDuration={2000} onClose={close} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert variant="filled"  severity={statusToast} sx={{ width: '100%' }}>
                {messageToast}
            </Alert>
        </Snackbar>
    );
}
