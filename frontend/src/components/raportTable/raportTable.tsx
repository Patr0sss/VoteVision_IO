import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
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
              Dessert (100g serving)
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Calories
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Fat&nbsp;(g)
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Carbs&nbsp;(g)
            </TableCell>
            <TableCell
              sx={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
              align="right"
            >
              Protein&nbsp;(g)
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
              <TableCell
                sx={{
                  fontSize: "2rem",
                }}
                align="right"
              >
                {row.carbs}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "2rem",
                }}
                align="right"
              >
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}