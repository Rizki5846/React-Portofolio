import { C, spacing, borderRadius } from '../../constants/theme';

export const ProjectList = ({ projects, onEdit, onDelete }) => {
  if (!projects || projects.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No projects yet. Click "Add New Project" to get started!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {projects.map(project => (
        <div key={project.id} style={styles.card}>
          <div style={{ ...styles.cardHeader, borderBottomColor: project.color }}>
            <div style={styles.cardInfo}>
              <span style={styles.emoji}>{project.emoji}</span>
              <div>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <span style={styles.cardType}>{project.type}</span>
              </div>
            </div>
            <div style={styles.actions}>
              <button 
                onClick={() => onEdit(project)}
                style={styles.editBtn}
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => onDelete(project.id)}
                style={styles.deleteBtn}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
          
          <p style={styles.cardDesc}>{project.description || project.desc}</p>
          
          <div style={styles.techList}>
            {project.tech && project.tech.map((tech, i) => (
              <span key={i} style={styles.techBadge}>{tech}</span>
            ))}
          </div>
          
          <div style={styles.cardFooter}>
            <span style={styles.date}>
              Created: {new Date(project.created_at || project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  card: {
    backgroundColor: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottom: `2px solid ${C.border}`,
  },
  cardInfo: {
    display: 'flex',
    gap: spacing.md,
    alignItems: 'center',
  },
  emoji: {
    fontSize: '32px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: C.text,
    margin: 0,
    marginBottom: spacing.xs,
  },
  cardType: {
    fontSize: '11px',
    color: C.copper,
    fontFamily: C.mono,
  },
  actions: {
    display: 'flex',
    gap: spacing.sm,
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: `1px solid ${C.copper}`,
    borderRadius: borderRadius.sm,
    color: C.copper,
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    border: `1px solid #ef4444`,
    borderRadius: borderRadius.sm,
    color: '#ef4444',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'all 0.2s',
  },
  cardDesc: {
    fontSize: '13px',
    color: C.muted,
    lineHeight: 1.6,
    marginBottom: spacing.md,
  },
  techList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  techBadge: {
    padding: '4px 8px',
    backgroundColor: '#1a1a1a',
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.sm,
    fontSize: '10px',
    color: '#999',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  date: {
    fontSize: '10px',
    color: '#444',
  },
  empty: {
    textAlign: 'center',
    padding: spacing.xxl,
    backgroundColor: C.card,
    borderRadius: borderRadius.lg,
    border: `1px solid ${C.border}`,
  },
  emptyText: {
    color: C.muted,
    fontSize: '14px',
  },
};