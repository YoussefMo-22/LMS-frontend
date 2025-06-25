import { useState, useEffect, useRef } from "react";
import profile from "../../../assets/profile.png";
import send from "../../../assets/send.svg";

type Message = {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
};

export default function LiveChat() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "Youssef", text: "Hello everyone 👋", timestamp: "10:00 AM" },
        { id: 2, sender: "Mariam", text: "Ready to learn React!", timestamp: "10:01 AM" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (!newMessage.trim()) return;
        const now = new Date();
        const newMsg: Message = {
            id: messages.length + 1,
            sender: "You",
            text: newMessage,
            timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMsg]);
        setNewMessage("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 h-[500px] flex flex-col">
            <div className="p-4 border-b font-semibold text-lg text-primary-600">Live Chat</div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className="text-sm flex items-center gap-3">
                        <img src={profile} className="w-8 h-8 rounded-full" alt="" />
                        <div>
                            <span className="font-semibold text-primary-600">{msg.sender}</span>
                            <div className="p-3 bg-primary-200 rounded-xl">{msg.text}</div>

                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t flex gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-primary-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-primary-600 transition"
                >
                    <img src={send} alt="" />
                </button>
            </div>
        </div>
    );
}
