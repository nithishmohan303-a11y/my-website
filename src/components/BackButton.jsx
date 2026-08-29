import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    // Normal flow: user arrived here from the homepage's Our Companies
    // section, so one history step back returns them there naturally.
    // Fallback only applies if the page was opened directly (no history),
    // e.g. a shared link — it does not run on normal site load.
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/#companies");
    }
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
      aria-label="Back to Our Companies"
    >
      <span className="back-button-arrow" aria-hidden="true">
        &larr;
      </span>
      BACK
    </button>
  );
}
