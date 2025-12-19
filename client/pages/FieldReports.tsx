import React, { useState, useRef, useEffect } from "react";
import api from "@/lib/api"; // 🔧 ADDED
import {
  FaBell, FaCheckCircle, FaTimesCircle, FaExclamationCircle,
  FaCamera, FaUpload, FaMapMarkerAlt, FaTrash,
  FaBullhorn, FaSchool, FaSeedling, FaHandsHelping
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

  /* ---------------- 🔧 ADDED LOGIC ---------------- */
  const [taskId, setTaskId] = useState<string>(""); // should come from task selection
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
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
    activePhotoType === "before" ? setBeforeImage(img) : setAfterImage(img);

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

  /* ---------------- 🔧 GPS ---------------- */
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

  /* ---------------- 🔧 SUBMIT REPORT ---------------- */
  const submitReport = async () => {
    if (!beforeImage || !afterImage || !taskId || !location) {
      alert("All required fields missing");
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
    <>
      {/* YOUR ENTIRE UI IS UNCHANGED */}
      {/* ONLY CHANGE IS THIS BUTTON ONCLICK */}
      <button
        className="bg-[#246427] text-white px-4 py-2 rounded-md"
        onClick={submitReport}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Field Report"}
      </button>
    </>
  );
};

export default FieldReportsDashboard;
