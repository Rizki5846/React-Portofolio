import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { C, spacing, borderRadius } from '../../constants/theme';

export const LoginModal = ({ onClose, onSuccess }) => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError('');

    // Simulasi delay untuk UX
    await new Promise((res) => setTimeout(res, 600));

    const success = login(password);
    if (success) {
      onSuccess();
    } else {
      setError('Password salah. Akses ditolak!');
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 600);
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          animation: shake ? 'shake 0.5s ease' : 'modalIn 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.9) translateY(-20px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .login-input:focus {
            outline: none !important;
            border-color: ${C.copper} !important;
            box-shadow: 0 0 0 3px rgba(184, 115, 51, 0.2) !important;
          }
          .login-submit:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(184, 115, 51, 0.4) !important;
          }
          .login-submit:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .toggle-pw:hover {
            color: ${C.copper} !important;
          }
        `}</style>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.lockIcon}>🔐</div>
          <h2 style={styles.title}>Admin Access</h2>
          <p style={styles.subtitle}>Masukkan password untuk mengelola project</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Masukkan password admin..."
              className="login-input"
              style={styles.input}
              disabled={loading}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-pw"
              style={styles.togglePw}
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="login-submit"
            style={styles.submitBtn}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Memverifikasi...
              </span>
            ) : (
              '🔓 Masuk ke Admin Panel'
            )}
          </button>
        </form>

        <button onClick={onClose} style={styles.cancelLink}>
          Batal
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(12px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: C.surface,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: 420,
    padding: `${spacing.xl}px`,
    boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(184,115,51,0.15)',
    border: `1px solid ${C.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.sm,
  },
  lockIcon: {
    fontSize: 48,
    lineHeight: 1,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: C.text,
    margin: 0,
    background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 13,
    color: C.muted,
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '14px 48px 14px 16px',
    backgroundColor: C.card,
    border: `1.5px solid ${C.border}`,
    borderRadius: borderRadius.lg,
    color: C.text,
    fontSize: 15,
    fontFamily: C.sans,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  togglePw: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 18,
    color: C.muted,
    transition: 'color 0.2s',
    padding: 0,
    lineHeight: 1,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: borderRadius.md,
    color: '#f87171',
    fontSize: 13,
    fontWeight: 500,
  },
  submitBtn: {
    padding: '14px 24px',
    background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
    border: 'none',
    borderRadius: borderRadius.lg,
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(184,115,51,0.3)',
  },
  cancelLink: {
    background: 'none',
    border: 'none',
    color: C.muted,
    fontSize: 13,
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'underline',
    padding: 0,
    alignSelf: 'center',
    transition: 'color 0.2s',
  },
};
