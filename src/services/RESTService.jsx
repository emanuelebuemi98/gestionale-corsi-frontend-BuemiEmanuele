import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export async function registerUser(user) {
    try {
        const jsonBody = JSON.stringify(user);

        const response = await fetch("http://localhost:8080/api/utente/reg", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        });

        console.log(response)

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Registrazione Fallita: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la registrazione: ${error.message}`);
    }

}

export async function loginUser(credentials, setUser) {
    try {
        const jsonBody = JSON.stringify(credentials);

        const response = await fetch("http://localhost:8080/api/utente/login", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        });

        if (response.ok) {
            const userData = await response.json();

            const JWTtoken = userData.token;
            // Salvo il token JWT nei cookie
            Cookies.set('token', JWTtoken, { expires: 7 });

            // Decodifico il token JWT per ottenere le informazioni dell'utente
            const decodedToken = jwtDecode(JWTtoken);

            setUser({
                nome: decodedToken.nome,
                cognome: decodedToken.cognome,
                email: decodedToken.email,
                tipologia: decodedToken && decodedToken.ruoli && decodedToken.ruoli.length > 0 ? "Admin" : "default",
                isAuthorized: true,
                token: JWTtoken
            });

            return userData;
        } else {
            throw new Error(`Login fallito: credenziali errate`);
        }
    } catch (error) {
        throw new Error(`Errore durante il login: ${error.message}`);
    }
}

export async function getUserByEmail(email, token) {
    try {
        const response = await fetch(`http://localhost:8080/api/utente/showuser?email=${email}`, {
            mode: 'cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            throw new Error(`Errore durante il recupero delle informazioni dell'utente: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta delle informazioni dell'utente: ${error.message}`);
    }
}


export async function getAllUsers(token) {
    try {
        const response = await fetch('http://localhost:8080/api/utente/all', {
            mode: 'cors',
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const usersData = await response.json();
            const formattedUsers = usersData.map((user) => ({
                nome: user.nome,
                cognome: user.cognome,
                email: user.email,
                tipologia: user.ruoli.length > 0 ? user.ruoli.map((ruolo) => ruolo.tipologia).join(", ") : "",
            }));
            return formattedUsers;
        } else {
            throw new Error(`Errore durante il recupero della lista degli utenti: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta della lista degli utenti: ${error.message}`);
    }
}

export async function updateUser(userData, token) {

    const jsonBody = JSON.stringify(userData);

    try {
        const response = await fetch('http://localhost:8080/api/utente/update', {
            mode: 'cors',
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: jsonBody
        });

        if (response.ok) {
            const updatedUserData = await response.json();
            return updatedUserData;
        } else {
            throw new Error(`Errore durante la modifica dell'utente: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta di modifica dell'utente: ${error.message}`);
    }
}

export async function deleteUser(email, token) {
    try {
        const response = await fetch(`http://localhost:8080/api/utente/delete/${email}`, {
            mode: 'cors',
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) {
            return true; // vado a ritormi true se la cancellazione è avvenuta con successo
        } else {
            throw new Error(`Errore durante l'eliminazione dell'utente: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta di eliminazione dell'utente: ${error.message}`);
    }
}

export async function getAllCourses(token) {
    try {
        const response = await fetch('http://localhost:8080/api/corso/corsi', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const coursesData = await response.json();
            return coursesData;
        } else {
            throw new Error(`Errore durante il recupero della lista dei corsi: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta della lista dei corsi: ${error.message}`);
    }
}

export async function createCourse(courseData, token) {
    try {
        const response = await fetch('http://localhost:8080/api/corso/create', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(courseData),
        });

        if (response.ok) {
            const newCourseData = await response.json();
            return newCourseData;
        } else {
            throw new Error(`Errore durante la creazione del corso: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta di creazione del corso: ${error.message}`);
    }
}

export async function updateCourse(courseData, token) {
    try {
        const response = await fetch('http://localhost:8080/api/corso/update', {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(courseData),
        });

        if (response.ok) {
            const updatedCourseData = await response.json();
            return updatedCourseData;
        } else {
            throw new Error(`Errore durante l'aggiornamento del corso: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta di aggiornamento del corso: ${error.message}`);
    }
}

export async function deleteCourse(courseId, token) {
    try {
        const response = await fetch(`http://localhost:8080/api/corso/delete/${courseId}`, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return true; 
        } else {
            throw new Error(`Errore durante l'eliminazione del corso: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`Errore durante la richiesta di eliminazione del corso: ${error.message}`);
    }
}