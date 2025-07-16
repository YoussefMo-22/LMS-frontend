import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import ButtonUI from "../../shared/components/UI/Button";

export default function VerifyCode() {
    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(30);
    const [message, setMessage] = useState("");
    const email = localStorage.getItem("resetEmail") || "";
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleResend = async () => {
        try {
            await axiosInstance.post("/users/forgotpassword", { email });
            setTimer(30);
            setMessage("Code resent to email.");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Resend failed");
        }
    };

    const handleContinue = () => {
        localStorage.setItem("resetCode", code);
        navigate("/reset-password");
    };

    return (
        <div className="w-full max-w-md mx-auto px-4">
            <h2>Enter Verification Code</h2>
            <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2 border"
            />
            <ButtonUI className="w-full mt-4" onClick={handleContinue}>
                Continue
            </ButtonUI>
            <p className="text-gray-500 mt-2">
                Didn’t receive the code?
                <button
                    disabled={timer > 0}
                    onClick={handleResend}
                    className="ml-2 text-blue-500 underline disabled:text-gray-400"
                >
                    Resend ({timer}s)
                </button>
            </p>
            {message && <p className="text-green-600 mt-2">{message}</p>}
        </div>
    );
}
