import Banner from '.'
import { render, screen } from '@testing-library/react'

describe('Banner', () => {
  it('should render the Banner component', () => {
    render(<Banner />)

    expect(screen.getByTestId('banner')).toBeInTheDocument()
  })
})
