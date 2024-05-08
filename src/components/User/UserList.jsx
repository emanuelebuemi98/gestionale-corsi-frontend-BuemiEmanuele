import React from 'react';
import { UserCard } from './UserCard';

export function UserList({ userList }) {
  return (
    <div className="container">
      <h1 className="mt-4">Lista Utenti</h1>
      <div className="row">
        {userList.map(user => (
          <div key={user.id} className="col-md-4 mb-4">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
