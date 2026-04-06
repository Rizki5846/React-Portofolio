import { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ProjectForm } from './ProjectForm';
import { ProjectList } from './ProjectList';
import { C, spacing, borderRadius } from '../../constants/theme';

export const AdminPanel = ({ onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { projects, loading, deleteProject } = useProjects();

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      try {
        await deleteProject(id);
        alert('Proyek berhasil dihapus!');
      } catch (error) {
        alert('Gagal menghapus proyek: ' + error.message);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    alert('Proyek berhasil disimpan!');
  };

  if (loading) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <div style={styles.loading}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <h2 style={styles.title}>Admin Panel - Manage Projects</h2>
            <button onClick={onClose} style={styles.closeBtn}>✕</button>
          </div>
          
          <div style={styles.content}>
            <button 
              onClick={() => setShowForm(true)}
              style={styles.addBtn}
            >
              + Add New Project
            </button>
            
            <ProjectList 
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      
      {showForm && (
        <ProjectForm 
          project={editingProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
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
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    backgroundColor: C.surface,
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: '1200px',
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
    transition: 'color 0.2s',
  },
  content: {
    padding: `${spacing.xl}px`,
    overflowY: 'auto',
    flex: 1,
  },
  addBtn: {
    background: `linear-gradient(135deg, ${C.copper}, ${C.copperLight})`,
    border: 'none',
    borderRadius: borderRadius.lg,
    padding: '12px 24px',
    color: '#fff',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    marginBottom: spacing.lg,
    width: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  loading: {
    textAlign: 'center',
    padding: spacing.xl,
    color: C.text,
  },
};