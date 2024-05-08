import React, { useState } from "react";
import { deleteCourse } from "../../services/RESTService";

export function DeleteCourse({ courseId, token }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const deleted = await deleteCourse(courseId, token);
            if (deleted) {
                console.log("Corso eliminato con successo.");
            } else {
                console.error("Errore durante l'eliminazione del corso: risposta vuota.");
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione del corso:", error.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <p>Eliminazione in corso...</p>
            ) : (
                <>
                    {error && <p>Errore: {error.message}</p>}
                    <button onClick={handleDelete} disabled={loading} className="btn btn-danger">Elimina Corso</button>
                </>
            )}
        </>
    );
}