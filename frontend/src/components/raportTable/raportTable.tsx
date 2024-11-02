import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("Projekt Miyagiego", 29, 5.0),
  createData("Digital Learning Transformation", 34, 3.3),
  createData("Green City Initiative", 9, 2.5),
  createData("Community Health Awareness", 18, 1.0),
];

export default function RaportTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ width: "90vw", marginLeft: "5vw" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Projects Data :
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Votes Count
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Average Rating
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                fontSize: "2rem",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "2rem",
                }}
                align="right"
              >
                {row.calories}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "2rem",
                }}
                align="right"
              >
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
