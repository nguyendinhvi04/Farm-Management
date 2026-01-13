import React, { useState, useEffect } from 'react';
import '../styles/UserForm.css'; 

const UserForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    role: '',
    phone_number: '',
    gender: '',
    date_of_birth: '',
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // Đảm bảo định dạng date là 'YYYY-MM-DD' cho input type="date"
      const formattedData = {
        ...initialData,
        date_of_birth: initialData.date_of_birth
          ? new Date(initialData.date_of_birth).toISOString().split('T')[0]
          : '',
      };
      setFormData(formattedData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label className="form-label">Username</label>
        <input type="text" name="username" value={formData.username || ''} onChange={handleChange}
          className="form-input" required />
      </div>
      
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input type="text" name="full_name" value={formData.full_name || ''} onChange={handleChange}
          className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" name="email" value={formData.email || ''} onChange={handleChange}
          className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">Role</label>
        <input type="text" name="role" value={formData.role || ''} onChange={handleChange}
          className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">Phone</label>
        <input type="text" name="phone_number" value={formData.phone_number || ''} onChange={handleChange}
          className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <input type="text" name="gender" value={formData.gender || ''} onChange={handleChange}
          className="form-input" required />
      </div>
      
      <div className="form-group">
        <label className="form-label">Birthday</label>
        <input type="date" name="date_of_birth" value={formData.date_of_birth || ''} onChange={handleChange}
          className="form-input" required />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="form-button btn-cancel">
          Cancel
        </button>
        <button type="submit" className="form-button btn-submit">
          {initialData?.id ? 'Update' : 'Create new'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;