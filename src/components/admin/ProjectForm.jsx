import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { C, spacing, borderRadius } from '../../constants/theme';

export const ProjectForm = ({ project, onClose, onSuccess }) => {
  const { addProject, updateProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    tech: [],
    type: 'Web Dev',
    emoji: '🚀',
    color: '#3b82f6',
    link: '',
  });
  const [techInput, setTechInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue', emoji: '🔵' },
    { value: '#8b5cf6', label: 'Purple', emoji: '🟣' },
    { value: '#10b981', label: 'Green', emoji: '🟢' },
    { value: '#f59e0b', label: 'Orange', emoji: '🟠' },
    { value: '#ef4444', label: 'Red', emoji: '🔴' },
    { value: '#ec4899', label: 'Pink', emoji: '🌸' },
    { value: '#06b6d4', label: 'Cyan', emoji: '🔷' },
  ];

  const emojiOptions = ['🚀', '💻', '🎨', '📱', '🔧', '🌐', '🎯', '⚡', '💡', '🎮', '🛠️', '📊'];

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        desc: project.description,
        tech: project.tech,
        type: project.type,
        emoji: project.emoji,
        color: project.color,
        link: project.link || '',
      });
      setTechInput(project.tech.join(', '));
      if (project.image_url) {
        setImagePreview(project.image_url);
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTechChange = (e) => {
    const value = e.target.value;
    setTechInput(value);
    const techArray = value.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, tech: techArray }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WEBP.');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title || !formData.desc || formData.tech.length === 0) {
      setError('Mohon isi semua field yang diperlukan');
      return;
    }

    setLoading(true);
    try {
      if (project) {
        await updateProject(project.id, formData, imageFile);
      } else {
        await addProject(formData, imageFile);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter project title"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              style={{ ...styles.input, minHeight: '100px' }}
              placeholder="Enter project description"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Technologies * (comma separated)</label>
            <input
              type="text"
              value={techInput}
              onChange={handleTechChange}
              style={styles.input}
              placeholder="React, Node.js, MongoDB"
              required
            />
            {formData.tech.length > 0 && (
              <div style={styles.techPreview}>
                {formData.tech.map((t, i) => (
                  <span key={i} style={styles.techBadge}>{t}</span>
                ))}
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>🔗 Project Link (URL)</label>
            <div style={styles.linkInputWrapper}>
              <span style={styles.linkIcon}>🌐</span>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                style={{ ...styles.input, paddingLeft: '38px' }}
                placeholder="https://github.com/username/project atau https://project.vercel.app"
              />
            </div>
            <small style={styles.helperText}>Opsional — link ke GitHub repo, live demo, atau website project</small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Project Image</label>
            <div style={styles.imageUpload}>
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                style={styles.fileInput}
                id="image-upload"
              />
              <label htmlFor="image-upload" style={styles.uploadLabel}>
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </label>
              {imagePreview && (
                <div style={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" style={styles.previewImg} />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    style={styles.removeImage}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <small style={styles.helperText}>
              Supported: JPG, PNG, GIF, WEBP (Max 5MB)
            </small>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Project Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Web Dev">Web Development</option>
                <option value="IT Support">IT Support</option>
                <option value="Mobile Dev">Mobile Development</option>
                <option value="Design">UI/UX Design</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Emoji Icon</label>
              <select
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                style={styles.select}
              >
                {emojiOptions.map(emoji => (
                  <option key={emoji} value={emoji}>{emoji}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Accent Color</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={styles.select}
              >
                {colorOptions.map(color => (
                  <option key={color.value} value={color.value}>
                    {color.emoji} {color.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div style={styles.error}>{error}</div>
          )}

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(8px)',
    zIndex: 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    backgroundColor: C.surface,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    border: `1px solid ${C.border}`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.lg}px ${spacing.xl}px`,
    borderBottom: `1px solid ${C.border}`,
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: C.text,
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: C.muted,
    padding: '0 8px',
  },
  form: {
    padding: spacing.xl,
    overflowY: 'auto',
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    display: 'block',
    marginBottom: spacing.sm,
    color: C.text,
    fontSize: '13px',
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    color: C.text,
    fontSize: '14px',
    fontFamily: C.sans,
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    color: C.text,
    fontSize: '14px',
    fontFamily: C.sans,
    cursor: 'pointer',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: spacing.md,
  },
  techPreview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  techBadge: {
    padding: '4px 8px',
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.sm,
    fontSize: '11px',
    color: C.muted,
  },
  imageUpload: {
    marginTop: spacing.xs,
  },
  linkInputWrapper: {
    position: 'relative',
  },
  linkIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 16,
    pointerEvents: 'none',
    zIndex: 1,
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    color: C.text,
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'background-color 0.2s',
  },
  imagePreview: {
    marginTop: spacing.md,
    position: 'relative',
    display: 'inline-block',
  },
  previewImg: {
    maxWidth: '200px',
    maxHeight: '150px',
    borderRadius: borderRadius.md,
    border: `1px solid ${C.border}`,
  },
  removeImage: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#ef4444',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  helperText: {
    display: 'block',
    marginTop: spacing.xs,
    fontSize: '11px',
    color: C.muted,
  },
  actions: {
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end',
    marginTop: spacing.xl,
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    color: C.text,
    cursor: 'pointer',
    fontSize: '14px',
  },
  submitBtn: {
    padding: '10px 24px',
    background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
    border: 'none',
    borderRadius: borderRadius.md,
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '14px',
  },
  error: {
    padding: spacing.md,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: `1px solid #ef4444`,
    borderRadius: borderRadius.md,
    color: '#ef4444',
    fontSize: '13px',
    marginBottom: spacing.md,
  },
};