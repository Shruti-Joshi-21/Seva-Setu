import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";

interface AttendanceDialogProps {
  open: boolean;
  onClose: () => void;
}

const AttendanceDialog: React.FC<AttendanceDialogProps> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  /* ================= CAMERA ================= */
  useEffect(() => {
    if (!open) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => setError("Camera access denied"));

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [open]);

  /* ================= LOCATION ================= */
  useEffect(() => {
    if (!open) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => setError("Location access denied"),
      { enableHighAccuracy: true }
    );
  }, [open]);

  /* ================= CAPTURE ================= */
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0);
    setImage(canvasRef.current.toDataURL("image/jpeg"));
  };

  /* ================= SUBMIT ================= */
  const submitAttendance = async () => {
    if (!image || !location) {
      alert("Selfie and location are required");
      return;
    }

    try {
      setLoading(true);

      // base64 → Blob
      const blob = await fetch(image).then((r) => r.blob());

      const formData = new FormData();
      formData.append("image", blob, "attendance.jpg");
      formData.append("latitude", String(location.lat));
      formData.append("longitude", String(location.lng));

      const res = await api.post("/attendance/mark", formData);

      // ✅ STORE TASK ID FOR FIELD REPORT
      if (res.data.status === "VALID" && res.data.taskId) {
        localStorage.setItem("lastTaskId", res.data.taskId);
      }

      alert("Attendance marked successfully");
      setImage(null);
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.reason || "Attendance failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={styles.heading}>Mark Attendance</h2>

        {error && <p style={styles.error}>{error}</p>}

        {!image ? (
          <>
            <video ref={videoRef} autoPlay playsInline style={styles.video} />
            <button style={styles.primaryBtn} onClick={captureImage}>
              Capture Selfie
            </button>
          </>
        ) : (
          <img src={image} alt="Selfie" style={styles.preview} />
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {location && (
          <p style={styles.location}>
            📍 Lat: {location.lat.toFixed(5)}, Lng:{" "}
            {location.lng.toFixed(5)}
          </p>
        )}

        <div style={styles.actions}>
          <button style={styles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            style={styles.primaryBtn}
            onClick={submitAttendance}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDialog;

/* ================= STYLES (UNCHANGED) ================= */
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    width: "360px",
    backgroundColor: "#F1F8E9",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  heading: {
    color: "#246427",
    marginBottom: "12px",
    textAlign: "center",
  },
  video: {
    width: "100%",
    borderRadius: "10px",
    border: "2px solid #81C784",
  },
  preview: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  location: {
    color: "#616161",
    fontSize: "14px",
    marginTop: "8px",
  },
  error: {
    color: "#F8AC3B",
    fontSize: "14px",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  primaryBtn: {
    backgroundColor: "#246427",
    color: "#FFFFFF",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#81C784",
    color: "#212121",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
