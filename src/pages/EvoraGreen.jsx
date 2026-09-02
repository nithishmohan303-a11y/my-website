import { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import SectionHeading from "../components/SectionHeading";
import evoraGreenProduct from "../images/evora-green-product.png";
import "./EvoraGreen.css";

const NAV_LINKS = [
  { label: "HOME", href: "/", isRoute: true },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about-green" },
  { label: "CONTACT", href: "#contact-green" },
];

const BENEFITS = [
  {
    id: "absorption",
    icon: "droplet",
    title: "Rapid Absorption",
    description:
      "Absorb in seconds (up to 200ml), keeping you dry and comfortable during your period.",
  },
  {
    id: "anion-tech",
    icon: "atom",
    title: "Anion Technology",
    features: [
      { label: "Anion", text: "Neutralize odors and promote a fresh feeling." },
      { label: "Far-IR", text: "Enhance blood circulation and reduce discomfort." },
      { label: "Magnetic", text: "Potentially alleviate menstrual pain and promote relaxation." },
      { label: "NanoSilver", text: "Inhibit bacterial growth and maintain hygiene." },
      { label: "Chitin", text: "Energy Booster, Enhancing women’s vitality and vigour." },
    ],
  },
  {
    id: "leak-free",
    icon: "shield",
    title: "Leak-free protection",
    description:
      "Ultra-absorbent core keeps you dry, while the soft, breathable layers ensure ultimate comfort.",
  },
  {
    id: "skin-friendly",
    icon: "feather",
    title: "Skin-Friendly Materials",
    description:
      "Made from soft, breathable materials that are gentle on the skin, reducing the risk of irritation and discomfort.",
  },
  {
    id: "toxic-free",
    icon: "ban",
    title: "Toxic Free",
    description:
      "Free from harmful chemicals such as chlorine, dioxins, fragrances, and dyes. Ensuring a safer and more comfortable menstrual hygiene experience.",
  },
  {
    id: "comfort",
    icon: "heart",
    title: "Comfort and Protection",
    description:
      "Designed for maximum comfort, reliable protection against leaks, ensuring you feel confident and secure.",
  },
  {
    id: "eco",
    icon: "leaf",
    title: "Eco-Friendly",
    description:
      "Environmentally conscious, Anion sanitary napkins are designed to be gentle on the planet while providing superior menstrual care.",
  },
];

function LeafGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M14 50C6 34 12 14 32 8c20-6 30 4 24 24-6 20-26 26-42 18z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M14 50C24 38 34 26 48 14"
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

function DropletGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M32 6c9 12 18 24.5 18 35a18 18 0 1 1-36 0c0-10.5 9-23 18-35z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M23 43a9 9 0 0 0 9 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AtomGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <circle cx="32" cy="32" r="4.5" stroke="currentColor" strokeWidth="2" />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="11"
        stroke="currentColor"
        strokeWidth="2.2"
        transform="rotate(0 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="11"
        stroke="currentColor"
        strokeWidth="2.2"
        transform="rotate(60 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="11"
        stroke="currentColor"
        strokeWidth="2.2"
        transform="rotate(120 32 32)"
      />
    </svg>
  );
}

function FeatherGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M50 8C30 8 14 24 14 44v6h6c20 0 36-16 36-36V8z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M20 44L46 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M12 52l10-10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BanGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M15 15l34 34"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <path
        d="M32 54S8 39 8 22.5C8 13.9 15 8 22.5 8c4.6 0 8.4 2.2 9.5 6 1.1-3.8 4.9-6 9.5-6C49 8 56 13.9 56 22.5 56 39 32 54 32 54z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const BENEFIT_ICONS = {
  droplet: DropletGlyph,
  atom: AtomGlyph,
  shield: ShieldGlyph,
  feather: FeatherGlyph,
  ban: BanGlyph,
  heart: HeartGlyph,
  leaf: LeafGlyph,
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
  const message = form.message.value;

  const text =
`*New Evora Green Enquiry*

👤 Name: ${name}

📱 Phone: ${phone}

📧 Email: ${email}

💬 Message:
${message}`;

  const url = `https://wa.me/919655398262?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function openWhatsAppChat() {
  const form = document.getElementById("eg-enquiry-form");

  if (form && !form.checkValidity()) {
    form.reportValidity();
    return;
  }

  window.open("https://wa.me/919655398262", "_blank");
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function EvoraGreen() {
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
          EVORA <span className="dc-brand-accent">GREEN</span>
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

        <a href="#contact-green" className="dc-enquire-btn dc-enquire-btn--desktop">
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
          <a href="#contact-green" className="dc-enquire-btn" onClick={closeMenu}>
            ENQUIRE NOW
          </a>
        </div>
      </nav>

      <main className="dc-main">
        {/* HERO */}
        <section className="dc-hero dc-hero--product">
          <div className="dc-hero-product-wrap">
            <img
              src={evoraGreenProduct}
              alt="Evora Green — Premium Anion Sanitary Napkin"
              className="dc-hero-bg dc-hero-bg--product"
            />
            <div className="dc-hero-overlay" aria-hidden="true" />

            <div className="dc-hero-content">
              <motion.div
                className="dc-hero-ctas"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <a href="#services" className="dc-cta dc-cta--primary">
                  EXPLORE SERVICES
                </a>
                <a href="#contact-green" className="dc-cta dc-cta--secondary">
                  CONTACT US
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="services" className="dc-section dc-cars-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>BENEFITS</SectionHeading>
          </motion.div>

          <div className="dc-cars-grid">
            {BENEFITS.map((benefit, i) => {
              const Icon = BENEFIT_ICONS[benefit.icon];
              return (
                <motion.div
                  key={benefit.id}
                  className="dc-car-card"
                  {...fadeUp(0.1 + i * 0.1)}
                  whileHover={{ y: -10 }}
                >
                  <div className="dc-car-card-visual">
                    <Icon />
                  </div>
                  <h3 className="dc-car-card-title">{benefit.title}</h3>
                  {benefit.features ? (
                    <ul className="dc-benefit-feature-list">
                      {benefit.features.map((feature) => (
                        <li key={feature.label} className="dc-benefit-feature">
                          <span className="dc-benefit-feature-label">
                            {feature.label}:
                          </span>{" "}
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="dc-car-card-desc">{benefit.description}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* PRODUCT */}
        <section className="dc-section dc-product-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>OUR PRODUCT</SectionHeading>
            <p className="dc-section-intro">
              International premium quality Anion sanitary napkins — soft,
              breathable cotton-ultra thinness engineered with Anion, Chitin,
              Magnetic, Nano Silver and Infrared Ray technology.
            </p>
          </motion.div>

          <motion.div
            className="dc-product-showcase"
            {...fadeUp(0.15)}
            whileHover={{ y: -10 }}
          >
            <div className="dc-product-frame">
              <img
                src={evoraGreenProduct}
                alt="Evora Green — Premium Anion Sanitary Napkin"
                className="dc-product-image"
              />
              <div className="dc-product-overlay" aria-hidden="true" />
            </div>
          </motion.div>
        </section>

        {/* CONTACT / ENQUIRY */}
        <section id="contact-green" className="dc-section dc-contact-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>ENQUIRE NOW</SectionHeading>
            <p className="dc-section-intro">
              Tell us what you're looking for and our team will get back to
              you shortly.
            </p>
          </motion.div>

          <div className="dc-contact-grid">
            <motion.form
              id="eg-enquiry-form"
              className="dc-enquiry-form"
              onSubmit={handleEnquirySubmit}
              {...fadeUp(0.1)}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                pattern="^[0-9+()\-\s]{7,15}$"
                title="Enter a valid phone number"
                required
              />
              <input type="email" name="email" placeholder="Email Address" required />
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
              <h3>EVORA GREEN</h3>
              <p>A division of Dheeram Group of Companies</p>
              <p>MRS. SUGANYA</p>
              <button
                type="button"
                onClick={openWhatsAppChat}
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
