import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Reveal } from '../ui/Reveal';
import { useTheme } from '../../context/themeContext';
import { contactInfo } from '../../constants/data';

// ⚠️ Daftarkan di https://emailjs.com GRATIS, lalu isi 3 value ini:
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY';

export const Contact = () => {
  const { colors } = useTheme();
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const isConfigured =
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '13px 14px',
    background: colors.card,
    border: `1.5px solid ${focusedField === field ? colors.copper : colors.border}`,
    borderRadius: 10,
    color: colors.text,
    fontSize: 14,
    fontFamily: colors.sans,
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: focusedField === field ? `0 0 0 3px ${colors.copper}22` : 'none',
  });

  return (
    <div id="contact" style={{ padding: '60px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8, textAlign: 'center' }}>
            // get_in_touch
          </p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', fontWeight: 700, margin: '0 0 10px', color: colors.text, textAlign: 'center' }}>
            Let's Connect
          </h2>
          <p style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', color: colors.muted, lineHeight: 1.8, marginBottom: 36, textAlign: 'center' }}>
            Looking for new opportunities. Feel free to reach out!
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(10px, 3vw, 16px)', flexWrap: 'wrap', marginBottom: 40 }}>
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', flex: '1 1 auto', minWidth: 'min(100%, 120px)', maxWidth: 200 }}
              >
                <div
                  style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    padding: 'clamp(14px, 3.5vw, 18px) clamp(14px, 3.5vw, 20px)',
                    boxShadow: colors.shadow,
                    transition: 'transform 0.15s, border-color 0.2s',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = colors.copper;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  <div style={{ fontSize: 'clamp(18px, 5vw, 22px)', marginBottom: 6 }}>{contact.ic}</div>
                  <div style={{ fontFamily: colors.mono, fontSize: 'clamp(9px, 2.5vw, 10px)', color: colors.copper, marginBottom: 3 }}>
                    {contact.label}
                  </div>
                  <div style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: colors.muted, wordBreak: 'break-all' }}>
                    {contact.val}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ flex: 1, height: 1, background: colors.border }} />
            <span style={{ fontFamily: colors.mono, fontSize: 11, color: colors.muted }}>atau kirim pesan langsung</span>
            <div style={{ flex: 1, height: 1, background: colors.border }} />
          </div>

          {/* Contact Form */}
          {!isConfigured && (
            <div style={{
              padding: '12px 16px',
              marginBottom: 20,
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 10,
              fontSize: 12,
              color: '#f59e0b',
              fontFamily: colors.mono,
            }}>
              ⚠️ Form belum aktif — isi VITE_EMAILJS_* di file .env. Daftar gratis di emailjs.com
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 6, fontFamily: colors.mono }}>
                  Nama *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  style={inputStyle('name')}
                  required
                  disabled={status === 'sending' || !isConfigured}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 6, fontFamily: colors.mono }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  style={inputStyle('email')}
                  required
                  disabled={status === 'sending' || !isConfigured}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 6, fontFamily: colors.mono }}>
                Pesan *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Halo Rizki, saya tertarik untuk..."
                rows={5}
                style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                required
                disabled={status === 'sending' || !isConfigured}
              />
            </div>

            {/* Status */}
            {status === 'success' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px',
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: 10,
                color: '#4ade80',
                fontSize: 14,
              }}>
                ✅ Pesan terkirim! Terima kasih, Rizki akan segera membalas.
              </div>
            )}
            {status === 'error' && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 16px',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10,
                color: '#f87171',
                fontSize: 14,
              }}>
                ❌ Gagal mengirim. Coba hubungi langsung via email.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending' || !isConfigured || !form.name || !form.email || !form.message}
              style={{
                padding: '14px 32px',
                background: (status === 'sending' || !isConfigured)
                  ? colors.border
                  : `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontWeight: 700,
                fontSize: 15,
                cursor: (status === 'sending' || !isConfigured) ? 'not-allowed' : 'pointer',
                fontFamily: colors.sans,
                boxShadow: (status === 'sending' || !isConfigured) ? 'none' : `0 5px 0 ${colors.copperDim}, 0 8px 24px ${colors.copper}33`,
                transition: 'transform 0.1s, box-shadow 0.1s',
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseDown={(e) => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.boxShadow = `0 2px 0 ${colors.copperDim}`; } }}
              onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 5px 0 ${colors.copperDim}, 0 8px 24px ${colors.copper}33`; }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Mengirim...
                </>
              ) : '✉️ Kirim Pesan'}
            </button>
          </form>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </Reveal>
      </div>
    </div>
  );
};