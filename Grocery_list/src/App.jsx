import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
}

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false, 
    msg: '', 
    type: '',});
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //display alert
      showAlert(true, 'danger', 'Please enter value')
    } else if (name && isEditing) {
      // deal with edit
      setList(list.map((item) => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setEditID(null);
      setIsEditing(false)
      showAlert(true, 'info', 'Item successfully edited')
    } else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name};
      setList([...list, newItem]);
      setName('');
    }
  }

  const removeItem = (itemID) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter(item => item.id !== itemID));
  }

  const editItem = (itemID) => {
    const editedItem = list.find(item => item.id === itemID);
    setIsEditing(true);
    setEditID(itemID);
    setName(editedItem.title);
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg});
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
    setIsEditing(false);
  }

  return <section className="section-center">
      <form action="" className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} 
          removeAlert={showAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" className="grocery"
            placeholder="e.g. bacon"
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} edit={editItem}/>
        <button className="clear-btn" onClick={clearList}>clear items</button>
    </div>
      )}
  </section>
};

export default App;
