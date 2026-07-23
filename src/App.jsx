import "./App.css";
import profile from "./images/deva.png";
import founderExperience from "./images/founder-experience.png";
import founderSuccess from "./images/founder-success.png";
import founder1 from "./images/gallery/founder1.jpg";
import founder2 from "./images/gallery/founder2.jpg";
import meeting1 from "./images/gallery/meeting1.jpg";
import meeting2 from "./images/gallery/meeting2.jpg";
import award1 from "./images/gallery/award1.jpg";
import office1 from "./images/gallery/office1.jpg";
import Background from "./components/Background";
import GoldDust from "./components/GoldDust";
import SectionHeading from "./components/SectionHeading";
import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "./images/dheeram.png";
import SplashScreen from "./components/SplashScreen";
function Counter({ from = 0, to }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 2,
      onUpdate(v) {
        setValue(Math.floor(v));
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <>{value}</>;
}
function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const name = form[0].value;
  const mobile = form[1].value;
  const email = form[2].value;
  const message = form[3].value;

  const text =
`*New Website Enquiry*

👤 Name: ${name}

📱 Mobile: ${mobile}

📧 Email: ${email}

💬 Message:
${message}`;

  const url =
    `https://wa.me/919629071387?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}
/* Hero gold dust — denser on sides (~30% more), center stays clear */
const HERO_PARTICLES = (() => {
  const list = [];
  /* Very small / small / medium — no large specs */
  const SIZES = [1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.5, 4];
  const MOTIONS = ["rise", "diag", "drift", "twinkle"];

  const pushSide = (side, count) => {
    for (let i = 0; i < count; i += 1) {
      const t = i / count;
      const left =
        side === "left"
          ? 1.5 + t * 24 + (i % 5) * 0.85
          : 74.5 + t * 22 + (i % 4) * 0.65;
      const size = SIZES[i % SIZES.length];
      const motion = MOTIONS[i % MOTIONS.length];
      const dir = side === "left" ? 1 : -1;
      const driftX = dir * (8 + (i % 11) * 2.2);
      const driftY = -(55 + (i % 9) * 12);

      list.push({
        id: `${side}-${i}`,
        left: `${left}%`,
        top: `${5 + ((i * 17) % 86)}%`,
        size,
        motion,
        duration: 6.5 + (i % 8) * 1.55 + (size > 3 ? 1.2 : 0),
        delay: (i % 13) * 0.48,
        driftX: `${driftX}px`,
        driftY: `${driftY}px`,
        twinkleDur: `${2.4 + (i % 5) * 0.55}s`,
      });
    }
  };

  /* Was 40/side (80 total) → +30% ≈ 52/side (104 total) */
  pushSide("left", 52);
  pushSide("right", 52);
  return list;
})();

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  const galleryImages = [
    founder1,
    founder2,
    meeting1,
    meeting2,
    award1,
    office1,
  ];

  /* Reveal hero under the splash so the fade-out is seamless */
  const revealApp = () => setAppReady(true);
  const finishSplash = () => setShowSplash(false);

  useEffect(() => {
    document.body.style.overflow = showSplash || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash, menuOpen]);

  /* Fit founder name to available width — never crop */
  useEffect(() => {
    if (!appReady) return;

    const nameEl = nameRef.current;
    if (!nameEl) return;

    const fitName = () => {
      const parent = nameEl.parentElement;
      if (!parent) return;

      nameEl.style.fontSize = "";
      const styles = getComputedStyle(nameEl);
      let size = parseFloat(styles.fontSize);
      const available = parent.clientWidth;
      if (!available || !size) return;

      let guard = 60;
      while (nameEl.scrollWidth > available + 0.5 && size > 11 && guard--) {
        size -= 0.5;
        nameEl.style.fontSize = `${size}px`;
      }
    };

    const runFit = () => {
      if (document.fonts?.ready) {
        document.fonts.ready.then(fitName).catch(fitName);
      } else {
        fitName();
      }
    };

    runFit();
    const ro = new ResizeObserver(runFit);
    if (nameEl.parentElement) ro.observe(nameEl.parentElement);
    window.addEventListener("resize", runFit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", runFit);
    };
  }, [appReady]);

  /* Keep site gold particles below the hero — hero has its own particle layer */
  useEffect(() => {
    if (!appReady) return;

    const updateParticleClip = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      const clipTop = Math.max(0, Math.min(window.innerHeight, bottom));
      document.documentElement.style.setProperty(
        "--hero-particle-clip",
        `${clipTop}px`
      );
    };

    updateParticleClip();
    window.addEventListener("scroll", updateParticleClip, { passive: true });
    window.addEventListener("resize", updateParticleClip);

    return () => {
      window.removeEventListener("scroll", updateParticleClip);
      window.removeEventListener("resize", updateParticleClip);
    };
  }, [appReady]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
  {appReady && (
    <>
  <Background />
  <GoldDust />
      <nav className="navbar">

  <div className="logo">

 <img 
  src={logo}
  alt="Dheeram Logo"
  className="logo-img"
/>

  <div className="logo-text">
    <h3>DHEERAM A BRAND</h3>
  </div>

</div>

  <button
    type="button"
    className={`hamburger-btn${menuOpen ? " is-open" : ""}`}
    onClick={() => setMenuOpen((open) => !open)}
    aria-label="Toggle navigation menu"
    aria-expanded={menuOpen}
  >
    <span className="hamburger-line" />
    <span className="hamburger-line" />
    <span className="hamburger-line" />
  </button>

  <ul className="nav-links desktop-nav">

    <li><a href="#hero">Home</a></li>

    <li><a href="#about">About</a></li>

    <li><a href="#companies">Companies</a></li>

    <li><a href="#contact">Contact</a></li>
    <li><a href="#gallery">Gallery</a></li>

  </ul>

  <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen}>
    <ul className="mobile-nav-links">
      <li><a href="#hero" onClick={closeMenu}>Home</a></li>
      <li><a href="#about" onClick={closeMenu}>About</a></li>
      <li><a href="#companies" onClick={closeMenu}>Companies</a></li>
      <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
      <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
    </ul>
  </div>

</nav>

      <main className="background">
        <section id="hero" className="hero" ref={heroRef}>
          <div className="hero-particles" aria-hidden="true">
            {HERO_PARTICLES.map((p) => (
              <span
                key={p.id}
                className={`hero-particle hero-particle--${p.motion}`}
                style={{
                  left: p.left,
                  top: p.top,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  "--hero-p-dur": `${p.duration}s`,
                  "--hero-p-delay": `${p.delay}s`,
                  "--hero-p-drift-x": p.driftX,
                  "--hero-p-drift-y": p.driftY,
                  "--hero-p-twinkle": p.twinkleDur,
                }}
              />
            ))}
          </div>

          <div className="hero-poster">
            <motion.div
              className="hero-portrait"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-portrait-glow" aria-hidden="true" />
              <div className="hero-portrait-rim" aria-hidden="true">
                <span className="hero-ring-shine" />
                <span className="hero-ring-shine hero-ring-shine--lag" />
              </div>
              <div className="hero-portrait-frame">
                <div className="hero-portrait-float">
                  <img
                    src={profile}
                    alt="Mr. A. Devagandhan"
                    className="hero-image"
                  />
                </div>
              </div>
            </motion.div>

            <div className="hero-copy">
              <motion.h1
                ref={nameRef}
                className="hero-name"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero-name-base">MR. A. DEVAGANDHAN</span>
                <span className="hero-name-shine" aria-hidden="true">
                  MR. A. DEVAGANDHAN
                </span>
              </motion.h1>

              <motion.h2
                className="hero-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="hero-title-line" aria-hidden="true" />
                <span className="hero-title-text">FOUNDER &amp; CEO</span>
                <span className="hero-title-line" aria-hidden="true" />
              </motion.h2>

              <motion.h3
                className="hero-company"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                DHEERAM GROUP OF COMPANIES
              </motion.h3>

              <motion.p
                className="hero-tagline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 0.86, ease: [0.22, 1, 0.36, 1] }}
              >
                Building Leaders • Creating Legacy
              </motion.p>

              <motion.a
                href="#experience"
                className="hero-btn"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.15, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                Explore More
              </motion.a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION — between Hero and About Founder */}
        <section id="experience" className="experience">
          <div className="experience-inner">
            <motion.div
              className="experience-visual"
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <img
                src={founderExperience}
                alt="Mr. A. Devagandhan with luxury car"
                className="experience-image"
                draggable={false}
              />
            </motion.div>

            <motion.div
              className="experience-copy"
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <h2 className="experience-heading">18+ YEARS OF EXPERIENCE</h2>
              <p>
                With over 18 years of experience in the Network Marketing industry,
                Mr. A. Devagandhan has inspired thousands of people through leadership,
                business development, mentorship, and entrepreneurial vision.
              </p>
              <p>
                His journey is built on trust, consistency, innovation, and creating
                long-term success for individuals and organizations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SUCCESS STORIES — below Experience, above About Founder */}
        <section id="success-stories" className="success-stories">
          <div className="success-stories-inner">
            <motion.div
              className="success-stories-copy"
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <h2 className="success-stories-heading">CREATING SUCCESS STORIES</h2>
              <p>
                Mr. A. Devagandhan has not only built his own success in the Network
                Marketing industry but has also empowered thousands of people to achieve
                financial growth and personal success.
              </p>
              <p>
                Through his guidance, leadership, and mentorship, he continues to inspire
                individuals to build sustainable businesses, generate consistent income,
                and create a better future for themselves and their families.
              </p>
              <p>
                His mission is not only to succeed personally, but to help thousands of
                others succeed alongside him.
              </p>
            </motion.div>

            <motion.div
              className="success-stories-visual"
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.15, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <img
                src={founderSuccess}
                alt="Mr. A. Devagandhan with luxury car"
                className="success-stories-image"
                draggable={false}
              />
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        
          <section
  id="about"
  className="about fade-up"
>
            
  <motion.div
    className="about-card"
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
            <SectionHeading className="section-heading--about">
              ABOUT FOUNDER
            </SectionHeading>

            <p>
              Mr. A. Devagandhan is the Founder & CEO of
              Dheeram Group of Companies.
              His vision is to build world-class businesses,
              create successful entrepreneurs and inspire
              thousands of people through leadership,
              innovation and dedication.
            </p>

          </motion.div>

        </section>
       <section
  id="companies"
  className="companies fade-up"
>

  <SectionHeading>OUR COMPANIES</SectionHeading>

  <div className="company-grid">

    <motion.div
      className="company-card"
      whileHover={{ y: -15, scale: 1.05 }}
    >
      <h3>DHEERAM MART</h3>
      <p>Innovative products and business opportunities.</p>
    </motion.div>

    <motion.div
      className="company-card"
      whileHover={{ y: -15, scale: 1.05 }}
    >
      <h3>DHEERAM ASSOCIATES</h3>
      <p>Professional consulting and business solutions.</p>
    </motion.div>

    <motion.div
      className="company-card"
      whileHover={{ y: -15, scale: 1.05 }}
    >
      <h3>DHEERAM CARS</h3>
      <p>Premium automobile and transport services.</p>
    </motion.div>

    <motion.div
      className="company-card"
      whileHover={{ y: -15, scale: 1.05 }}
    >
      <h3>DHEERAM PROMOTERS</h3>
      <p>Real estate development and investment opportunities.</p>
    </motion.div>
    <motion.div
  className="company-card"
  whileHover={{ y: -15, scale: 1.05 }}
>
  <h3>DHEERAM SEA FOODS</h3>
  <p>
    Premium seafood processing, distribution and export services.
  </p>
</motion.div>
<motion.div
  className="company-card"
  whileHover={{ y: -15, scale: 1.05 }}
>
  <h3>DHEERAM EVENT MANAGEMENT</h3>
  <p>
    Professional event planning, corporate events and celebrations.
  </p>
</motion.div>
    </div>

</section>

    
    <section
  className="bottom-section fade-up"
>

  <div className="achievements">

    <SectionHeading>ACHIEVEMENTS</SectionHeading>

    <div className="achievement-grid">

      <motion.div
  className="achievement-card"
  whileHover={{ y: -15, scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <h3><Counter to={1} />+</h3>
  <p>Years of Excellence</p>
</motion.div>

      <motion.div
  className="achievement-card"
  whileHover={{ y: -15, scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <h3><Counter to={1000} />+</h3>
  <p>INCOME EARNERS</p>
</motion.div>

      <motion.div
  className="achievement-card"
  whileHover={{ y: -15, scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <h3><Counter to={5000} />+</h3>
  <p>PRIME MEMBERS</p>
</motion.div>

      <motion.div
  className="achievement-card"
  whileHover={{ y: -15, scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  <h3><Counter to={6} /></h3>
  <p>Group Companies</p>
</motion.div>

    </div>

  </div>
<section id="gallery" className="gallery fade-up">

  <SectionHeading>GALLERY</SectionHeading>

  <div className="gallery-grid">

    {galleryImages.map((image, index) => (
  <div
    key={index}
    className="gallery-item"
  >
    <img
      src={image}
      alt={`Gallery ${index + 1}`}
    />
  </div>
))}
</div>
</section>

  <div id="contact" className="contact">

  <h2>Contact Us</h2>

  <p>DHEERAM GROUP OF COMPANIES</p>

  <p>Founder & CEO : Mr. A. Devagandhan</p>

  <form
  className="contact-form"
  onSubmit={handleSubmit}
>

    <input
      type="text"
      placeholder="Your Name"
    />

    <input
      type="tel"
      placeholder="Mobile Number"
    />

    <input
      type="email"
      placeholder="Email Address"
    />

    <textarea
      rows="5"
      placeholder="Your Message"
    ></textarea>

    <button
      type="submit"
      className="contact-btn"
    >
      Send Message
    </button>

  </form>

  <div className="contact-buttons">

    <a
      href="https://www.youtube.com/@DheeramDeva1304"
      target="_blank"
      rel="noreferrer"
      className="contact-btn"
    >
      YouTube
    </a>

    <a
      href="https://facebook.com"
      target="_blank"
      rel="noreferrer"
      className="contact-btn"
    >
      Facebook
    </a>

    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      className="contact-btn"
    >
      Instagram
    </a>

  </div>

</div>

<footer className="footer fade-up">

  <h3>DHEERAM GROUP OF COMPANIES</h3>

  <p>Building Entrepreneurs • Creating Leaders • Transforming Lives</p>

  <p>© 2026 DHEERAM GROUP OF COMPANIES. All Rights Reserved.</p>

</footer>
</section>
      </main>
    </>
  )}

  {showSplash && (
    <SplashScreen onReveal={revealApp} onFinish={finishSplash} />
  )}
    </>
  );
}

export default App;