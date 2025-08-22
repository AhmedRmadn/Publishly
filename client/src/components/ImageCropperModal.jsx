// components/ImageCropperModal.jsx
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage"; // utility to crop actual image
import { X } from "lucide-react";

export default function ImageCropperModal({
  imageSrc,
  aspect,
  onCancel,
  onComplete,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onComplete(croppedBlob); // pass blob here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-5xl h-[80vh] flex flex-col p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-black font-semibold">Adjust crop</h3>
          <button
            aria-label="Close cropper"
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-black transition-colors"
            onClick={onCancel}
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            restrictPosition
            showGrid
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full max-w-md">
            <span className="text-gray-700 text-sm">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-black"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-gray-300 text-black bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="px-5 py-2 rounded-lg bg-black hover:bg-gray-800 text-white font-medium shadow-lg transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
