import "./App.css";
import profile from "./images/deva.png";
import founder1 from "./images/gallery/founder1.jpg";
import founder2 from "./images/gallery/founder2.jpg";
import meeting1 from "./images/gallery/meeting1.jpg";
import meeting2 from "./images/gallery/meeting2.jpg";
import award1 from "./images/gallery/award1.jpg";
import office1 from "./images/gallery/office1.jpg";
import Background from "./components/Background";
import GoldDust from "./components/GoldDust";
import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logo from "./images/dheeram.png";
import SplashScreen from "./components/SplashScreen";
import CursorGlow from "./components/CursorGlow";
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
function App() {

  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const galleryImages = [
  founder1,
  founder2,
  meeting1,
  meeting2,
  award1,
  office1,
];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
  <Background />
  <CursorGlow />
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
        <section id="hero" className="hero">

        {/* HERO SECTION */}
        <div className="scroll-indicator">
          
  <span></span>
</div>
        

          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>
              MR. A.
              <br />
              DEVAGANDHAN
            </h1>

            <h2 style={{ color: "#FFD700" }}>
  Founder & CEO
</h2>
            <h3>Dheeram Group of Companies</h3>
            <div className="gold-divider"></div>
            <p className="welcome">
              Welcome to the Official Profile Website
            </p>

            <motion.a
              href="#about"
              className="hero-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
            </motion.a>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="hero-photo-wrapper">

  <div className="gold-ring"></div>

  <img
    src={profile}
    alt="Mr. A. Devagandhan"
    className="hero-image"
  />

</div>
          </motion.div>

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
            <h2>About Founder</h2>

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

  <h2 className="section-title">
  Our Companies
</h2>

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

    <h2 className="section-title">
      Achievements
    </h2>

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

  <h2 className="section-title">
    Gallery
  </h2>

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
  );
}

export default App;