import { AuthContext } from "./AuthContext";
import { useState } from "react";
import Cookies from "js-cookie";

//componente che fornisce il contesto all'applicazione
export function AuthContextProvider({ children }) {

    // Ottiengo i valori dei cookie
    const nome = Cookies.get("nome");
    const cognome = Cookies.get("cognome");
    const email = Cookies.get("email");
    const isAuthorized = false;

    // Ottieni il ruolo dell'utente dall'array ruoli
    let tipologia = null;

    const userDataString = Cookies.get("userData");
    console.log("userDataString:", userDataString);

    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            // Verifica che userData.ruoli sia un array non vuoto
            if (Array.isArray(userData.ruoli) && userData.ruoli.length > 0) {
                // Se userData.ruoli[0].tipologia esiste, assegna il valore a tipologia
                if (userData.ruoli[0].tipologia) {
                    tipologia = userData.ruoli[0].tipologia;
                }
            }
        } catch (error) {
            console.error("Errore nel parsing dei dati utente:", error);
        }
    }

    // Definisci lo stato di partenza dell'utente
    const [user, setUser] = useState({
        nome,
        cognome,
        email,
        tipologia,
        isAuthorized
    });

    console.log("User from Cookies:", user);

    return (
        //sostituisce il valore del context di default
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}