import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useLocation } from "react-router-dom";
import { FaCropAlt, FaUndoAlt, FaArrowLeft, FaTimes } from "react-icons/fa";

const PhotoDetailPage = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const location = useLocation();
  const { file } = location.state || {};
  const imageURL = file ? URL.createObjectURL(file) : null;

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  if (!imageURL) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No image file found!
        </p>
      </div>
    );
  }

  const getCroppedImg = async () => {
    const image = await createImage(imageURL);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const safeArea = Math.max(image.width, image.height) * 2;
    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      (safeArea - image.width) / 2,
      (safeArea - image.height) / 2
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.putImageData(data, -croppedAreaPixels.x, -croppedAreaPixels.y);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = url;
    });

  const handleCrop = async () => {
    const croppedImg = await getCroppedImg();
    setCroppedImage(croppedImg);
    setCropMode(false);
  };

  const handleRotate = () => {
    setRotation((prev) => prev + 90);
  };

  return (
    // Facebook-style popup modal
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      {/* Smaller popup card */}
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg flex h-[70vh] overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-[180px] border-r p-4 flex flex-col bg-white">
          <div className="flex items-center gap-2 mb-6">
            <FaArrowLeft />
            <h2 className="text-xl font-semibold">Photo Detail</h2>
          </div>

          <div
            className="flex items-center gap-3 py-2 hover:bg-gray-200 px-2 rounded cursor-pointer"
            onClick={() => setCropMode(true)}
          >
            <FaCropAlt />
            <span className="text-sm">Crop</span>
          </div>

          <div
            className="flex items-center gap-3 py-2 hover:bg-gray-200 px-2 rounded cursor-pointer"
            onClick={handleRotate}
          >
            <FaUndoAlt />
            <span className="text-sm">Rotate</span>
          </div>

          {/* Bottom Buttons */}
          <div className="mt-auto flex gap-2">
            <button className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
              onClick={cropMode ? handleCrop : undefined}
            >
              Save
            </button>
          </div>
        </div>

        {/* Right: Image Preview or Cropper */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          {!cropMode ? (
            <img
              src={croppedImage || imageURL}
              alt="Selected"
              className="max-h-[80%] max-w-[80%] object-contain rounded-md"
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          ) : (
            <div className="relative w-full h-full">
              <Cropper
                image={imageURL}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
        </div>

        {/* Close Button (optional) */}
        <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-xl">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
