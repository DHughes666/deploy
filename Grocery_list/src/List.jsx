import { FaEdit, FaTrash } from 'react-icons/fa'


const List = ({items, removeItem, edit}) => {
  return <div className='grocery-list'>
    {items.map((item) => {
      const {id, title} = item;
      return <article key={id} className='grocery-item'>
        <p className='title'>{title}</p>
        <div className='btn-container'>
          <button type='button' className='edit-btn'
          onClick={() => edit(id)}>
            <FaEdit />
          </button>
          <button type='button' className='delete-btn' 
          onClick={() => removeItem(id)}>
            <FaTrash />
          </button>
        </div>
      </article>
    })}
  </div>
}

export default List
