import { useState, useEffect } from 'react';
import './App.css';
import {db} from './firebase-config';
import {collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot} from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);

  // Establish connection to a specific collection (or table)
  const usersCollectionRef = collection(db, "users");

  const [formData, setFormData] = useState({name:'', age:''})
  const handleChange = (event) =>{
    const {name, value, type, checked} = event.target;
    setFormData(prevData =>{
      return {...prevData,
        [name]: type === "checkbox" ? checked: value
      }
    })
  }

  useEffect(() => {
    // Fetch data from firebase
    const getUsers = async () => {
      // getDocuments (or table entry)

      // use onSnapShot to get real time updates on data
      // const data = await getDocs(usersCollectionRef)
      await onSnapshot(usersCollectionRef, (users) => {
        // returns object containing entry fields and id 
        setUsers(users.docs.map((user) => ({...user.data(), id: user.id})))
      })

      
    }

    getUsers();

  },[]);


  const createUser = () =>{
    // Add a user
    addDoc(usersCollectionRef, {name: formData.name, age:Number(formData.age)})
  }
  const updateUser = (id, age) => {
    const userDoc = doc(db, "users", id)
    // update field
    const newFields = {age: age + 1};

    updateDoc(userDoc,newFields);
  }

  const deleteUser = (id) =>{
    const userDoc = doc(db, "users", id)
    deleteDoc(userDoc)
  }


  
  const userElements = users.map(user => {
    return(
      <div>
        <h1>Name: {user.name}</h1>
        <h1>Age: {user.age}</h1>
        <button onClick={() => {updateUser(user.id, user.age)}}>Increase Age</button>
        <button onClick={() => {deleteUser(user.id)}}>Delete</button>
      </div>
    )
  })
  console.log(users);
  console.log(formData);
  return (
    <div className="App">
      <input 
        type="text" 
        placeholder="Name"
        value={formData.name}
        name="name"
        onChange={handleChange}
      />
      <input 
        type="number" 
        placeholder="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />

      <button onClick={createUser}>Create User</button>
      {userElements}
    </div>
  );
}

export default App;
