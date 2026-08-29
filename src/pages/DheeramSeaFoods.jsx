import { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import SectionHeading from "../components/SectionHeading";
import seafoodsHero from "../images/seafoods-hero.jpg";
import seafoodsMobileHero from "../images/seafoods-mobile-hero.png";
import "./DheeramSeaFoods.css";

const NAV_LINKS = [
  { label: "HOME", href: "/", isRoute: true },
  { label: "SEAFOODS", href: "#seafoods" },
  { label: "ABOUT", href: "#about-seafoods" },
  { label: "CONTACT", href: "#contact-seafoods" },
];

const SEAFOOD_CATEGORIES = [
  {
    id: "fish",
    name: "Fresh Fish",
    description:
      "A wide selection of fresh, sustainably sourced fish handled with care from catch to delivery.",
  },
  {
    id: "prawns",
    name: "Prawns & Shrimp",
    description:
      "Premium prawns and shrimp, carefully processed to preserve natural taste and quality.",
  },
  {
    id: "crabs-lobsters",
    name: "Crabs & Lobsters",
    description:
      "Rich, flavourful crabs and lobsters selected for exceptional quality and freshness.",
  },
  {
    id: "shellfish",
    name: "Shellfish & Mollusks",
    description:
      "Oysters, mussels, clams and scallops sourced for consistent freshness and taste.",
  },
];

const WHY_CHOOSE_US = [
  {
    id: "freshness",
    title: "Freshness Guaranteed",
    description:
      "Sourced and processed with care to preserve natural freshness and quality at every stage.",
  },
  {
    id: "trusted",
    title: "Trusted Sourcing",
    description:
      "Backed by the Dheeram Group's reputation for integrity, transparency and dependable supply.",
  },
  {
    id: "standards",
    title: "Export Standards",
    description:
      "Processing and handling that meet high standards of quality, hygiene and consistency.",
  },
  {
    id: "customer",
    title: "Customer-Focused Approach",
    description:
      "Your needs come first — honest guidance and support tailored to what matters to you.",
  },
];

function FishGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M8 32c8-14 28-18 40-10-4 4-4 16 0 20-12 8-32 4-40-10z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M8 32L2 24m6 8L2 40"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="34" cy="27" r="2" fill="currentColor" />
      <path
        d="M18 32c4-3 10-3 14 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaveGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M6 24c5-5 11-5 16 0s11 5 16 0 11-5 16 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M6 36c5-5 11-5 16 0s11 5 16 0 11-5 16 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M6 48c5-5 11-5 16 0s11 5 16 0 11-5 16 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M32 6l20 7v15c0 14-8.5 23.5-20 30-11.5-6.5-20-16-20-30V13z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M23 31l6.5 6.5L42 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M32 6l7.3 4.2 8.4.1 4.3 7.3 7.3 4.2-.1 8.4 4.2 7.3-7.3 4.2-4.2 7.3-8.4-.1-7.3 4.2-7.3-4.2-8.4.1-4.2-7.3L9 43.5l.1-8.4-4.2-7.3L9 23.6l4.2-7.3 8.4-.1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M23 32.5l6 6 12-13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandshakeGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M6 26l10-8 10 6 8-4 24 14-6 10-6-3-8 8-10-2-16-9z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M26 24l10 8-8 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const WHY_ICONS = {
  freshness: WaveGlyph,
  trusted: ShieldGlyph,
  standards: BadgeGlyph,
  customer: HandshakeGlyph,
};

function handleEnquirySubmit(e) {
  e.preventDefault();

  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = form.name.value;
  const phone = form.phone.value;
  const email = form.email.value;
  const productInterest = form.productInterest.value;
  const message = form.message.value;

  const text =
`*New Dheeram Sea Foods Enquiry*

👤 Name: ${name}

📱 Phone: ${phone}

📧 Email: ${email}

🐟 Seafood Interested In: ${productInterest}

💬 Message:
${message}`;

  const url = `https://wa.me/916380572193?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function scrollToEnquiryForm() {
  document
    .getElementById("sf-enquiry-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function DheeramSeaFoods() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dc-page">
      <Background />
      <BackButton />

      <nav className="dc-navbar">
        <Link to="/" className="dc-brand" onClick={closeMenu}>
          DHEERAM <span className="dc-brand-accent">SEA FOODS</span>
        </Link>

        <ul className="dc-nav-links dc-nav-links--desktop">
          {NAV_LINKS.map((link) =>
            link.isRoute ? (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ) : (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            )
          )}
        </ul>

        <a href="#contact-seafoods" className="dc-enquire-btn dc-enquire-btn--desktop">
          ENQUIRE NOW
        </a>

        <button
          type="button"
          className={`dc-hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`dc-mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
          <ul className="dc-mobile-nav-links">
            {NAV_LINKS.map((link) =>
              link.isRoute ? (
                <li key={link.label}>
                  <Link to={link.href} onClick={closeMenu}>
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
          <a href="#contact-seafoods" className="dc-enquire-btn" onClick={closeMenu}>
            ENQUIRE NOW
          </a>
        </div>
      </nav>

      <main className="dc-main">
        {/* HERO */}
        <section className="dc-hero">
          <picture>
            <source media="(max-width: 768px)" srcSet={seafoodsMobileHero} />
            <img
              src={seafoodsHero}
              alt="Dheeram Sea Foods"
              className="dc-hero-bg"
            />
          </picture>
          <div className="dc-hero-overlay" aria-hidden="true" />

          <div className="dc-hero-content">
            <motion.h1
              className="dc-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              DHEERAM<span className="dc-hero-title-gap">SEA FOODS</span>
            </motion.h1>

            <motion.h2
              className="dc-hero-headline"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              FRESH FROM THE OCEAN
            </motion.h2>

            <motion.p
              className="dc-hero-subtitle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Premium Seafood • Fresh Catch • Export Quality
            </motion.p>

            <motion.div
              className="dc-hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#seafoods" className="dc-cta dc-cta--primary">
                EXPLORE SEAFOODS
              </a>
              <a href="#contact-seafoods" className="dc-cta dc-cta--secondary">
                CONTACT US
              </a>
            </motion.div>
          </div>
        </section>

        {/* EXPLORE OUR SEAFOODS */}
        <section id="seafoods" className="dc-section dc-cars-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>EXPLORE OUR SEAFOODS</SectionHeading>
            <p className="dc-section-intro">
              A fresh selection spanning fish, prawns, crabs and shellfish —
              each handled with care to deliver freshness and quality.
            </p>
          </motion.div>

          <div className="dc-cars-grid">
            {SEAFOOD_CATEGORIES.map((item, i) => (
              <motion.div
                key={item.id}
                className="dc-car-card"
                {...fadeUp(0.1 + i * 0.1)}
                whileHover={{ y: -10 }}
              >
                <div className="dc-car-card-visual">
                  <FishGlyph />
                </div>
                <h3 className="dc-car-card-title">{item.name}</h3>
                <p className="dc-car-card-desc">{item.description}</p>
                <a href="#contact-seafoods" className="dc-car-card-cta">
                  Enquire Now &rarr;
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="dc-section dc-why-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>WHY CHOOSE US</SectionHeading>
          </motion.div>

          <div className="dc-why-grid">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = WHY_ICONS[item.id];
              return (
                <motion.div
                  key={item.id}
                  className="dc-why-card"
                  {...fadeUp(0.1 + i * 0.1)}
                  whileHover={{ y: -10 }}
                >
                  <div className="dc-why-icon">
                    <Icon />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CONTACT / ENQUIRY */}
        <section id="contact-seafoods" className="dc-section dc-contact-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>ENQUIRE NOW</SectionHeading>
            <p className="dc-section-intro">
              Tell us what you're looking for and our team will get back to
              you shortly.
            </p>
          </motion.div>

          <div className="dc-contact-grid">
            <motion.form
              id="sf-enquiry-form"
              className="dc-enquiry-form"
              onSubmit={handleEnquirySubmit}
              {...fadeUp(0.1)}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <select name="productInterest" defaultValue="" required>
                <option value="" disabled>
                  Seafood Interested In
                </option>
                {SEAFOOD_CATEGORIES.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
                <option value="Not Sure Yet">Not Sure Yet</option>
              </select>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
              <button type="submit" className="dc-cta dc-cta--primary">
                SUBMIT ENQUIRY
              </button>
            </motion.form>

            <motion.div className="dc-contact-info" {...fadeUp(0.2)}>
              <h3>DHEERAM SEA FOODS</h3>
              <p>A division of Dheeram Group of Companies</p>
              <p>MR. MANIKANDAN</p>
              <button
                type="button"
                onClick={scrollToEnquiryForm}
                className="dc-cta dc-cta--secondary dc-contact-whatsapp"
              >
                CHAT ON WHATSAPP
              </button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
