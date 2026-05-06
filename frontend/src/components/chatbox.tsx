import { useState, useRef, useEffect } from "react";
import { authFetch } from "../api/client";
import "../../css/chatbox.css";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
}

const BASE_URL = "http://localhost:8080";

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Hey! Ask me anything about manga 📚", time: nowTime() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: Date.now(), role: "user", text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await authFetch(`${BASE_URL}/chat`, {
        method: "POST",
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("chat failed");

      const data = await res.json();
      const botMsg: Message = {
        id: Date.now() + 1,
        role: "bot",
        text: data.reply ?? data.message ?? "...",
        time: nowTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", text: "Something went wrong. Try again.", time: nowTime() },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="cb-root">
      <div className="cb-header">
        <div className="cb-header-dot" />
        <span className="cb-header-title">MangaBot</span>
        <span className="cb-header-sub">online</span>
      </div>

      <div className="cb-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`cb-msg cb-msg-${msg.role}`}>
            {msg.role === "bot" && <div className="cb-avatar">⬡</div>}
            <div className="cb-bubble-wrap">
              <div className="cb-bubble">{msg.text}</div>
              <span className="cb-time">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="cb-msg cb-msg-bot">
            <div className="cb-avatar">⬡</div>
            <div className="cb-bubble-wrap">
              <div className="cb-bubble cb-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="cb-input-row">
        <input
          ref={inputRef}
          className="cb-input"
          type="text"
          placeholder="Ask about manga…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />
        <button
          className="cb-send"
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
