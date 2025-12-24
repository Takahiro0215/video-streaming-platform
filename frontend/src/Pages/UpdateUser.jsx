import { useState } from "react";
import { updatePassword } from "../Api/api";

export default function UpdateUser() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (!email) {
            setError("Erreur: email non trouvé.");
            return;
        }

        try {
            await updatePassword(email, currentPassword, newPassword, token);

            setSuccess("Mot de passe mis à jour !");
            setError("");

            setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                window.location.href = "/login";
            }, 1500);
        } catch (err) {
            const msg =
                err.response?.data?.error || "Erreur lors de la mise à jour.";
            setError(msg);
        }
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "400px", marginTop: "40px" }}
        >
            <h2 className="mb-4">Modifier le mot de passe</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Mot de passe actuel</label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nouveau mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-100">Modifier</button>
            </form>
        </div>
    );
}
