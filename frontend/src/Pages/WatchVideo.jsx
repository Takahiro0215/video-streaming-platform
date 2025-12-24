import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideos } from "../Api/api";

export default function WatchVideo() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const load = async () => {
            const response = await getVideos();
            const found = response.data.find((v) => v._id === id);
            setVideo(found);
        };

        load();
    }, [id]);

    if (!video) return <p>Chargement...</p>;

    const convertToEmbed = (url) => {
        const regExp =
            /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+?v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (!match || match[1].length !== 11) return null;

        const videoId = match[1];

        const startMatch = url.match(/t=(\d+)s?/);

        if (startMatch) {
            return `https://www.youtube.com/embed/${videoId}?start=${startMatch[1]}`;
        }

        return `https://www.youtube.com/embed/${videoId}`;
    };

    const embedUrl = convertToEmbed(video.url);

    return (
        <div className="container mt-4">
            <h2>{video.title}</h2>
            <p>{video.description}</p>

            <div className="ratio ratio-16x9 mb-3">
                <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
