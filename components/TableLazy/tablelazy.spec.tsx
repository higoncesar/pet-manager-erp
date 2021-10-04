import TableLazy from '.'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const data = [
  {
    animal_type: 'OTHER',
    birth: '2015-08-24T00:00:00',
    id: 0,
    name: 'Jodi',
    owner: 'Audrea Axtell',
  },
  {
    animal_type: 'FISH',
    birth: '2002-02-06T00:00:00',
    id: 1,
    name: 'Jeffrey',
    owner: 'John Phelps',
  },
  {
    animal_type: 'OTHER',
    birth: '2015-08-08T00:00:00',
    id: 2,
    name: 'Angel',
    owner: 'Preston Stemple',
  },
  {
    animal_type: 'DOG',
    birth: '2005-09-01T00:00:00',
    id: 3,
    name: 'Kathleen',
    owner: 'John Kerns',
  },
  {
    animal_type: 'DOG',
    birth: '2002-09-10T00:00:00',
    id: 4,
    name: 'Spencer',
    owner: 'Clarice Garcia',
  },
  {
    animal_type: 'OTHER',
    birth: '2005-12-12T00:00:00',
    id: 5,
    name: 'Richard',
    owner: 'Susan Shoji',
  },
]

const header = [
  { key: 'name', cell: 'Nome' },
  { key: 'birth', cell: 'Nascimento', isDate: true },
  { key: 'animal_type', cell: 'Espécie' },
  { key: 'owner', cell: 'Tutor' },
]

describe('TableLazy', () => {
  it('should render a TableLazy ', () => {
    render(<TableLazy data={data} header={header} />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('should render a TableLazy with search input', () => {
    render(<TableLazy data={data} header={header} />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('should render a TableLazy with pros.customColumns', () => {
    const customColumn = () => <div>Custom Column</div>
    render(
      <TableLazy
        data={data}
        header={header}
        customColunm={[{ header: { key: 'custom' }, cell: customColumn }]}
      />
    )
    const customColumnElement = screen.getAllByText('Custom Column')[0]
    expect(customColumnElement).toBeInTheDocument()
  })

  it('should render a TableLazy without search input when prop.isSearchable is passed as false', () => {
    render(<TableLazy data={data} header={header} isSearchable={false} />)
    const searchInput = screen.queryByRole('searchbox')
    expect(searchInput).toBeNull()
  })

  describe('Pagination', () => {
    it('should render a TableLazy with pagination', () => {
      render(<TableLazy data={data} header={header} isSearchable={false} />)
      const pagination = screen.getByTestId('pagination')
      expect(pagination).toBeInTheDocument()
    })

    it('should go to a next page and previous page when click in buttons page navigate', async () => {
      render(<TableLazy data={data} header={header} isSearchable={false} />)
      const buttonNextPage = screen.getByTitle('Go to next page')
      expect(buttonNextPage).toBeInTheDocument()
      await fireEvent.click(buttonNextPage)
      expect(screen.getByText(/6-6 de 6/i)).toBeInTheDocument()
      const buttonPrevious = screen.getByTitle('Go to previous page')
      expect(buttonPrevious).toBeInTheDocument()
      await fireEvent.click(buttonPrevious)
      expect(screen.getByText(/1-5 de 6/i)).toBeInTheDocument()
    })
  })

  describe('Search', () => {
    it('should filter table when input text to search field', () => {
      render(<TableLazy data={data} header={header} />)
      const search_input = screen.getByTestId('search').children[0]
      const search_text = 'OTHER'
      userEvent.type(search_input, search_text)
      expect(screen.getByText(/1-3 de 3/i)).toBeInTheDocument()
    })

    it('should filter table when input date to search field', () => {
      render(<TableLazy data={data} header={header} />)
      const search_input = screen.getByTestId('search').children[0]
      const search_text = '/2015'
      userEvent.type(search_input, search_text)
      expect(screen.getByText(/1-2 de 2/i)).toBeInTheDocument()
    })
  })

  describe('Sort', () => {
    it('should sort the table by decreasing', async () => {
      render(<TableLazy data={data} header={header} />)
      const columnName = screen.getByRole('button', { name: 'Nome' })
      await fireEvent.click(columnName)

      const body = screen.getAllByRole('rowgroup')[1]
      const firtsRow = body.children[0]

      expect(firtsRow).toHaveTextContent('Spencer')
    })

    it('should sort the table by ascendant', async () => {
      render(<TableLazy data={data} header={header} />)
      const columnName = screen.getByRole('button', { name: 'Nome' })
      await fireEvent.click(columnName)
      await fireEvent.click(columnName)

      const body = screen.getAllByRole('rowgroup')[1]
      const firtsRow = body.children[0]

      expect(firtsRow).toHaveTextContent('Angel')
    })
  })
})
