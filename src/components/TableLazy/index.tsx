import { useState, FC, ReactNode } from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from '@material-ui/core'
import { format } from 'date-fns'

type HeaderItem = {
  cell: string | ReactNode
  key: string
  isDate?: boolean
}

type TableLazyProps = {
  data: any[]
  header: HeaderItem[]
}

type Order = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const TableLazy: FC<TableLazyProps> = ({ data, header }) => {
  const [rowsPerPage, setRowPerPages] = useState(10)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState(header[0].key)

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    active={orderBy === item.key}
                    direction={order}
                    onClick={() => {
                      setOrderBy(item.key)
                      setOrder((old) => (old === 'asc' ? 'desc' : 'asc'))
                      setPage(0)
                    }}
                  >
                    {item.cell}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .sort((a, b) => {
                return order === 'asc'
                  ? descendingComparator(a, b, orderBy)
                  : -descendingComparator(a, b, orderBy)
              })
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  {header.map(({ key, isDate }, index) => (
                    <TableCell key={index}>
                      {isDate
                        ? format(new Date(row[key]), 'dd/MM/yyyy')
                        : row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => {
          setPage(page)
        }}
        onRowsPerPageChange={(value) => {
          setRowPerPages(Number(value.target.value))
          setPage(0)
        }}
        labelRowsPerPage="Item por página"
        labelDisplayedRows={(pageInfo) => {
          console.log({ pageInfo })
          return `${pageInfo.from}-${pageInfo.to} de ${pageInfo.count}`
        }}
      />
    </>
  )
}

export default TableLazy
