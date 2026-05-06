import React from "react";
import "../../css/layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="layout-root">
      <nav className="mh-navbar">
        <div className="mh-navbar-inner">
          <div className="mh-logo">
            <span className="mh-logo-icon">⬡</span>
            <span className="mh-logo-text">manga<span className="mh-logo-accent">hub</span></span>
          </div>
          <div className="mh-nav-links">
            <span className="mh-nav-tag">読む</span>
          </div>
          <button className="mh-logout-btn" onClick={handleLogout}>
            <span>logout</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </nav>
      <main className="mh-main">{children}</main>
    </div>
  );
}
