import ModalAnimalHistoric from '.'
import { render, screen } from '@testing-library/react'

const animal = {
  animal_type: 'OTHER',
  birth: '2005-12-12T00:00:00',
  id: 5,
  name: 'Richard',
  owner: 'Susan Shoji',
  appointments: [
    {
      animal_id: 5,
      created_at: '2009-01-27T00:00:00',
      details: 'Voluptatem amet sit sed quisquam quisquam labore aliquam.',
      id: 95,
      type: 'VACCINE',
    },
  ],
}

describe('ModalAnimalHistoric', () => {
  it('should render the ModalAnimalHistoric', () => {
    render(
      <ModalAnimalHistoric
        open={true}
        onClose={() => {
          console.log('close')
        }}
        animal={animal}
      />
    )

    expect(screen.getByTestId('modal-animal-historic')).toBeInTheDocument()
  })
})
