import { motion } from "framer-motion";
import logo from "../images/dheeram.png";

function SplashScreen() {
  return (
    <div className="splash-screen">

      <motion.img
        src={logo}
        alt="DHEERAM"
        className="splash-logo"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <motion.h1
        className="splash-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        DHEERAM A BRAND
      </motion.h1>

    </div>
  );
}

export default SplashScreen;