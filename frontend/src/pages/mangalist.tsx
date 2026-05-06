import { useEffect, useState } from "react";
import { getManga } from "../api/manga";
import "../../css/mangalist.css";

interface Manga {
  id: number | string;
  title: string;
  cover?: string;
  genre?: string;
  status?: string;
  chapters?: number;
  rating?: number;
}

export default function Mangalist() {
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getManga()
      .then((data) => {
        setMangas(Array.isArray(data) ? data : []);
      })
      .catch(() => setError("Failed to load manga list."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = mangas.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-root">
      {/* Header */}
      <div className="ml-header">
        <div>
          <h1 className="ml-title">Library</h1>
          <p className="ml-count">{mangas.length} titles available</p>
        </div>
        <div className="ml-search-wrap">
          <svg className="ml-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="ml-search"
            type="text"
            placeholder="Search manga…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="ml-state">
          <div className="ml-loader" />
          <span>Loading library…</span>
        </div>
      )}

      {error && (
        <div className="ml-error">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="ml-state">
          <span className="ml-empty-icon">⊘</span>
          <span>{search ? "No results found." : "No manga available."}</span>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="ml-grid">
          {filtered.map((manga, i) => (
            <div className="ml-card" key={manga.id} style={{ animationDelay: `${i * 40}ms` }}>
              <div className="ml-cover">
                {manga.cover ? (
                  <img src={manga.cover} alt={manga.title} />
                ) : (
                  <div className="ml-cover-placeholder">
                    <span>{manga.title?.charAt(0) ?? "?"}</span>
                  </div>
                )}
                {manga.status && (
                  <span className={`ml-status-badge ml-status-${manga.status.toLowerCase()}`}>
                    {manga.status}
                  </span>
                )}
              </div>
              <div className="ml-info">
                <h3 className="ml-manga-title">{manga.title}</h3>
                <div className="ml-meta">
                  {manga.genre && <span className="ml-genre">{manga.genre}</span>}
                  {manga.chapters != null && (
                    <span className="ml-chapters">{manga.chapters} ch</span>
                  )}
                </div>
                {manga.rating != null && (
                  <div className="ml-rating">
                    <span className="ml-star">★</span>
                    <span>{manga.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
