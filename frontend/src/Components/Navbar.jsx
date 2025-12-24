import { Link } from "react-router-dom";

export default function Navbar() {
    const isLogged = !!localStorage.getItem("token");

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand fw-bold" to="/">
                    Streaming Site
                </Link>

                <ul className="navbar-nav d-flex flex-row">
                    {!isLogged ? (
                        <>
                            <li className="nav-item me-3">
                                <Link
                                    className="nav-link text-white"
                                    to="/login"
                                >
                                    Connexion
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className="nav-link text-white"
                                    to="/signup"
                                >
                                    Inscription
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item me-3">
                                <Link
                                    className="nav-link text-white"
                                    to="/videos"
                                >
                                    Vidéos
                                </Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link
                                    className="nav-link text-white"
                                    to="/addVideo"
                                >
                                    Ajouter une vidéo
                                </Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link
                                    className="nav-link text-white"
                                    to="/updateUser"
                                >
                                    Utilisateur
                                </Link>
                            </li>

                            <li className="nav-item me-3">
                                <Link
                                    className="nav-link text-white"
                                    to="/deleteUser"
                                >
                                    Supprimer le compte
                                </Link>
                            </li>

                            <li className="nav-item align-self-center">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("email");
                                        window.location.href = "/login";
                                    }}
                                >
                                    Déconnexion
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
