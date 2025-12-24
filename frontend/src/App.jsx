import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Videos from "./Pages/Video";
import AddVideo from "./Pages/AddVideo";
import WatchVideo from "./Pages/WatchVideo";
import UpdateUser from "./Pages/UpdateUser";
import DeleteUser from "./Pages/DeleteUser";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<h2>Bienvenue</h2>} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/videos" element={<Videos />} />

                    <Route path="/watch/:id" element={<WatchVideo />} />

                    <Route path="/addVideo" element={<AddVideo />} />

                    <Route path="/updateUser" element={<UpdateUser />} />

                    <Route path="/deleteUser" element={<DeleteUser />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
