
import './App.css';
import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
const App = () => {

  const [contacts, setContacts] = useState(data);
  const[addFormData, setAddFormData] = useState({

fullName:"",
phoneNumber : "",
address :"",
email : "",

  });

const [editFormData, setEditFormData] = useState({
  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
});
  const[editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event)=>{
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");

    const fieldValue = event.target.value;

    const newFormData = {...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
const handleEditFormChange = (event) =>{
  event.preventDefault();

  const fieldName = event.target.getAttribute("name");

const fieldValue = event.target.value;
const newFormData = {...editFormData };

newFormData[fieldName] = fieldValue;

setEditFormData(newFormData);
 
};
const handleAddFormSubmit = (event)=>
{
  event.preventDefault();

  const newContact = {
    id: nanoid(),
  fullName: addFormData.fullName,
    phoneNumber: addFormData.phoneNumber,
   address: addFormData.address,
   email: addFormData.email,
  };
  //Contacts Array
  const newContacts = [...contacts, newContact];
  setContacts(newContacts);
};
const handleEditFormSubmit = (event)=> {
  event.preventDefault();

  
  const editedContact = {
    id: editContactId,
    fullName: editFormData.fullName,
    address: editFormData.address,
    phoneNumber: editFormData.phoneNumber,
    email: editFormData.email,
  };
  const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };


const handleEditClick = (event, contact) =>{
  event.preventDefault();
  setEditContactId(contact.id);

const formValues = {
    fullName: contact.fullName, 
    phoneNumber: contact.phoneNumber,
    address: contact.address,
    email: contact.email,
};

setEditFormData(formValues);
};

const handleDeleteClick = (contactId) => {
  const newContacts = [...contacts];

  const index = contacts.findIndex((contact) => contact.id === contactId);

  newContacts.splice(index, 1);

  setContacts(newContacts);
};
  return(<div className ="app-container">
<form onSubmit={handleEditFormSubmit}>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Phone Number</th>
      <th>Address</th>
      <th>Email</th>
      <th>Actions</th>

    </tr>
  </thead>
  <tbody>
    {contacts.map((contact) =>  (

      <Fragment>

 { editContactId === contact.id ?  (
 < EditableRow editFormData = {editFormData} handleEditFormChange = { handleEditFormChange}
 handleDeleteClick={handleDeleteClick}/> 
 
 ) :(
  <ReadOnlyRow contact = {contact} 
  handleEditClick= { handleEditClick}
  handleDeleteClick={handleDeleteClick}/>
 ) }
      </Fragment>
    ))}
    
  </tbody>
</table>
</form>
<h2>Add a Contact </h2>
<form onSubmit={ handleAddFormSubmit }>
  <input type="text"
    name="fullName"
    required="required"
    placeholder="Enter a name....."
    onChange = {handleAddFormChange}  >
  </input>
<input type="text"
    name="phoneNumber"
    required="required"
    placeholder="Enter a phone number....."
    onChange = {handleAddFormChange} >
     
  </input>
  <input type="text"
    name="address"
    required="required"
    placeholder="Enter your address...."
    onChange = {handleAddFormChange} >
     
  </input>
  <input type="email"
    name="email"
    required="required"
    placeholder="Enter an email....."
    onChange = {handleAddFormChange} >
  </input>
  <button type= "submit">Add</button>
</form>


  </div>
  );
 };
export default App;
