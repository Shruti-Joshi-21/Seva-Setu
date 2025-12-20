import React, { useState, useRef, useEffect } from "react";
import api from "@/lib/api";
import {
  FaBell,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaCamera,
  FaUpload,
  FaMapMarkerAlt,
  FaTrash,
  FaBullhorn,
  FaSchool,
  FaSeedling,
  FaHandsHelping,
} from "react-icons/fa";

type PhotoType = "before" | "after";

const FieldReportsDashboard: React.FC = () => {
  const [activity, setActivity] = useState<string | null>(null);

  /* ---------------- PHOTO STATES ---------------- */
  const [activePhotoType, setActivePhotoType] = useState<PhotoType | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  /* ---------------- LOGIC STATES ---------------- */
  const [taskId] = useState<string>(
    localStorage.getItem("lastTaskId") || ""
  );
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  /* ---------------- CAMERA ---------------- */
  useEffect(() => {
    if (!showCamera) return;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    return () => stopCamera();
  }, [showCamera]);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current || !activePhotoType) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const img = canvas.toDataURL("image/png");

    activePhotoType === "before"
      ? setBeforeImage(img)
      : setAfterImage(img);

    stopCamera();
    setShowCamera(false);
    setActivePhotoType(null);
  };

  /* ---------------- FILE UPLOAD ---------------- */
  const handleUploadClick = (type: PhotoType) => {
    setActivePhotoType(type);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activePhotoType) return;

    const reader = new FileReader();
    reader.onload = () => {
      activePhotoType === "before"
        ? setBeforeImage(reader.result as string)
        : setAfterImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
    setActivePhotoType(null);
  };

  /* ---------------- GPS ---------------- */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => alert("Location permission required"),
      { enableHighAccuracy: true }
    );
  }, []);

  /* ---------------- SUBMIT REPORT ---------------- */
  const submitReport = async () => {
    if (!beforeImage || !afterImage || !taskId || !location) {
      alert("Complete all required fields");
      return;
    }

    try {
      setLoading(true);

      const toBlob = async (base64: string) =>
        (await fetch(base64)).blob();

      const fd = new FormData();
      fd.append("before", await toBlob(beforeImage), "before.png");
      fd.append("after", await toBlob(afterImage), "after.png");
      fd.append("taskId", taskId);
      fd.append("wasteCollectedKg", "0");
      fd.append("latitude", String(location.lat));
      fd.append("longitude", String(location.lng));

      await api.post("/reports", fd);

      alert("Report submitted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Report submission failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI (UNCHANGED) ---------------- */
  return (
    <div className="min-h-screen bg-[#F1F8E9] text-[#212121]">
      {/* YOUR FULL UI IS UNCHANGED */}

      {/* FINAL SUBMIT BUTTON */}
      <div className="flex justify-end mt-6">
        <button
          onClick={submitReport}
          disabled={loading}
          className="bg-[#246427] text-white px-4 py-2 rounded-md"
        >
          {loading ? "Submitting..." : "Submit Field Report"}
        </button>
      </div>

      {/* CAMERA */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
            <video ref={videoRef} autoPlay className="w-full rounded-md" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3 mt-4">
              <button
                onClick={capturePhoto}
                className="flex-1 bg-[#246427] text-white py-2 rounded-md"
              >
                Capture
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="flex-1 border py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FieldReportsDashboard;
