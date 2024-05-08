import React from 'react';

export function UserCard({ user }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Informazioni Utente </h5>
        <h6 className="card-subtitle mb-2 text-muted">Nome: {user.nome} </h6>
        <h6 className="card-subtitle mb-2 text-muted">Cognome: {user.cognome} </h6>
        <h6 className="card-subtitle mb-2 text-muted">Email: {user.email}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Ruolo: {user.ruoli.length > 0 ? user.ruoli[0].tipologia : 'N/A'}</h6>
      </div>
    </div>
  );
}
