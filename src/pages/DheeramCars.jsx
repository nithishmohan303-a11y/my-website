import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";
import SectionHeading from "../components/SectionHeading";
import bmwHero from "../images/bmw-hero.jpg";
import "./DheeramCars.css";

const NAV_LINKS = [
  { label: "HOME", href: "/", isRoute: true },
  { label: "CARS", href: "#cars" },
  { label: "ABOUT", href: "#about-cars" },
  { label: "CONTACT", href: "#contact-cars" },
];

const CAR_CATEGORIES = [
  {
    id: "sedans",
    name: "Luxury Sedans",
    description:
      "Refined, comfortable and effortlessly elegant — built for those who value a smooth, distinguished drive.",
  },
  {
    id: "suvs",
    name: "Premium SUVs",
    description:
      "Commanding presence with spacious luxury, engineered for confidence on every kind of journey.",
  },
  {
    id: "coupes",
    name: "Sports Coupes",
    description:
      "Sharp lines and thrilling performance for drivers who want luxury with an edge.",
  },
  {
    id: "executive",
    name: "Executive Vehicles",
    description:
      "Understated sophistication for business and executive travel, prioritising comfort and reliability.",
  },
];

const WHY_CHOOSE_US = [
  {
    id: "selection",
    title: "Premium Selection",
    description:
      "A carefully curated range of vehicles chosen for quality, performance and lasting value.",
  },
  {
    id: "trusted",
    title: "Trusted Service",
    description:
      "Backed by the Dheeram Group's reputation for integrity, transparency and dependable service.",
  },
  {
    id: "experience",
    title: "Professional Experience",
    description:
      "A knowledgeable team guiding you through every step, from enquiry to ownership.",
  },
  {
    id: "customer",
    title: "Customer-Focused Approach",
    description:
      "Your needs come first — honest guidance and support tailored to what matters to you.",
  },
];

function CarGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M8 38l4.5-13.5A6 6 0 0 1 18.2 20h27.6a6 6 0 0 1 5.7 4.5L56 38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4"
        y="38"
        width="56"
        height="14"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="17" cy="52" r="5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="47" cy="52" r="5" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 30h40"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
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

function SteeringGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M32 8v18M13 44l14-8M51 44l-14-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
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
  selection: BadgeGlyph,
  trusted: ShieldGlyph,
  experience: SteeringGlyph,
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
  const carInterest = form.carInterest.value;
  const message = form.message.value;

  const text =
`*New Dheeram Cars Enquiry*

👤 Name: ${name}

📱 Phone: ${phone}

📧 Email: ${email}

🚗 Car Interested In: ${carInterest}

💬 Message:
${message}`;

  const url = `https://wa.me/919500303336?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function scrollToEnquiryForm() {
  document
    .getElementById("dc-enquiry-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function DheeramCars() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      navigate(location.pathname, { replace: true });
    }
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dc-page">
      <Background />

      <nav className="dc-navbar">
        <Link to="/" className="dc-brand" onClick={closeMenu}>
          DHEERAM <span className="dc-brand-accent">CARS</span>
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

        <a href="#contact-cars" className="dc-enquire-btn dc-enquire-btn--desktop">
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
          <a href="#contact-cars" className="dc-enquire-btn" onClick={closeMenu}>
            ENQUIRE NOW
          </a>
        </div>
      </nav>

      <main className="dc-main">
        {/* HERO */}
        <section className="dc-hero">
          <img
            src={bmwHero}
            alt="BMW — Dheeram Cars"
            className="dc-hero-bg"
          />
          <div className="dc-hero-overlay" aria-hidden="true" />

          <div className="dc-hero-content">
            <motion.h1
              className="dc-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              DHEERAM CARS
            </motion.h1>

            <motion.h2
              className="dc-hero-headline"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              DRIVE THE EXTRAORDINARY
            </motion.h2>

            <motion.p
              className="dc-hero-subtitle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Premium Cars • Trusted Service • Excellence
            </motion.p>

            <motion.div
              className="dc-hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#cars" className="dc-cta dc-cta--primary">
                EXPLORE CARS
              </a>
              <a href="#contact-cars" className="dc-cta dc-cta--secondary">
                CONTACT US
              </a>
            </motion.div>
          </div>
        </section>

        {/* EXPLORE OUR CARS */}
        <section id="cars" className="dc-section dc-cars-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>EXPLORE OUR CARS</SectionHeading>
            <p className="dc-section-intro">
              A refined lineup spanning sedans, SUVs, coupes and executive
              vehicles — each selected to deliver comfort, performance and
              lasting quality.
            </p>
          </motion.div>

          <div className="dc-cars-grid">
            {CAR_CATEGORIES.map((car, i) => (
              <motion.div
                key={car.id}
                className="dc-car-card"
                {...fadeUp(0.1 + i * 0.1)}
                whileHover={{ y: -10 }}
              >
                <div className="dc-car-card-visual">
                  <CarGlyph />
                </div>
                <h3 className="dc-car-card-title">{car.name}</h3>
                <p className="dc-car-card-desc">{car.description}</p>
                <a href="#contact-cars" className="dc-car-card-cta">
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
        <section id="contact-cars" className="dc-section dc-contact-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>ENQUIRE NOW</SectionHeading>
            <p className="dc-section-intro">
              Tell us what you're looking for and our team will get back to
              you shortly.
            </p>
          </motion.div>

          <div className="dc-contact-grid">
            <motion.form
              id="dc-enquiry-form"
              className="dc-enquiry-form"
              onSubmit={handleEnquirySubmit}
              {...fadeUp(0.1)}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <select name="carInterest" defaultValue="" required>
                <option value="" disabled>
                  Car Interested In
                </option>
                {CAR_CATEGORIES.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name}
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
              <h3>DHEERAM CARS</h3>
              <p>A division of Dheeram Group of Companies</p>
              <p>MR. RANJITHKUMAR</p>
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
