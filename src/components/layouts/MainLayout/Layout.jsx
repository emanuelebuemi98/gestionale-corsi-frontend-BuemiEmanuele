import { useOutlet } from "react-router-dom";
import { Footer } from "../../Footer/Fouter";
import { AuthNavbar } from "../../Navbar/AuthNavbar";
import { UnauthNavbar } from "../../Navbar/UnauthNavbar";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";


export function Layout() {
    const outlet = useOutlet();
    const { user } = useContext(AuthContext);

    return (
        <>
            {user.isAuthorized ? <AuthNavbar /> : <UnauthNavbar />}
            <div className="mt-4 mb-4">
                {outlet}
            </div>
            <Footer />
        </>
    )
}