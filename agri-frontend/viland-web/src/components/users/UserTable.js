import React from "react";
import "../styles/UserTable.css"; // Đường dẫn mới

const UserTable = ({ users, onEdit, onDelete, onLock }) => {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead className="user-table-thead">
          <tr>
            <th className="user-table-th">Username</th>
            <th className="user-table-th">Full Name</th>
            <th className="user-table-th">Email</th>
            <th className="user-table-th">Status</th>
            <th className="user-table-th">Role</th>
            <th className="user-table-th">Phone</th>
            <th className="user-table-th">Gender</th>
            <th className="user-table-th">Birthday</th>
            <th className="user-table-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-table-row">
              <td className="user-table-td">{user.username}</td>
              <td className="user-table-td">{user.full_name || "None"}</td>
              <td className="user-table-td">{user.email}</td>
              <td className="user-table-td">{user.is_active ? "active" : "stop"}</td>
              <td className="user-table-td">{user.role}</td>
              <td className="user-table-td">{user.phone_number || "none"}</td>
              <td className="user-table-td">{user.gender}</td>
              <td className="user-table-td">
                {new Date(user.date_of_birth).toLocaleDateString('vi-VN')}
              </td>
              <td className="user-table-td user-table-actions">
                <button
                  onClick={() => onEdit(user)}
                  className="action-button btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="action-button btn-delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => onLock(user.id)}
                  className="action-button btn-lock"
                >
                  {!user.is_active ? "Unlock" : "Lock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;