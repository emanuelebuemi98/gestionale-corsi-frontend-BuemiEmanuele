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
    let tipologia = "";
    const userDataString = Cookies.get("userData");
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && userData.ruoli && userData.ruoli.length > 0) {
            tipologia = userData.ruoli[0].tipologia;
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

    return (
        //sostituisce il valore del context di default
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}