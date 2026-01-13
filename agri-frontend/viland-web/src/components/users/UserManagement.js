import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { fetchUsers, deleteUser, updateUser, createUser, toggleUserActive } from "../services/userService";
import UserForm from "./UserForm";
import '../styles/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleEdit =  async (user) => {
   setEditingUser(user);
   console.log("get data: "+ user);
   setShowForm(true);
  };
 
   const handleCreateUser = async(user) => {
    setEditingUser(null);
    setShowForm(true);
   }

   const handleSubmitForm = async (formData) => {
       if(editingUser){
        await updateUser(formData.id, formData);
       }
       else await createUser(formData);
       setShowForm(false);
       await loadUsers();
   }

   const handleLockUser = async (id) => {
       await toggleUserActive(id);
       loadUsers();
   };
   
  return (
 <div>
  <div className="button-container">
  {!showForm && (
    <button onClick={handleCreateUser} className="quick-action-card">
      <div className="quick-action-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2"/>
          <line x1="22" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      <span>Add new</span>
    </button>
  )}
  <button onClick={handleCreateUser} className="quick-action-card">
    <div className="quick-action-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 6h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 12h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 18h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <span>Show all</span>
  </button>
</div>
  
  {showForm ? (
    <UserForm initialData={editingUser} onSubmit={handleSubmitForm} onCancel={() => setShowForm(false)} />
  ) : (
    <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} onLock={handleLockUser} />
  )}
</div>
  );
};

export default UserManagement;
