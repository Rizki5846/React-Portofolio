import { useState, useEffect } from 'react';
import { Reveal } from "../ui/Reveal";
import ProjectCard from "../project/ProjectCard";
import { useProjects } from "../../context/ProjectContext";
import { useTheme } from "../../context/themeContext";
import { TiltCard } from "../ui/TiltCard";

export const Projects = () => {
  const { projects, loading, error, filter, setFilter, searchQuery, setSearchQuery } = useProjects();
  const { colors } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Mobile: 2 baris x 2 kolom
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6); // Tablet: 2 baris x 3 kolom
      } else {
        setItemsPerPage(6); // Desktop: 2 baris x 3 kolom
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filterOptions = [
    { value: 'all', label: 'All', icon: '📁' },
    { value: 'Web Dev', label: 'Web', icon: '🌐' },
    { value: 'IT Support', label: 'IT', icon: '🔧' },
    { value: 'Mobile Dev', label: 'Mobile', icon: '📱' },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div id="projects" style={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: 'center', color: colors.muted }}>
          <div className="loading-spinner" style={{ margin: '0 auto 16px' }}></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div id="projects" style={{ padding: "60px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal animation="fadeUp">
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginBottom: 32,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 16,
            }}>
              <div>
                <p style={{ fontFamily: colors.mono, fontSize: 11, color: colors.copper, marginBottom: 8 }}>
                  // featured work
                </p>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 700, margin: 0, color: colors.text }}>
                  Featured Projects
                </h2>
                <p style={{ color: colors.muted, marginTop: 8, fontSize: 'clamp(12px, 3vw, 14px)' }}>
                  {projects.length} project{projects.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
              }}>
                {/* Filter */}
                <select
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  style={{
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: '8px 16px',
                    color: colors.text,
                    cursor: 'pointer',
                    fontSize: 'clamp(12px, 3vw, 13px)',
                    fontFamily: colors.sans,
                  }}
                >
                  {filterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.icon} {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="🔍 Search projects..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 12,
                  color: colors.text,
                  fontSize: 'clamp(13px, 3.5vw, 14px)',
                  fontFamily: colors.sans,
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: colors.muted,
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Projects Grid */}
          {currentProjects.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: colors.card,
              borderRadius: 16,
              border: `1px solid ${colors.border}`,
            }}>
              <p style={{ fontSize: 16, marginBottom: 16 }}>No projects found.</p>
              {(filter !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  style={{
                    marginTop: 16,
                    padding: '8px 24px',
                    background: colors.copper,
                    border: 'none',
                    borderRadius: 8,
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(16px, 4vw, 24px)',
                alignItems: 'stretch',
                marginBottom: 40,
              }}>
                {currentProjects.map((project, index) => (
                  <div 
                    key={project.id}
                    style={{ height: '100%', display: 'flex' }}
                  >
                    <TiltCard maxTilt={5} style={{ width: '100%', height: '100%' }}>
                      <ProjectCard project={project} index={startIndex + index} />
                    </TiltCard>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 'clamp(8px, 3vw, 16px)',
                  marginTop: 40,
                  paddingTop: 20,
                  borderTop: `1px solid ${colors.border}`,
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{
                      padding: '8px 16px',
                      background: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      color: currentPage === 1 ? colors.muted : colors.text,
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      fontSize: 'clamp(12px, 3vw, 13px)',
                      opacity: currentPage === 1 ? 0.5 : 1,
                    }}
                  >
                    ← Prev
                  </button>
                  
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        style={{
                          width: 'clamp(32px, 8vw, 36px)',
                          height: 'clamp(32px, 8vw, 36px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: currentPage === page ? colors.copper : colors.card,
                          border: `1px solid ${currentPage === page ? colors.copper : colors.border}`,
                          borderRadius: 8,
                          color: currentPage === page ? '#fff' : colors.text,
                          cursor: 'pointer',
                          fontSize: 'clamp(12px, 3vw, 13px)',
                          fontWeight: currentPage === page ? 600 : 400,
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '8px 16px',
                      background: colors.card,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      color: currentPage === totalPages ? colors.muted : colors.text,
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: 'clamp(12px, 3vw, 13px)',
                      opacity: currentPage === totalPages ? 0.5 : 1,
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </Reveal>
      </div>
    </>
  );
};