import { useState } from "react";
import { Reveal } from "../ui/Reveal";
import { ProjectCard } from "../project/ProjectCard";
import { useProjects } from "../../context/projectContext";
import { C, spacing, borderRadius } from "../../constants/theme";

export const Projects = () => {
  const { projects, loading, filter, setFilter, searchQuery, setSearchQuery } = useProjects();
  const [showSearch, setShowSearch] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'Web Dev', label: 'Web Development' },
    { value: 'IT Support', label: 'IT Support' },
    { value: 'Mobile Dev', label: 'Mobile Development' },
    { value: 'Design', label: 'UI/UX Design' },
  ];

  if (loading) {
    return (
      <div id="projects" style={{ padding: `80px ${spacing.xl}px`, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: 'center', color: C.muted }}>
          <div style={styles.loadingSpinner}></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="projects" style={{ padding: `80px ${spacing.xl}px`, maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={styles.header}>
          <div>
            <p style={{ fontFamily: C.mono, fontSize: 11, color: C.copper, marginBottom: spacing.sm }}>
              // projects.filter(p =&gt; p.done)
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
              Featured Projects
            </h2>
          </div>
          
          <div style={styles.controls}>
            <button
              onClick={() => setShowSearch(!showSearch)}
              style={styles.searchToggle}
            >
              🔍
            </button>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.filterSelect}
            >
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {showSearch && (
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search projects by title or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={styles.clearSearch}
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        {projects.length === 0 ? (
          <div style={styles.empty}>
            <p>No projects found.</p>
            {(filter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                style={styles.resetBtn}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={styles.stats}>
              Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
            </div>
            
            <div style={styles.grid}>
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </Reveal>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  controls: {
    display: 'flex',
    gap: spacing.md,
  },
  searchToggle: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s',
  },
  filterSelect: {
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.md,
    padding: '8px 16px',
    color: C.text,
    cursor: 'pointer',
    fontSize: '13px',
    fontFamily: C.sans,
  },
  searchBox: {
    marginBottom: spacing.lg,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px 12px 16px',
    background: C.card,
    border: `1px solid ${C.border}`,
    borderRadius: borderRadius.lg,
    color: C.text,
    fontSize: '14px',
    fontFamily: C.sans,
  },
  clearSearch: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: C.muted,
    cursor: 'pointer',
    fontSize: '16px',
  },
  stats: {
    marginBottom: spacing.lg,
    fontSize: '13px',
    color: C.muted,
    textAlign: 'right',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: spacing.lg,
  },
  empty: {
    textAlign: 'center',
    padding: spacing.xxl,
    background: C.card,
    borderRadius: borderRadius.lg,
    border: `1px solid ${C.border}`,
  },
  resetBtn: {
    marginTop: spacing.md,
    padding: '8px 16px',
    background: C.copper,
    border: 'none',
    borderRadius: borderRadius.md,
    color: '#fff',
    cursor: 'pointer',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: `3px solid ${C.border}`,
    borderTopColor: C.copper,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
};