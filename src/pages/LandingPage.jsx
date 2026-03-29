import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, Pizza } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-hero">
        <motion.div
          className="logo-bubble"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="logo-bubble__inner">
            <span className="logo-text-top">RISTORO</span>
            <div className="logo-text-main-wrap">
              <span className="logo-text-main">MARTIN</span>
              <div className="logo-dot"></div>
            </div>
            <span className="logo-text-main">PESCATORE</span>
            <div className="logo-divider"></div>
            <span className="logo-text-bottom">CASTEL D'AZZANO</span>
          </div>
          <div className="logo-bubble__tail"></div>
        </motion.div>
      </header>

      <main className="landing-choices">
        <motion.button
          className="choice-card"
          onClick={() => navigate('/menu?section=bar')}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="choice-icon-wrap">
            <Coffee size={48} className="choice-icon" />
          </div>
          <h2 className="choice-title">Menu Bar</h2>
          <p className="choice-desc">Aperitivi e Birre</p>
        </motion.button>

        <motion.button
          className="choice-card"
          onClick={() => navigate('/menu?section=pizzeria')}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="choice-icon-wrap">
            <Pizza size={48} className="choice-icon" />
          </div>
          <h2 className="choice-title">Menu Pizzeria</h2>
          <p className="choice-desc">Le Nostre Pizze</p>
        </motion.button>
      </main>
    </div>
  );
}
