import HeaderBar from '.'
import { render, screen } from '@testing-library/react'

describe('Header Bar', () => {
  it('should render the HeaderBar component', () => {
    render(<HeaderBar />)

    expect(screen.getByTestId('header-bar')).toBeInTheDocument()
  })
})
