import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import "./custom.css";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Button from '@mui/material/Button';
// or
// import { Button } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));
// const rows = ["Row 1", "Row 2", "Row 3"];
const rows = [
  {
    status: "Status 1",
    severity: "Severity 1",
    description: "Short Description 1"
  },
  {
    status: "Status 2",
    severity: "Severity 2",
    description: "Short Description 2"
  },
  {
    status: "Status 3",
    severity: "Severity 3",
    description: "Short Description 3"
  }
];

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Short Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.severity}</TableCell>
                <TableCell>{row.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}>
                  <MuiAccordion
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  >
                    <MuiAccordionSummary
                      expandIcon={
                        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
                      }
                      aria-controls={`panel${index}d-content`}
                      id={`panel${index}d-header`}
                    >
                      <Typography>Details</Typography>
                    </MuiAccordionSummary>
                    <MuiAccordionDetails>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Header 1</TableCell>
                            <TableCell>Header 2</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Row 1 Col 1</TableCell>
                            <TableCell>Row 1 Col 2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Row 2 Col 1</TableCell>
                            <TableCell>Row 2 Col 2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Row 3 Col 1</TableCell>
                            <TableCell>Row 3 Col 2</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Row 4 Col 1</TableCell>
                            <TableCell>Row 4 Col 2</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Button variant="contained" color="primary">Button</Button>
                    </MuiAccordionDetails>
                  </MuiAccordion>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
