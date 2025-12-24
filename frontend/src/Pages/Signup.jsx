import { useState } from "react";
import { signupUser } from "../Api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            await signupUser(email, password);

            navigate("/login");
        } catch {
            setError("Erreur lors de l'inscription");
        }
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "400px", marginTop: "50px" }}
        >
            <h2 className="mb-4">Inscription</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-success w-100">S'inscrire</button>
            </form>
        </div>
    );
}
