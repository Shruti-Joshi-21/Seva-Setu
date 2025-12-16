import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginDialogProps {
  role: string;
  buttonText: string;
  themeColor: string; // e.g. "#246427" or "#F8AC3B"
  route: string;
  validUsername: string;
  validPassword: string;
  backgroundColor?: string;
}

const LoginDialog = ({
  role,
  buttonText,
  themeColor,
  route,
  validUsername,
  validPassword,
  backgroundColor = "#FFFFFF",
}: LoginDialogProps) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === validUsername && password ===  validPassword) {
      setOpen(false);
      navigate(route);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <button
        className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        style={{ backgroundColor: themeColor }}
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="rounded-lg p-6 w-96 shadow-lg"
            style={{ backgroundColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: themeColor }}
            >
              {role} Login
            </h2>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mb-3 p-2 border rounded border-gray-300 focus:outline-none"
              style={{ outlineColor: themeColor }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 p-2 border rounded border-gray-300 focus:outline-none"
              style={{ outlineColor: themeColor }}
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 font-semibold rounded transition"
                style={{ color: themeColor }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 text-white rounded transition"
                style={{ backgroundColor: themeColor }}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginDialog;
