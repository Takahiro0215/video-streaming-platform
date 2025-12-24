import { useState } from "react";
import { loginUser } from "../Api/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email);
            window.location.href = "/videos";
        } catch {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div
            className="container"
            style={{ maxWidth: "400px", marginTop: "50px" }}
        >
            <h2 className="mb-4">Connexion</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
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

                <button className="btn btn-primary w-100">Se connecter</button>
            </form>
        </div>
    );
}
