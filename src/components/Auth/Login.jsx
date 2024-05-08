import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/RESTService";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

export function Login() {
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });

    //Stato per mostrare o nascondere l'alert
    const [showAlert, setShowAlert] = useState(false); 

    //Hook per la gestione della cronologia dei percorsi
    const navigate = useNavigate();

    //Mi prendo la funzione setUser dal contesto dell'autenticazione
    const { setUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormLogin({...formLogin, [name]: value});
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.table(formLogin);
        
        try {
            await loginUser(formLogin, setUser);
            setShowAlert(true);
            //console.log("Login avvenuto con successo!");
            navigate('/home'); // Mi vado a reindirizzare alla pagina home dopo aver effettuato il login
        } catch (error) {
            console.error("Errore durante il login:", error.message);     
        }
    
        setFormLogin({
            email: "",
            password: ""
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4 fw-bold text-success">Login</h1>
                            {showAlert && (
                                <div className="alert alert-success" role="alert">
                                    Login avvenuto con successo!
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name="email" className="form-control" id="email" value={formLogin.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="password" value={formLogin.password} onChange={handleChange} required />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Accedi</button>
                                    <p className="text-center mt-2">
                                        Non sei ancora registrato? {" "}
                                        <NavLink to="/register" className="text-secondary">REGISTRATI</NavLink>
                                    </p>
                                    <p className="text-center mt-2">
                                        Torna alla pagina iniziale. {" "}
                                        <NavLink to="/" className="text-secondary">ACCESSO</NavLink>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}