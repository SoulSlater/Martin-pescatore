import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ChefHat, ArrowRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const { login } = useMenu();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate async check
    await new Promise(r => setTimeout(r, 600));
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Password non corretta. Riprova.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page page-container">
      <div className="page-bg-orb orb-gold" />
      <div className="page-bg-orb orb-blue" />

      <div className="login-wrapper">
        <motion.div
          className="login-card glass"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo__icon">
              <ChefHat size={28} />
            </div>
            <span className="login-logo__text">Menu Manager</span>
          </div>

          <h1 className="login-title">Area Riservata</h1>
          <p className="login-subtitle">Accedi al pannello di gestione del menu</p>

          <form onSubmit={handleSubmit} className="login-form" id="login-form">
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <div className="password-wrap">
                <Lock size={16} className="password-icon" />
                <input
                  id="login-password"
                  type={showPwd ? 'text' : 'password'}
                  className="input password-input"
                  placeholder="Inserisci la password..."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPwd(s => !s)}
                  aria-label={showPwd ? 'Nascondi password' : 'Mostra password'}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                className="login-error"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={loading || !password}
              id="login-submit-btn"
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <>Accedi <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="login-hint">
            <Lock size={12} />
            <span>Password demo: <code>admin123</code></span>
          </div>
        </motion.div>

        <motion.p
          className="login-back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a href="/" className="login-back__link">← Torna al Menu Clienti</a>
        </motion.p>
      </div>
    </div>
  );
}
