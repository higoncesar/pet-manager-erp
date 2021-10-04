import React from 'react'
import { OutlinedInput, InputAdornment, Box } from '@material-ui/core'
import { FaSearch } from 'react-icons/fa'

interface SearchInputProps {
  handleSearch?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearch,
  placeholder = 'Buscar',
}) => {
  return (
    <Box>
      <OutlinedInput
        type="search"
        onChange={handleSearch}
        placeholder={placeholder}
        data-testid="search"
        endAdornment={
          <InputAdornment position="start">
            <FaSearch />
          </InputAdornment>
        }
      />
    </Box>
  )
}

export default SearchInput
