import React, { useState } from "react";
import {
  FaGlobeAmericas,
  FaRegImage,
  FaUserFriends,
  FaSmile,
  FaMapMarkerAlt,
  FaCommentDots,
  FaEdit,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const filtered = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    const mediaPreviews = filtered.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    setMediaFiles((prev) => [...prev, ...mediaPreviews]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (media) => {
    if (media.type === "image") {
      navigate("/photo-details", { state: { file: media.file } });
    } else if (media.type === "video") {
      navigate("/video-details", { state: { file: media.file } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2">
      <div className="w-full max-w-md h-[500px] bg-white rounded-xl shadow-xl border border-gray-300 overflow-hidden flex flex-col">
        {/* Header */}
        <h1 className="font-extrabold text-xl text-center pt-4">Create Post</h1>
        <div className="flex items-center justify-between px-4 pt-4 mb-2">
          <div className="flex items-center gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="font-semibold text-sm">Jaahid Hasan</h1>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <FaGlobeAmericas />
                <span>Public</span>
              </div>
            </div>
          </div>
          <BsThreeDots className="text-gray-500" />
        </div>

        {/* Body Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* Textarea */}
          <textarea
            rows="2"
            placeholder="What's on your mind, Jaahid?"
            className="w-full p-2 border-none focus:ring-0 resize-none text-sm text-gray-700"
          ></textarea>

          {/* Media Preview */}
          {mediaFiles.length > 0 && (
            <div className="relative mt-2 max-h-[200px] overflow-y-auto space-y-2">
              {mediaFiles.map((media, index) => (
                <div key={index} className="relative z-0">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(media)}
                    className="absolute top-2 left-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
                  >
                    <FaEdit className="text-gray-600 text-sm" />
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100 z-10"
                  >
                    ✕
                  </button>

                  {/* Media */}
                  {media.type === "image" ? (
                    <img
                      src={media.url}
                      alt={`Uploaded ${index}`}
                      className="rounded-lg w-full object-contain z-0"
                    />
                  ) : (
                    <video
                      controls
                      src={media.url}
                      className="rounded-lg w-full max-h-[200px] object-contain z-0"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add to your post section */}
          <div className="py-2 mt-4 mb-2 border border-black flex items-baseline justify-between rounded-lg">
            <p className="text-sm font-semibold text-gray-600 pl-2">
              Add to your post
            </p>
            <div className="flex gap-4 text-xl text-blue-500 pr-2">
              <label className="cursor-pointer text-blue-600 hover:underline">
                <FaRegImage />
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={handleMediaChange}
                />
              </label>
              <FaUserFriends />
              <FaSmile />
              <FaMapMarkerAlt />
              <FaCommentDots />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
