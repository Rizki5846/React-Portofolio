import React, { createContext, useContext, useState, useEffect } from 'react';
import * as projectService from '../services/projectService';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    loadProjects();
  }, []);

  // Filter projects
  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        let data;
        
        if (searchQuery) {
          data = await projectService.searchProjects(searchQuery);
        } else if (filter !== 'all') {
          data = await projectService.filterByType(filter);
        } else {
          data = await projectService.getProjects();
        }
        
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    applyFilters();
  }, [filter, searchQuery]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project, imageFile) => {
    try {
      setLoading(true);
      const newProject = await projectService.addProject(project, imageFile);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, updatedProject, imageFile) => {
    try {
      setLoading(true);
      const project = await projectService.updateProject(id, updatedProject, imageFile);
      setProjects(prev => prev.map(p => p.id === id ? project : p));
      return project;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      await projectService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      loading,
      error,
      filter,
      searchQuery,
      addProject,
      updateProject,
      deleteProject,
      loadProjects,
      setFilter,
      setSearchQuery
    }}>
      {children}
    </ProjectContext.Provider>
  );
};