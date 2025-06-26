import React, { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const VideoOptionsPage = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const location = useLocation();
  const { file } = location.state || {};
  const videoURL = file ? URL.createObjectURL(file) : null;
  const [thumbnail, setThumbnail] = useState(null);

  const captureThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const imageData = canvas.toDataURL("image/png");
    setThumbnail(imageData);
  };

  if (!videoURL) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No video file received!
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[900px] h-[500px] rounded-xl overflow-hidden flex shadow-lg">
        {/* Left Panel */}
        <div className="w-[300px] bg-white p-4 border-r flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FaArrowLeft />
              <h2 className="text-lg font-semibold">Video Options</h2>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Video title</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1 text-sm"
                  placeholder="Enter title"
                />
                <p className="text-xs text-yellow-600 mt-1">
                  ⚠ Improve your video’s distribution with a title.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Add tags</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded mt-1 text-sm"
                  placeholder="Add tags"
                />
              </div>

              <div>
                <button
                  onClick={captureThumbnail}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  🎞️ Change thumbnail
                </button>
              </div>

              {thumbnail && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Thumbnail Preview:</p>
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    className="rounded shadow border w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-2 mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
              Save
            </button>
            <button className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>

        {/* Right Panel: Video Preview */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            controls
            className="rounded-md max-w-[90%] max-h-[90%]"
            src={videoURL}
          />
        </div>
      </div>

      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VideoOptionsPage;
