import { useState } from "react";
import { deleteAccount } from "../Api/api";

export default function DeleteUser() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!password) {
            setError("Veuillez entrer votre mot de passe.");
            return;
        }

        try {
            await deleteAccount(password, token);

            setSuccess("Compte supprimé avec succès.");
            setError("");

            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                window.location.href = "/";
            }, 1500);
        } catch (err) {
            const msg =
                err.response?.data?.error ||
                "Erreur lors de la suppression du compte.";
            setError(msg);
        }
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "400px", marginTop: "40px" }}
        >
            <h2 className="mb-4 text-danger">Supprimer le compte</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mot de passe actuel</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-danger w-100">
                    Supprimer le compte
                </button>
            </form>
        </div>
    );
}
