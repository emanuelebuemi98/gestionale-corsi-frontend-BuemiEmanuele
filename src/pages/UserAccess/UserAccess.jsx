import { NavLink } from "react-router-dom";

export function UserAccess() {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center mb-4 fw-bold text-success">Benvenuto nella pagina di Accesso</h1>
                            <h5 className="text-center mb-4">Effettua l'accesso o registrati per iniziare.</h5>
                            <div className="d-grid gap-2">
                                <NavLink to="/login" className="btn btn-primary">Accedi</NavLink>
                                <NavLink to="/register" className="btn btn-secondary">Registrati</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}