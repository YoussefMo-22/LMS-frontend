import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify2FA, generate2FA } from "./hooks/authAPI";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchQRCode = async () => {
      if (!token) return;
      const qr = await generate2FA(token);
      if (qr) {
        setQrCode(qr); // base64 string with data:image/png;base64,...
      } else {
        toast.error("Failed to generate QR code");
      }
    };

    fetchQRCode();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await verify2FA(userId, token!, code);

    if (result) {
      toast.success("2FA token is valid");
      navigate("/home");
    } else {
      toast.error("Invalid verification code");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-6 px-4">
      <h2 className="text-2xl font-semibold text-primary-500">Verify Your Account</h2>

      {qrCode && (
        <img src={qrCode} alt="QR Code" className="w-52 h-52 rounded-lg border" />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter the 6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !code}
          className="bg-primary-400 text-white px-6 py-2 rounded hover:bg-primary-500 transition-all"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
