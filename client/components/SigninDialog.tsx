import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

interface SignInDialogProps {
  open: boolean;
  onClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Volunteer");
  const [faceCaptured, setFaceCaptured] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ======================
     CAMERA START / STOP
  ====================== */
  useEffect(() => {
    if (!open) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(console.error);

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [open]);

  /* ======================
     CAPTURE FACE
  ====================== */
  const captureFace = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    setFaceCaptured(true);
  };

  /* SIGN IN */
  const handleSignUp = async () => {
  if (!faceCaptured || !canvasRef.current) return;

  setLoading(true);

  const blob = await new Promise<Blob>((resolve) =>
    canvasRef.current!.toBlob((b) => resolve(b!), "image/jpeg")
  );

  const formData = new FormData();
  formData.append("image", blob);
  formData.append("name", name);
  formData.append("email", email);

  let normalizedRole = "VOLUNTEER";
  if (role === "Administrator") normalizedRole = "ADMIN";
  else if (role === "Team Lead") normalizedRole = "LEADER";

  formData.append("role", normalizedRole);

  const res = await api.post("/auth/signup", formData);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  navigate(
    normalizedRole === "ADMIN"
      ? "/admin-dashboard"
      : normalizedRole === "LEADER"
      ? "/teamlead-dashboard"
      : "/volunteer-dashboard"
  );
};


  if (!open) return null;

  /* ======================
     UI (UNCHANGED)
  ====================== */
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-lg rounded-2xl p-6 shadow-xl bg-[#F1F8E9]">
        <h2 className="text-2xl font-bold text-[#246427] mb-4">
          Sign In to SevaSetu
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
          >
            <option>Volunteer</option>
            <option>Team Lead</option>
            <option>Administrator</option>
          </select>
        </div>

        <div className="mt-5">
          <div className="relative rounded-lg overflow-hidden border">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-56 object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <button
            onClick={captureFace}
            className={`w-full mt-3 py-2 rounded-lg font-semibold text-white ${
              faceCaptured ? "bg-[#81C784]" : "bg-[#F8AC3B]"
            }`}
          >
            {faceCaptured ? "Face Captured ✔" : "Capture Face"}
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="text-[#616161] hover:underline">
            Cancel
          </button>
          <button
            disabled={!faceCaptured || loading}
            onClick={handleSignUp}
            className="px-6 py-2 rounded-lg text-white font-semibold bg-[#246427]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInDialog;
