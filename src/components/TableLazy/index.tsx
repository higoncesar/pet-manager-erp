import { useState, FC, ReactNode, useCallback, useEffect } from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  Stack,
  Card,
} from '@material-ui/core'
import { format } from 'date-fns'
import { FaSearch } from 'react-icons/fa'

type HeaderItem = {
  cell: string | ReactNode
  key: string
  isDate?: boolean
}

type TableLazyProps = {
  data: any[]
  header: HeaderItem[]
  customColunm?: any[]
  emptyContent?: ReactNode
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

const TableLazy: FC<TableLazyProps> = ({
  data = [],
  header,
  customColunm,
  emptyContent = 'Não há dados para mostrar',
}) => {
  const [rowsPerPage, setRowPerPages] = useState(10)
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState(header[0].key)
  const [filterData, setFilterData] = useState<any[]>([])

  useEffect(() => {
    setFilterData(data)
  }, [data])

  const handleSearch = useCallback(
    (event) => {
      const value = event.target.value.toLowerCase()
      const filter = data.filter((bodyRow) => {
        const bodyRowArray = Object.entries(bodyRow)
        const validColuns = bodyRowArray.filter(([key]) =>
          header.find((headerItem) => headerItem.key === key.toString())
        )
        return validColuns.find((value: any) =>
          value.column.toString().toLowerCase().includes(value)
        )
      })
      setFilterData(filter)
    },
    [data, filterData, header]
  )

  return (
    <Stack spacing={4}>
      <Box>
        <OutlinedInput
          onChange={handleSearch}
          placeholder="Buscar"
          endAdornment={
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          }
        />
      </Box>
      <Card>
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
                {customColunm?.map((column, index) => (
                  <TableCell key={index}>{column.header.cell}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData.length ? (
                filterData
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

                      {customColunm?.map(({ cell }, index) => (
                        <TableCell key={index}>{cell(row)}</TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={header.length}>
                    <Typography variant="h6" component="div" textAlign="center">
                      {emptyContent}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filterData.length}
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
          labelDisplayedRows={(pageInfo) =>
            `${pageInfo.from}-${pageInfo.to} de ${pageInfo.count}`
          }
        />
      </Card>
    </Stack>
  )
}

export default TableLazy
