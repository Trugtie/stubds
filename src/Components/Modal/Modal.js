import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './Modal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth:1181,
  height:'100%',
  maxHeight: 895,
  bgcolor: '#FBF6F3',
  color: 'black',
  borderRadius:'20px 20px 10px 10px;',
  boxShadow: 24,
};

export default function BasicModal({iconBtn}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className='add-btn' onClick={handleOpen}>{iconBtn}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='modal-title'>NHÂN VIÊN</h1>
          <div className='modal-content'>
            <h2 className='modal-subtitle'>Thông tin cá nhân</h2>
            <hr className='modal-divider'/>
            <div className='modal-form'>
              
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
