import React, { useState } from "react";
import { createCourse } from "../../services/RESTService";

export function CreateCourseForm({ token }) {
    const [courseData, setCourseData] = useState({
        nomeCorso: "",
        descrizioneBreve: "",
        descrizioneCompleta: "",
        durata: "",
        idCategoria: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCourse = await createCourse(courseData, token);
            if (newCourse) {
                console.log("Nuovo corso creato:", newCourse);
                // Resetta il form dopo la creazione del corso
                setCourseData({
                    nomeCorso: "",
                    descrizioneBreve: "",
                    descrizioneCompleta: "",
                    durata: "",
                    idCategoria: "",
                });
            } else {
                console.error("Errore durante la creazione del corso: risposta vuota");
            }
        } catch (error) {
            console.error("Errore durante la creazione del corso:", error.message);
        }
    };

    return (
        <div className="container">
            <h2>Creazione Corso</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome Corso:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nomeCorso"
                        value={courseData.nomeCorso}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrizione Breve:</label>
                    <textarea
                        className="form-control"
                        name="descrizioneBreve"
                        value={courseData.descrizioneBreve}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrizione Completa:</label>
                    <textarea
                        className="form-control"
                        name="descrizioneCompleta"
                        value={courseData.descrizioneCompleta}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Durata:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="durata"
                        value={courseData.durata}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ID Categoria:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="idCategoria"
                        value={courseData.idCategoria}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crea Corso</button>
            </form>
        </div>
    );
}