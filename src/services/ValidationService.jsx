export function validateNome(nome) {
    const regex = /^[a-zA-Z\s']{5,50}$/;
    return regex.test(nome);
}

export function validateCognome(cognome) {
    const regex = /^[a-zA-Z\s']{5,50}$/;
    return regex.test(cognome);
}

export function validateEmail(email) {
    const regex = /^[A-z0-9\.+_\-]+@[A-z0-9\._\-]+\.[A-z]{2,24}$/;
    return regex.test(email);
}

export function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
}