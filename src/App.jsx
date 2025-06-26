import "./App.css";
import EnquireForm from "./pages/EnquireForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./pages/service";
import CreatePost from "./pages/CreatePost";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import VideoOptionsPage from "./pages/VideoOptionsPage";
function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Services />} />
        <Route path="/enquire/:serviceName" element={<EnquireForm />} /> */}

        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/" element={<CreatePost />} />

        <Route path="/photo-details" element={<PhotoDetailPage />} />
        <Route path="/video-details" element={<VideoOptionsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
