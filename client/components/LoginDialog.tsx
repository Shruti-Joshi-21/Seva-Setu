import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  api  from "../lib/api";

const LoginDialog = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 1️⃣ Send OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      await api.post("/auth/send-otp", { email });
      setOtpSent(true);
      alert("OTP sent to your email");
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Verify OTP
  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", { email, otp });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      setOpen(false);

      if (res.data.user.role === "ADMIN") navigate("/admin-dashboard");
      else if (res.data.user.role === "LEADER") navigate("/teamlead-dashboard");
      else navigate("/volunteer-dashboard");

    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="w-full bg-[#246427] text-white py-3 rounded-lg font-semibold"
        onClick={() => setOpen(true)}
      >
        Login
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-[#246427]">
              Login via Email OTP
            </h2>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            {otpSent && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
              />
            )}

            <div className="flex justify-end gap-2">
              {!otpSent ? (
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="px-4 py-2 bg-[#F8AC3B] text-white rounded"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="px-4 py-2 bg-[#246427] text-white rounded"
                >
                  Verify OTP
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
