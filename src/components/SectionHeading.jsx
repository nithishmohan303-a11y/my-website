function LuxuryEmblem({ delay = "0s" }) {
  return (
    <span
      className="section-emblem"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      <svg
        className="section-emblem-svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Solid #ffd700 — exact same color as .company-card h3 (DHEERAM MART) */}
        <path
          d="M12 2.2L20.4 9.2C20.7 9.45 20.75 9.9 20.5 10.2L12 21.8L3.5 10.2C3.25 9.9 3.3 9.45 3.6 9.2L12 2.2Z"
          fill="#ffd700"
        />
        <path d="M12 2.2L16.2 7.1L12 9L7.8 7.1Z" fill="#ffd700" />
        <path d="M12 2.2L7.8 7.1L3.6 9.2L8.4 9.6Z" fill="#ffd700" />
        <path d="M12 2.2L16.2 7.1L20.4 9.2L15.6 9.6Z" fill="#ffd700" />
        <path
          d="M3.6 9.2L8.4 9.6L12 9L15.6 9.6L20.4 9.2L15.8 13L12 12L8.2 13Z"
          fill="#ffd700"
        />
        <path d="M8.2 13L12 12L12 21.8L3.6 9.2Z" fill="#ffd700" />
        <path d="M15.8 13L20.4 9.2L12 21.8L12 12Z" fill="#ffd700" />
        <path d="M12 4.4L14 7L12 7.8L10 7Z" fill="#ffd700" />
      </svg>
    </span>
  );
}

export default function SectionHeading({ children, className = "" }) {
  return (
    <h2 className={`section-heading${className ? ` ${className}` : ""}`}>
      <span className="section-heading-label">
        <LuxuryEmblem delay="0s" />
        <span className="section-heading-text">{children}</span>
        <LuxuryEmblem delay="2.75s" />
      </span>
      <span className="section-heading-underline" aria-hidden="true">
        <span className="section-heading-underline-shine" />
      </span>
    </h2>
  );
}
