import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../contexts/AuthContext/AuthContext"
import { UserList } from '../../components/User/UserList';
import { UserCard } from '../../components/User/UserCard';
import { getUserByEmail, getAllUsers, updateUser, deleteUser } from '../../services/RESTService';

export function UserPage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(false); // Stato per l'utente corrente
  const [allUsers, setAllUsers] = useState([]); // Stato per la lista di tutti gli utenti
  const [updateUserData, setUpdateUserData] = useState({
    id: "",
    nome: "",
    cognome: "",
    email: "", 
    idRuolo: ""
  });
  const [deleteUserEmail, setDeleteUserEmail] = useState("");

  useEffect(() => {
    // Se l'utente è loggato, ottengo le sue informazioni
    if (user.isAuthorized) {
      getUserByEmail(user.email)
        .then(userData => setCurrentUser(userData))
        .catch(error => console.error('Errore durante il recupero delle informazioni dell\'utente:', error.message));
    }

    //Se l'utente è un amministratore, ottengo la lista di tutti gli utenti
    if (user && user.tipologia === 'Admin') {
      //Ottengo il token del contesto di autenticazione
      const token = user.token;
      getAllUsers(token)
        .then(users => setAllUsers(users))
        .catch(error => console.error('Errore durante il recupero della lista degli utenti:', error.message));
    }
  }, [user]); // Vado ad eseguire questa operazione ogni volta che cambia lo stato dell'utente


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserData(prevData => ({
      ...prevData, [name]: value
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const token = user.token;
      const updatedUserData = await updateUser(updateUserData, token);
      console.log('Utente aggiornato:', updatedUserData);
      // Aggiorno lo stato degli utenti dopo l'aggiornamento
      const updatedUsers = allUsers.map(user => {
        if (user.id === updatedUserData.id) {
          return updatedUserData;
        }
        return user;
      });
      setAllUsers(updatedUsers);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dell\'utente:', error.message);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const token = user.token;
      const isDeleted = await deleteUser(email, token);
      if (isDeleted) {
        console.log('Utente eliminato con successo:', email);
        // Rimuovo l'utente dalla lista dopo l'eliminazione
        const updatedUsers = allUsers.filter(user => user.email !== email);
        setAllUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Errore durante l\'eliminazione dell\'utente:', error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4 fw-bold text-success">Pagina Utenti</h1>
      {currentUser && (
        <div className="mb-4">
          <h2 className="mb-4">Informazioni singolo utente</h2>
          <UserCard user={currentUser} />
          {user.isAuthorized && (
            <>
              <h3 className='mb-3 mt-3'>Modifica Utente</h3>
              <div className="mb-3">
                <input type="text" className="form-control" name="nome" value={updateUserData.nome} onChange={handleInputChange} placeholder="Nome" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="cognome" value={updateUserData.cognome} onChange={handleInputChange} placeholder="Cognome" />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" name="email" value={updateUserData.email} onChange={handleInputChange} placeholder="Email" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" name="idRuolo" value={updateUserData.idRuolo} onChange={handleInputChange} placeholder="ID Ruolo" />
              </div>
              <button className="btn btn-primary" onClick={handleUpdateUser}>Aggiorna Utente</button>
              <h3 className='mb-3 mt-3'>Elimina Utente</h3>
              <div className="mb-3">
                <input type="text" className="form-control" value={deleteUserEmail} onChange={(e) => setDeleteUserEmail(e.target.value)} placeholder="La tua email per eliminarti" />
              </div>
              <button className="btn btn-danger" onClick={handleDeleteUser}>Elimina Utente</button>
            </>
          )}
        </div>
      )}
      {user && user.tipologia === 'Admin' && allUsers.length > 0 && (
        <>
          <div>
            <h2 className="mb-4">Lista Utenti</h2>
            <UserList userList={allUsers} />
          </div>
        </>
      )}
    </div>
  );
}
