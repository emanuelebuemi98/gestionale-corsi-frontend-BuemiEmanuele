import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAllCourses } from "../../services/RESTService";
import { CardCourses } from "../Card/CardCourses";

export function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = Cookies.get("token");
        console.log("Token JWT recuperato dai cookie:", token);
        getAllCourses(token)
            .then(courses => setCourses(courses))
            .catch(error => console.error("Errore nella gestione dei corsi:", error));
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mb-4 fw-bold text-success">Lista dei Corsi</h1>
            {courses && courses.length > 0 ? (
                <div className="row">
                    {
                        courses.map((course, index) => (
                            <CardCourses
                                key={index}
                                NomeCorso={course.nomeCorso}
                                DescrizioneBreve={course.descrizioneBreve}
                                DescrizioneCompleta={course.descrizioneCompleta}
                                Durata={course.durata}
                                IdCategoria={course.idCategoria}
                            />
                        ))
                    }
                </div>
            ) : (
                <p> Nessun corso disponibile</p>
            )}
        </div>
    )
}