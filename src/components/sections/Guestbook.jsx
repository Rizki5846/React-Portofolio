import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { Reveal } from '../ui/Reveal';
import { useTheme } from '../../context/themeContext';
import { useAuth } from '../../context/authContext';

export const Guestbook = () => {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | sending | success | error
  const [focusedField, setFocusedField] = useState(null);
  
  // Admin Reply States
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchEntries = async () => {
    setStatus('loading');
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      setEntries(data || []);
      setStatus('idle');
    } catch (err) {
      console.error('Error fetching guestbook entries:', err);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchEntries();

    // Set up Supabase Realtime Subscription for all events
    const subscription = supabase
      .channel('guestbook_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guestbook' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setEntries((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setEntries((prev) => prev.filter(entry => entry.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setEntries((prev) => prev.map(entry => entry.id === payload.new.id ? payload.new : entry));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setStatus('sending');
    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([{ name: form.name.trim(), message: form.message.trim() }]);

      if (error) throw error;
      
      setStatus('success');
      setForm({ name: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to submit message:', err);
      setStatus('error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pesan ini?")) return;
    try {
      const { error } = await supabase.from('guestbook').delete().eq('id', id);
      if (error) throw error;
      // UI updates via realtime subscription
    } catch (err) {
      alert("Gagal menghapus pesan: " + err.message);
    }
  };

  const handleSubmitReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      const { error } = await supabase
        .from('guestbook')
        .update({ admin_reply: replyText.trim() })
        .eq('id', id);
      if (error) throw error;
      setReplyingTo(null);
      setReplyText('');
      // UI updates via realtime subscription
    } catch (err) {
      alert("Gagal membalas pesan: " + err.message);
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div id="guestbook" style={{ padding: '60px 20px', background: colors.card }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Reveal>
          <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8, textAlign: 'center' }}>
            // guestbook
          </p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', fontWeight: 700, margin: '0 0 10px', color: colors.text, textAlign: 'center' }}>
            Leave a Message
          </h2>
          <p style={{ fontSize: 'clamp(13px, 3.5vw, 14px)', color: colors.muted, lineHeight: 1.8, marginBottom: 40, textAlign: 'center' }}>
            Sign the guestbook! You can leave a comment, feedback, or just say hi.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            
            {/* Form Section */}
            <div style={{ 
              background: colors.bg, 
              padding: 'clamp(20px, 5vw, 30px)', 
              borderRadius: 16,
              border: `1px solid ${colors.border}`,
              boxShadow: colors.shadow
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 6, fontFamily: colors.mono }}>
                    Nama Panggilan *
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
                    disabled={status === 'sending'}
                  />
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
                    placeholder="Halo! Keren banget portofolionya..."
                    rows={3}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 80 }}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                {status === 'success' && (
                  <div style={{
                    padding: '10px 14px', background: 'rgba(74,222,128,0.08)',
                    border: '1px solid rgba(74,222,128,0.3)', borderRadius: 8,
                    color: '#4ade80', fontSize: 13,
                  }}>
                    ✅ Pesan berhasil ditambahkan!
                  </div>
                )}
                {status === 'error' && (
                  <div style={{
                    padding: '10px 14px', background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8,
                    color: '#f87171', fontSize: 13,
                  }}>
                    ❌ Kirim pesan gagal. Cek koneksi atau pastikan tabel sudah dibuat.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending' || !form.name || !form.message}
                  style={{
                    padding: '12px 24px',
                    background: (status === 'sending') 
                      ? colors.border 
                      : `linear-gradient(135deg, ${colors.copper}, ${colors.copperLight})`,
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: (status === 'sending') ? 'not-allowed' : 'pointer',
                    fontFamily: colors.sans,
                    transition: 'transform 0.1s, opacity 0.2s',
                    alignSelf: 'flex-end',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    opacity: (!form.name || !form.message) ? 0.7 : 1,
                  }}
                  onMouseDown={(e) => { if (status !== 'sending') { e.currentTarget.style.transform = 'translateY(2px)'; } }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
                >
                  {status === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            </div>

            {/* List Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
                Pesan Terakhir ({entries.length})
              </h3>
              
              {status === 'loading' && entries.length === 0 ? (
                <div style={{ textAlign: 'center', color: colors.muted, padding: 30 }}>
                  Memuat pesan...
                </div>
              ) : entries.length === 0 ? (
                <div style={{ textAlign: 'center', color: colors.muted, padding: 30, background: colors.bg, borderRadius: 12, border: `1px dashed ${colors.border}` }}>
                  Belum ada pesan. Jadilah yang pertama!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 600, overflowY: 'auto', paddingRight: 10 }}>
                  {entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      style={{
                        padding: 16,
                        background: colors.bg,
                        borderRadius: 12,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong style={{ color: colors.text, fontSize: 14 }}>{entry.name}</strong>
                          <span style={{ fontSize: 11, color: colors.muted, fontFamily: colors.mono }}>
                            {formatDate(entry.created_at)}
                          </span>
                        </div>
                        
                        {/* Action Khusus Admin */}
                        {isAuthenticated && (
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <button 
                              onClick={() => { 
                                setReplyingTo(replyingTo === entry.id ? null : entry.id); 
                                setReplyText(entry.admin_reply || ''); 
                              }} 
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: colors.copper, fontWeight: 600 }}
                            >
                              ↩️ {entry.admin_reply ? 'Edit Reply' : 'Reply'}
                            </button>
                            <button 
                              onClick={() => handleDelete(entry.id)} 
                              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#ef4444', fontWeight: 600 }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <p style={{ color: colors.muted, fontSize: 14, margin: 0, lineHeight: 1.6, wordBreak: 'break-word' }}>
                        {entry.message}
                      </p>

                      {/* Display Admin Reply (Jika ada dan tidak sedang diedit/direply) */}
                      {entry.admin_reply && replyingTo !== entry.id && (
                        <div style={{ 
                          marginTop: 16, padding: '12px 16px', 
                          background: `linear-gradient(to right, rgba(0,0,0,0.2), transparent)`, 
                          borderLeft: `3px solid ${colors.copper}`, 
                          borderRadius: '0 8px 8px 0' 
                        }}>
                          <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: colors.copper, marginBottom: 6, fontFamily: colors.mono }}>
                            _Admin Reply
                          </span>
                          <p style={{ color: colors.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                            {entry.admin_reply}
                          </p>
                        </div>
                      )}

                      {/* Form Admin Reply */}
                      {isAuthenticated && replyingTo === entry.id && (
                        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Tulis balasanmu di sini..."
                            rows={3}
                            style={{ 
                              width: '100%', padding: '12px', borderRadius: 8, 
                              background: 'rgba(0,0,0,0.2)', border: `1px solid ${colors.copper}66`, 
                              color: colors.text, outline: 'none', fontSize: 13, 
                              fontFamily: colors.sans, resize: 'vertical',
                              boxSizing: 'border-box'
                            }}
                            autoFocus
                          />
                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button 
                              onClick={() => setReplyingTo(null)} 
                              style={{ background: 'none', border: `1px solid ${colors.border}`, color: colors.muted, borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={() => handleSubmitReply(entry.id)} 
                              style={{ background: colors.copper, color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                            >
                              Simpan Balasan
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </Reveal>
      </div>
    </div>
  );
};
