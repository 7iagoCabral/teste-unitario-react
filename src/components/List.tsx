import { useState } from 'react'

type ListProps = {
  initialItems: string[]
}

function List({ initialItems }: ListProps) {
   const [list, setList] = useState(initialItems)
   const [newItem, setNewItem] = useState('')


   function addToList(){
    setTimeout(() => {
      setList(state => [...state, newItem])

    }, 500)
   }

   function removeFromList(item: string){
    setTimeout(() => {
      setList(state => state.filter(item => item != item))

    }, 500)
   }

   
  return (
    <>
      <h1>Hello 7iago</h1>
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
        
        <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>
        
        ))}
      </ul>

      <input placeholder='novo item' value={newItem} onChange={e => setNewItem(e.target.value)} type="text" />
    
    </>
  )
}

export default List
