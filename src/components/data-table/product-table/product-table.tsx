import React, { PropsWithChildren } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Column } from "@/types/table/columType";
import { ProductType } from "@/types/product-list/productType";
import { isUndefined } from "lodash";

interface ProductTableProps {
  children?: React.ReactNode;
  columns?: Column[];
  rows?: ProductType[];
  /* Define your other props here */
}

const ProductTable = ({
  columns = [],
  rows = [],
}: PropsWithChildren<ProductTableProps>) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "70vw", padding: 3, borderRadius: 3 }}>
      <TableContainer sx={{ height: "fit-content" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ bgcolor: "#2dfd7d" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ bgcolor: "transparent" }}
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${row.productName}${idx}`}
                  >
                    {columns.map((column) => {
                      let value: string | number = "";
                      if (column.id !== "action") {
                        value = row[column.id];
                      }
                      if (!isUndefined(column?.renderCell)) {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                            }}
                          >
                            {column?.renderCell(row)}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          svg: {
            fontSize: 25,
          },
        }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
