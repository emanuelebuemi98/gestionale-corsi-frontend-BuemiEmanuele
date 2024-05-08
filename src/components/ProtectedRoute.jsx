import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { useContext, useEffect } from "react";

export function ProtectedRoute({children}) {

    const  {user} = useContext(AuthContext);
    const navigateTo = useNavigate();

    useEffect( () => {
        //se non è autorizzato mi riporti alla pagina iniziale
        if(!user?.isAuthorized) {  // ?: optional chaining (rappresenta un concatenamento opzionale)
            navigateTo("/home");
        }
    }, [])

    return(
        <>{children}</>
    )
}

