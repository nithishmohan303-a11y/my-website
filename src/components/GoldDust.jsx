import "./GoldDust.css";

export default function GoldDust() {
  return (
    <div className="gold-dust">
      {Array.from({ length: 120 }).map((_, i) => (
        <span
          key={i}
          className="dust"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}