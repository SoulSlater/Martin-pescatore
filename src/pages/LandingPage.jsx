import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Coffee, Pizza } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-hero">
        <div className="logo-bubble">
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
        </div>
      </header>

      <main className="landing-choices">
        <button
          className="choice-card"
          onClick={() => navigate('/menu?section=bar')}
        >
          <div className="choice-icon-wrap">
            <Coffee size={48} className="choice-icon" />
          </div>
          <h2 className="choice-title">Menu Bar</h2>
          <p className="choice-desc">Aperitivi e Birre</p>
        </button>

        <button
          className="choice-card"
          onClick={() => navigate('/menu?section=pizzeria')}
        >
          <div className="choice-icon-wrap">
            <Pizza size={48} className="choice-icon" />
          </div>
          <h2 className="choice-title">Menu Pizzeria</h2>
          <p className="choice-desc">Le Nostre Pizze</p>
        </button>
      </main>
    </div>
  );
}
