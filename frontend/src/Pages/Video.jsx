import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos, deleteVideo } from "../Api/api";

export default function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const response = await getVideos();
            setVideos(response.data);
        } catch (err) {
            console.log("Erreur chargement vidéos :", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredVideos = videos.filter(
        (v) =>
            v.title.toLowerCase().includes(search.toLowerCase()) ||
            v.description.toLowerCase().includes(search.toLowerCase())
    );

    let sortedVideos = [...filteredVideos];
    if (sort === "az") {
        sortedVideos.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "za") {
        sortedVideos.sort((a, b) => b.title.localeCompare(a.title));
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Mes vidéos</h2>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <input
                    type="text"
                    className="form-control me-3"
                    style={{ maxWidth: "500px" }}
                    placeholder="Rechercher une vidéo..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select"
                    style={{ maxWidth: "200px" }}
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Trier…</option>
                    <option value="az">Titre (A–Z)</option>
                    <option value="za">Titre (Z–A)</option>
                </select>
            </div>

            {loading ? (
                <p>Chargement des vidéos...</p>
            ) : (
                <div className="row">
                    {sortedVideos.map((v) => (
                        <div className="col-md-4 mb-3" key={v._id}>
                            <div className="card p-3 h-100 d-flex flex-column">
                                <h5>{v.title}</h5>
                                <p className="flex-grow-1">{v.description}</p>

                                <Link
                                    to={`/watch/${v._id}`}
                                    className="btn btn-primary w-100 mb-2"
                                >
                                    Regarder
                                </Link>

                                <button
                                    className="btn btn-danger w-100"
                                    onClick={async () => {
                                        const token =
                                            localStorage.getItem("token");

                                        if (
                                            window.confirm(
                                                "Supprimer cette vidéo ?"
                                            )
                                        ) {
                                            try {
                                                await deleteVideo(v._id, token);
                                                await loadVideos();
                                            } catch (err) {
                                                console.log(
                                                    "Erreur suppression vidéo :",
                                                    err.response?.data ||
                                                        err.message
                                                );
                                            }
                                        }
                                    }}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
