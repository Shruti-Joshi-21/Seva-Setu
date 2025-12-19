import { useRef, useEffect, useState } from "react";
import  api  from "../lib/api";
import { useNavigate } from "react-router-dom";

const RegisterFacePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream)
        ?.getTracks();
      tracks?.forEach((t) => t.stop());
    };
  }, []);

  const captureFace = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        setImageBlob(blob);
        setCaptured(true);
      }
    }, "image/jpeg");
  };

  const submitFace = async () => {
    if (!imageBlob) return;

    const formData = new FormData();
    formData.append("image", imageBlob);

    try {
      await api.post("/face/register", formData);
      alert("Face registered successfully");
      navigate("/dashboard");
    } catch {
      alert("Face registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F8E9]">
      <h1 className="text-2xl font-bold mb-4 text-[#246427]">
        Face Registration
      </h1>

      <video
        ref={videoRef}
        autoPlay
        className="w-80 h-60 rounded border object-cover"
      />

      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={captureFace}
        className="mt-4 px-6 py-2 bg-[#F8AC3B] text-white rounded"
      >
        Capture Face
      </button>

      <button
        onClick={submitFace}
        disabled={!captured}
        className="mt-3 px-6 py-2 bg-[#246427] text-white rounded disabled:opacity-50"
      >
        Submit Face
      </button>
    </div>
  );
};

export default RegisterFacePage;
