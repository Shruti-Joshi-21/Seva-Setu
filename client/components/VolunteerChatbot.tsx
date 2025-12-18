import React, { useState } from "react";

interface Message {
  sender: "bot" | "user";
  text: string;
}

const VolunteerChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi 👋 I’m your EcoField assistant. How can I help you today?",
    },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: input },
      {
        sender: "bot",
        text: "Thanks! I’ll help you with attendance, tasks, reports, or support.",
      },
    ]);

    setInput("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Collapsed Button */}
      {!open && (
        <div
          className="rounded-lg shadow-md p-4 w-56"
          style={{ backgroundColor: "#F1F8E9" }}
        >
          <p className="text-sm text-[#616161] mb-2">Need Help?</p>
          <button
            onClick={() => setOpen(true)}
            className="w-full py-2 rounded-md text-white font-medium"
            style={{ backgroundColor: "#F8AC3B" }}
          >
            Chat with Assistant
          </button>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 rounded-xl shadow-lg flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundColor: "#246427" }}
          >
            <span className="font-semibold">EcoField Assistant</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-3 overflow-y-auto space-y-2"
            style={{ backgroundColor: "#F1F8E9" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === "bot"
                    ? "self-start text-[#212121]"
                    : "self-end text-white"
                }`}
                style={{
                  backgroundColor:
                    msg.sender === "bot" ? "#FFFFFF" : "#246427",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-md border text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: "#81C784" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerChatbot;
