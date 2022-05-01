import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "./Accordion.css";
import StaffIcon from './staff.svg';
import CustomerIcon from './customer.svg';
import BdsIcon from './bds.svg';
import KyGuiIcon from './kygui.svg';
import DatCocIcon from './datcoc.svg';
import ChuyenNhuongIcon from './chuyennhuong.svg';
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandMoreIcon
        sx={{ fontSize: "1.4rem", color: "white", width: "25px" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "var(--button-color)",
  flexDirection: "row",
  "& .MuiAccordionSummary-content": {
    margin: 0,
    height: "35px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  color: "white",
  fontSize: "14px",
  fontWeight: "700",
  padding: "0",
  minHeight: "35px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  backgroundColor: "#85CF7E",
  color: "white",
  padding: "0",
}));

export default function CustomizedAccordion({ permission }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {permission === localStorage.getItem('permission') ?
        <React.Fragment>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <Link to="/customermanagement" className="link">
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                sx={{
                  '&:hover': {
                    bgcolor: 'green'
                  },
                  '&:focus': {
                    bgcolor: 'green'
                  }
                }}
              >
                <div className="icon-bg"><img src={CustomerIcon} /></div>
                <div className="acor-heading">QUẢN LÝ KHÁCH HÀNG</div>
              </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <Link to="/staffmanagement" className="link">
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
                sx={{
                  '&:hover': {
                    bgcolor: 'green'
                  },
                  '&:focus': {
                    bgcolor: 'green'
                  }
                }}
              >
                <div className="icon-bg"><img src={StaffIcon} /></div>
                <div className="acor-heading">QUẢN LÝ NHÂN VIÊN</div>
              </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <Link to="/property" className="link">
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={BdsIcon} /></div>
              <div className="acor-heading">QUẢN LÝ BẤT ĐỘNG SẢN</div>
            </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <Link to="/consignment" className="link">
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={KyGuiIcon} /></div>
              <div className="acor-heading">QUẢN LÝ HĐ KÝ GỬI</div>
            </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <Link to="/deposit" className="link">
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={DatCocIcon} /></div>
              <div className="acor-heading">QUẢN LÝ HĐ ĐẶT CỌC</div>
            </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel6"}
            onChange={handleChange("panel6")}
          >
            <Link to="/assignment" className="link">
            <AccordionSummary aria-controls="panel6d-content" id="panel6d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={ChuyenNhuongIcon} /></div>
              <div className="acor-heading">QUẢN LÝ HĐ CHUYỂN NHƯỢNG</div>
            </AccordionSummary>
            </Link>
          </Accordion>
        </React.Fragment>
        :
        <React.Fragment>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <Link to="/customermanagement" className="link">
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={CustomerIcon} /></div>
              <div className="acor-heading">QUẢN LÝ KHÁCH HÀNG</div>
            </AccordionSummary>
            </Link>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <Link to="/property" className="link">
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header"
              sx={{
                '&:hover': {
                  bgcolor: 'green'
                },
                '&:focus': {
                  bgcolor: 'green'
                }
              }}>
              <div className="icon-bg"><img src={BdsIcon} /></div>
              <div className="acor-heading">QUẢN LÝ BẤT ĐỘNG SẢN</div>
            </AccordionSummary>
            </Link>
          </Accordion>
        </React.Fragment>
      }
    </div >
  );
}
