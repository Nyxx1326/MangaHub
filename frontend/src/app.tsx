import { useState } from "react";
import Login from "./pages/login";
import Mangalist from "./pages/mangalist";
import Chatbox from "./components/chatbox";
import Layout from "./components/layout";
import "./css/app.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState<"manga" | "chat">("manga");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout>
      <div className="app-tabs">
        <button
          className={`app-tab ${page === "manga" ? "app-tab-active" : ""}`}
          onClick={() => setPage("manga")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          Library
        </button>
        <button
          className={`app-tab ${page === "chat" ? "app-tab-active" : ""}`}
          onClick={() => setPage("chat")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Chat
        </button>
      </div>

      {page === "manga" && <Mangalist />}
      {page === "chat" && <Chatbox />}
    </Layout>
  );
}
