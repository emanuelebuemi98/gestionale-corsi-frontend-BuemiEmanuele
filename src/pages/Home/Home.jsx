import { CardCorsesHomePage } from "../../components/Card/CardCorsesHomePage";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useContext } from "react";

export function Home() {

    const cards = [
        {
            imgUrl: "https://images.unsplash.com/photo-1489389944381-3471b5b30f04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN2aWx1cHBvJTIwY29kaWNlfGVufDB8fDB8fHww",
            titolo: "Boolean",
            sottotitolo: "Corso per diventare uno sviluppatore Full Stack"
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhY3R8ZW58MHx8MHx8fDA%3D",
            titolo: "Udemy",
            sottotitolo: "Corso per diventare uno sviluppatore Front End"
        },
        {
            imgUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGphdmF8ZW58MHx8MHx8fDA%3D",
            titolo: "Epicode",
            sottotitolo: "Corso per diventare uno sviluppatore Back End"
        },
        {
            imgUrl: "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3liZXJzZWN1cm90eXxlbnwwfHwwfHx8MA%3D%3D",
            titolo: "Aulab",
            sottotitolo: "Corso per diventare un esperto di Cybersecurity"
        },
    ];


    const { user } = useContext(AuthContext)

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-12">
                        <h1 className="text-center mb-4 fw-bold text-success">
                            Benvenuto nella pagina Home Page di <br />
                            {user && user.nome} {user && user.cognome}
                        </h1>
                        <h5 className="text-center mb-4">Quale corso ti interessa?</h5>
                        <div className="row">
                            {cards.map((card, index) => (
                                //Faccio il rendering delle liste di card con map
                                //Utilizzando il componente CardCourses passo le props ad ogni iterazione dell'oggetto della mappa sull'array cards. 
                                <div className="col-md-3"  key={index}>
                                    <CardCorsesHomePage
                                        ImgURL={card.imgUrl}
                                        Titolo={card.titolo}
                                        Sottotitolo={card.sottotitolo}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}