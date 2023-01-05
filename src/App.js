import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [name, setName] = useState("tayfun")
  const [avatar, setAvatar] = useState(false)

  const [users, setUsers] = useState(false)

  const addPost = data => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }


  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')

    .then(res =>{
      if(res.ok && res.status == 200){
        return res.json()
      }
      
    })
    .then(data => setUsers(data))
    .catch(err => console.log(err))

    addPost({
      userId: 1,
      title: 'Örnek Post',
      body: 'Post İçeriği'
    })
  },[])

  const submitHandle = e =>{
    e.preventDefault()
    console.log("submit edildi")
  }

  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/> <br />
        <input type="file" name="avatar" onChange={e => setAvatar(e.target.files[0])} /> <br />
        <button type="submit" disabled={!name || !avatar}>Kaydet</button>
      </form>


      <h1>Names</h1>
      <ul>
      {users && users.map(user=>(
        <li key={user.id}>
          {user.name}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
