import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export interface LoginDialogProps {
  role: string;
  buttonText: string;
  themeColor: string;
  backgroundColor: string;
  route: string; // still passed but NOT used directly
}

const LoginDialog = ({
  role,
  buttonText,
  themeColor,
  backgroundColor,
}: LoginDialogProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ======================
     SEND OTP
  ====================== */
  const sendOtp = async () => {
    if (!email) return alert("Enter email");

    try {
      setLoading(true);
      await api.post("/auth/send-otp", { email });
      setOtpSent(true);
      alert("OTP sent");
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     VERIFY OTP + ROLE REDIRECT
  ====================== */
  const verifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-otp", { email, otp });

      const userRole = res.data.user.role; // ADMIN | LEADER | VOLUNTEER

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("email", email);

      setOpen(false);

      // 🔁 ROLE BASED REDIRECT
      if (userRole === "ADMIN") navigate("/admin-dashboard");
      else if (userRole === "LEADER") navigate("/teamlead-dashboard");
      else navigate("/volunteer-dashboard");

    } catch {
      alert("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SAME BUTTON */}
      <button
        className="w-full text-white py-3 rounded-lg font-semibold"
        style={{ backgroundColor: themeColor }}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 w-96"
            style={{ backgroundColor }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: themeColor }}>
              {role} Login
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            {otpSent && (
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
            )}

            <div className="flex justify-end gap-2">
              {!otpSent ? (
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="px-4 py-2 text-white rounded"
                  style={{ backgroundColor: themeColor }}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="px-4 py-2 text-white rounded"
                  style={{ backgroundColor: themeColor }}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDialog;
