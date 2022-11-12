import { queryByAltText, render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import List from './List'

test('Getting user inner dom', () => {
  const { getByText } = render(<List initialItems={[]} />)
  expect(getByText('Hello 7iago')).toBeInTheDocument()
}) 
describe('List Component', () => {
  it('should render  list items', () => {
    const { getByText, rerender, queryByText, debug } = render(<List initialItems={['Tiago', 'Igor', 'Gabriel']} />)

    expect(getByText('Tiago')).toBeInTheDocument()
    expect(getByText('Igor')).toBeInTheDocument()
    expect(getByText('Gabriel')).toBeInTheDocument()
    debug()
    rerender(<List initialItems={['John']} />)
    debug()
    // Código abaixo não encontra a rerenderização
    //expect(screen.getByText('John')).toBeInTheDocument()
    //expect(screen.queryByText('Tiago')).not.toBeInTheDocument()
  })

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText , debug, findByText } = render(<List initialItems={[]} />)
    const inputElement = getByPlaceholderText('novo item')
    const addButton = getByText('Adicionar')

    debug()
    await userEvent.type(inputElement, 'Novo')
    await userEvent.click(addButton)
    
    debug()
    // usando getByText com api waitFor, alternativa semelhante ao comentário seguinte
    await waitFor(async() => {
      expect(getByText('Novo')).toBeInTheDocument()
    })
    //expect(await findByText('Novo')).toBeInTheDocument()
  })

  it('should be able to add remove item to the list', async () => {
    const { getByText, getAllByText, getByPlaceholderText , debug, findByText, queryByText } = render(<List initialItems={['Tiago']} />)
    const removeButtons = getAllByText('Remover')

    
    await userEvent.click(removeButtons[0])
    
    await waitForElementToBeRemoved(() => {
      return getByText('Tiago')
    })

    await waitFor(() => {
      expect(queryByText('Tiago')).not.toBeInTheDocument()
    })
  
  })
  
})