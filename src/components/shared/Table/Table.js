import React from "react"
import clsx from "clsx"
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core"
import { COLORS } from "@Constants/layout"

const useStyles = makeStyles({
  tableContainer: {
    boxShadow: "none",
  },
  table: {
    borderCollapse: "separate",
  },
  tableHead: {
    position: "sticky",
    top: 0,
    backgroundColor: COLORS.white,
    zIndex: 99,
  },
  tableHeaderRow: {
    "& .MuiTableSortLabel-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    "& .MuiTableSortLabel-icon": {
      opacity: 1,
    },
    "& .MuiTableCell-head": {
      fontSize: 16,
      fontWeight: 500,
      padding: "14.5px 6px 14.5px 0px",
      color: COLORS.darkBlue,
      backgroundColor: COLORS.white,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      borderBottomWidth: 2,
      borderBottomColor: COLORS.lightGray,
    },
  },
  tableBodyRow: {
    "& .MuiTableCell-body": {
      fontSize: 14,
      padding: "9px 6px 9px 0px",
      color: COLORS.darkBlue,
      borderBottomColor: COLORS.lightGray,
    },
    "& a": {
      fontSize: 14,
      color: COLORS.darkBlue,
    },
  },
})

const Table = React.forwardRef(
  (
    {
      columns = [],
      rowData = [],
      bodyCellStyle = {},
      headerCellStyle = {},
      className,
      tableBodyRowClass = "",
    },
    ref,
  ) => {
    const classes = useStyles()

    return (
      <TableContainer
        ref={ref}
        className={clsx(classes.tableContainer, className)}
        component={Paper}
      >
        <MuiTable className={classes.table} aria-label="customized table">
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.tableHeaderRow}>
              {columns.map(
                ({
                  id,
                  title = "",
                  cellStyle,
                  headerCellRenderer,
                  hidden = false,
                } = {}) => {
                  if (hidden) return null

                  return (
                    <TableCell
                      style={{ ...(cellStyle || {}), ...headerCellStyle }}
                      key={id}
                    >
                      {typeof headerCellRenderer === "function"
                        ? headerCellRenderer(id)
                        : title}
                    </TableCell>
                  )
                },
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => (
              <TableRow
                key={row.id}
                className={clsx(
                  classes.tableBodyRow,
                  tableBodyRowClass,
                  row.className,
                )}
              >
                {columns.map((column) => {
                  if (column.hidden) return null

                  return (
                    <TableCell
                      key={column.id}
                      style={{
                        ...(column.cellStyle || {}),
                        ...bodyCellStyle,
                      }}
                      scope="row"
                    >
                      {typeof column.cellRenderer === "function"
                        ? column.cellRenderer(row, index)
                        : row[column.field]}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    )
  },
)

export default Table
