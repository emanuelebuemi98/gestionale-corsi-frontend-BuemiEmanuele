export function isAdmin(user) {
  // Controllo se l'utente ha il ruolo di amministratore
  return user && user.tipologia === 'Admin';
}