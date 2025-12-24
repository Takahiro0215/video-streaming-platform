import { useState } from "react";
import { addVideo } from "../Api/api";
import { useNavigate } from "react-router-dom";

export default function AddVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            await addVideo(title, description, url, token);

            navigate("/videos");
        } catch {
            setError("Erreur lors de l'ajout de la vidéo");
        }
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "500px", marginTop: "40px" }}
        >
            <h2 className="mb-4">Ajouter une vidéo</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Titre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">URL YouTube</label>
                    <input
                        type="text"
                        className="form-control"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>

                <button className="btn btn-success w-100">Ajouter</button>
            </form>
        </div>
    );
}
