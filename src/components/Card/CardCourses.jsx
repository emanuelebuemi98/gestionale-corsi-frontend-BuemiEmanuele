import { DeleteCourse } from "../Courses/DeleteCourse";
import styles from "./CardCourses.module.css";

export function CardCourses({ NomeCorso, DescrizioneBreve, DescrizioneCompleta, Durata, IdCategoria, CourseId, Token }) {
  return (
    <div className={`col-md-3 mb-4 ${styles.card}`}> 
      <div className={`card border-primary rounded-5 rounded-top-0 h-100 shadow-sm ${styles.cardHover}`}> 
        <div className="card-body">
          <h2 className="card-title text-center text-warning">{NomeCorso}</h2>
          <p className="card-text"><strong>Descrizione breve:</strong> {DescrizioneBreve}</p>
          <p className="card-text"><strong>Descrizione completa:</strong> {DescrizioneCompleta}</p>
          <p className="card-text"><strong>Durata:</strong> {Durata}</p>
          <p className="card-text"><strong>Categoria:</strong> {IdCategoria}</p>
          <DeleteCourse courseId={CourseId} token={Token} />
        </div>
      </div>
    </div>
  );
}