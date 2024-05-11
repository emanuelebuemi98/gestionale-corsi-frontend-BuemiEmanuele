import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext/AuthContext"

export function AuthNavbar() {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Rimuovo il token
        Cookies.remove('token');
        // Azzeraro lo stato dell'utente
        setUser({
            nome: "",
            cognome: "",
            email: "",
            tipologia: "",
            isAuthorized: false
        });
        // Redirect alla pagina di laccesso
        navigate("/");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" to="/">
                <div className="container-fluid">
                    <div className="navbar-brand text-warning">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.nome} {user.cognome}
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/home"
                                >Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/courses"
                                >Corsi
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/users"
                                >Utente
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    onClick={handleLogout}
                                >Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}