import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../components/Background";
import SectionHeading from "../components/SectionHeading";
import promotersHero from "../images/promoters-hero.jpg";
import promotersMobileHero from "../images/promoters-mobile-hero.png";
import "./DheeramPromoters.css";
const NAV_LINKS = [
  { label: "HOME", href: "/", isRoute: true },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about-promoters" },
  { label: "CONTACT", href: "#contact-promoters" },
];

const PROJECT_CATEGORIES = [
  {
    id: "plots",
    name: "Residential Plots",
    description:
      "Well-planned, DTCP-approved layouts designed for secure, long-term investment.",
  },
  {
    id: "villas",
    name: "Premium Villas",
    description:
      "Spacious, thoughtfully designed villas that bring comfort and elegance together.",
  },
  {
    id: "apartments",
    name: "Apartments & Flats",
    description:
      "Modern living spaces built for convenience, community and everyday comfort.",
  },
  {
    id: "commercial",
    name: "Commercial Spaces",
    description:
      "Strategically located commercial properties suited for growing businesses.",
  },
];

const WHY_CHOOSE_US = [
  {
    id: "selection",
    title: "Prime Locations",
    description:
      "Carefully selected sites chosen for connectivity, growth potential and lasting value.",
  },
  {
    id: "trusted",
    title: "Trusted Development",
    description:
      "Backed by the Dheeram Group's reputation for integrity, transparency and dependable delivery.",
  },
  {
    id: "experience",
    title: "Professional Guidance",
    description:
      "A knowledgeable team supporting you from site selection through to registration.",
  },
  {
    id: "customer",
    title: "Customer-Focused Approach",
    description:
      "Your needs come first — honest guidance and support tailored to what matters to you.",
  },
];

function BuildingGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <rect
        x="14"
        y="10"
        width="24"
        height="46"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <rect
        x="38"
        y="26"
        width="16"
        height="30"
        rx="2"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <path
        d="M20 18h4M28 18h4M20 26h4M28 26h4M20 34h4M28 34h4M20 42h4M28 42h4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M44 32h4M44 40h4M44 48h4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M10 56h44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
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

function CompassGlyph() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="dc-icon-svg"
    >
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M40 24l-6 12-12 6 6-12z"
        stroke="currentColor"
        strokeWidth="2.2"
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
  selection: CompassGlyph,
  trusted: ShieldGlyph,
  experience: BadgeGlyph,
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
  const projectInterest = form.projectInterest.value;
  const message = form.message.value;

  const text =
`*New Dheeram Promoters Enquiry*

👤 Name: ${name}

📱 Phone: ${phone}

📧 Email: ${email}

🏢 Project Interested In: ${projectInterest}

💬 Message:
${message}`;

  const url = `https://wa.me/919629974707?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function scrollToEnquiryForm() {
  document
    .getElementById("dp-enquiry-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function DheeramPromoters() {
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
          DHEERAM <span className="dc-brand-accent">PROMOTERS</span>
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

        <a href="#contact-promoters" className="dc-enquire-btn dc-enquire-btn--desktop">
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
          <a href="#contact-promoters" className="dc-enquire-btn" onClick={closeMenu}>
            ENQUIRE NOW
          </a>
        </div>
      </nav>

      <main className="dc-main">
        {/* HERO */}
        <section className="dc-hero">
          <picture>
            <source media="(max-width: 768px)" srcSet={promotersMobileHero} />
            <img
              src={promotersHero}
              alt="Dheeram Promoters"
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
              DHEERAM PROMOTERS
            </motion.h1>

            <motion.h2
              className="dc-hero-headline"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              BUILD THE EXTRAORDINARY
            </motion.h2>

            <motion.p
              className="dc-hero-subtitle"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Premium Projects • Trusted Development • Excellence
            </motion.p>

            <motion.div
              className="dc-hero-ctas"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="#projects" className="dc-cta dc-cta--primary">
                EXPLORE PROJECTS
              </a>
              <a href="#contact-promoters" className="dc-cta dc-cta--secondary">
                CONTACT US
              </a>
            </motion.div>
          </div>
        </section>

        {/* EXPLORE OUR PROJECTS */}
        <section id="projects" className="dc-section dc-cars-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>EXPLORE OUR PROJECTS</SectionHeading>
            <p className="dc-section-intro">
              A refined portfolio spanning plots, villas, apartments and
              commercial spaces — each selected to deliver location,
              quality and lasting value.
            </p>
          </motion.div>

          <div className="dc-cars-grid">
            {PROJECT_CATEGORIES.map((project, i) => (
              <motion.div
                key={project.id}
                className="dc-car-card"
                {...fadeUp(0.1 + i * 0.1)}
                whileHover={{ y: -10 }}
              >
                <div className="dc-car-card-visual">
                  <BuildingGlyph />
                </div>
                <h3 className="dc-car-card-title">{project.name}</h3>
                <p className="dc-car-card-desc">{project.description}</p>
                <a href="#contact-promoters" className="dc-car-card-cta">
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
        <section id="contact-promoters" className="dc-section dc-contact-section">
          <motion.div {...fadeUp(0)}>
            <SectionHeading>ENQUIRE NOW</SectionHeading>
            <p className="dc-section-intro">
              Tell us what you're looking for and our team will get back to
              you shortly.
            </p>
          </motion.div>

          <div className="dc-contact-grid">
            <motion.form
              id="dp-enquiry-form"
              className="dc-enquiry-form"
              onSubmit={handleEnquirySubmit}
              {...fadeUp(0.1)}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <select name="projectInterest" defaultValue="" required>
                <option value="" disabled>
                  Project Interested In
                </option>
                {PROJECT_CATEGORIES.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
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
              <h3>DHEERAM PROMOTERS</h3>
              <p>A division of Dheeram Group of Companies</p>
              <p>MRS. KAVITHA</p>
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
