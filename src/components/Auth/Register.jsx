import { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerUser } from "../../services/RESTService";
import { validateNome, validateCognome, validateEmail, validatePassword } from "../../services/ValidationService";

export function Register() {

    const [formRegister, setFormRegister] = useState({
        nome: "",
        cognome: "",
        email: "",
        password: ""
    });

    const [formErr, setFormErr] = useState({
        nome: "",
        cognome: "",
        email: "",
        password: ""
    });

    // Stato per mostrare o nascondere l'alert
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormRegister({ ...formRegister, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table(formRegister);

        const { nome, cognome, email, password } = formRegister;

        const newFormErr = {
            nome: validateNome(nome) ? "" : "Nome non valido - Lunghezza minima 5",
            cognome: validateCognome(cognome) ? "" : "Cognome non valido - Lunghezza minima 5",
            email: validateEmail(email) ? "" : "Email non valida",
            password: validatePassword(password) ? "" : "Password non valida - Deve contenere almeno un numero, un carattere maiuscolo e un carattere speciale",
        }

        setFormErr(newFormErr);

        //tramite questo ciclo if verifico che i valori inseriti dall'utente siano valiti
        if (Object.values(newFormErr).every(err => err == "")) {
            await registerUser(formRegister);
            setShowAlert(true);
            //console.log("Registrazione avvenuta con successo!");
        } else {
            console.error("Errore durante la registrazione: campi non validi");
        }

        //NOTA potevo fare il controllo opposto e verificare il caso in cui esista almeno un carattere non valido
        /*if (Object.values(newFormErr).some(err => err !== "")) {
            console.error("Errore durante la registrazione: campi non validi");
            return;
        }*/

        setFormRegister({
            nome: "",
            cognome: "",
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
                            <h1 className="text-center mb-4 fw-bold text-success">Registrazione</h1>
                            {showAlert && (
                                <div className="alert alert-success" role="alert">
                                    Registrazione effettuata con successo!
                                    Puoi andare alla pagina di Login
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 row">
                                    <label htmlFor="nome" className="col-sm-3 col-form-label">Nome</label>
                                    <div className="col-sm-9">
                                        <input type="text" className={`form-control ${formErr.nome ? 'is-invalid' : ''}`} id="nome" name="nome" value={formRegister.nome} onChange={handleChange} required />
                                        {formErr.nome && <div className="invalid-feedback">{formErr.nome}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="cognome" className="col-sm-3 col-form-label">Cognome</label>
                                    <div className="col-sm-9">
                                        <input type="text" className={`form-control ${formErr.cognome ? 'is-invalid' : ''}`} id="cognome" name="cognome" value={formRegister.cognome} onChange={handleChange} required />
                                        {formErr.cognome && <div className="invalid-feedback">{formErr.cognome}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                        <input type="email" className={`form-control ${formErr.email ? 'is-invalid' : ''}`} id="email" name="email" value={formRegister.email} onChange={handleChange} required />
                                        {formErr.email && <div className="invalid-feedback">{formErr.email}</div>}
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                                    <div className="col-sm-9">
                                        <input type="password" className={`form-control ${formErr.password ? 'is-invalid' : ''}`} id="password" name="password" value={formRegister.password} onChange={handleChange} required />
                                        {formErr.password && <div className="invalid-feedback">{formErr.password}</div>}
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Registrati</button>
                                    <p className="text-center mt-2">
                                        Effettua l'accesso! {" "}
                                        <NavLink to="/login" className="text-secondary">LOGIN</NavLink>
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