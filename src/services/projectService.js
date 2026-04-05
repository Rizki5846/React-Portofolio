import { supabase } from './supabaseClient';

// Helper untuk upload image
const uploadImage = async (file, oldImageUrl = null) => {
  if (!file) return null;
  
  try {
    // Delete old image if exists
    if (oldImageUrl) {
      const oldPath = oldImageUrl.split('/').pop();
      const { error: deleteError } = await supabase.storage
        .from('project-images')
        .remove([oldPath]);
      
      if (deleteError) {
        console.warn('Error deleting old image:', deleteError);
      }
    }
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // Upload new image
    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) throw uploadError;
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Get all projects
export const getProjects = async () => {
  try {
    console.log('Fetching projects from Supabase...');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    console.log(`✅ Successfully fetched ${data?.length || 0} projects`);
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
};

// Get single project
export const getProjectById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
};

// Add new project
export const addProject = async (project, imageFile) => {
  try {
    console.log('Adding new project...', project.title);
    
    // Upload image if exists
    let imageUrl = null;
    if (imageFile) {
      console.log('Uploading image...');
      imageUrl = await uploadImage(imageFile);
      console.log('Image uploaded:', imageUrl);
    }
    
    // Insert project data
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: project.title,
        description: project.desc,
        tech: project.tech,
        type: project.type,
        emoji: project.emoji,
        color: project.color,
        image_url: imageUrl,
        link: project.link || null,
      }])
      .select()
      .single();
      
    if (error) throw error;
    
    console.log('✅ Project added successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error adding project:', error);
    throw new Error(`Failed to add project: ${error.message}`);
  }
};

// Update project
export const updateProject = async (id, project, imageFile) => {
  try {
    console.log('Updating project:', id);
    
    // Get old project data
    const { data: oldProject, error: fetchError } = await supabase
      .from('projects')
      .select('image_url')
      .eq('id', id)
      .single();
      
    if (fetchError) throw fetchError;
      
    // Upload new image if exists
    let imageUrl = oldProject?.image_url;
    if (imageFile) {
      console.log('Uploading new image...');
      imageUrl = await uploadImage(imageFile, oldProject?.image_url);
      console.log('New image uploaded:', imageUrl);
    }
    
    // Update project
    const { data, error } = await supabase
      .from('projects')
      .update({
        title: project.title,
        description: project.desc,
        tech: project.tech,
        type: project.type,
        emoji: project.emoji,
        color: project.color,
        image_url: imageUrl,
        link: project.link || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    console.log('✅ Project updated successfully:', id);
    return data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error(`Failed to update project: ${error.message}`);
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    console.log('Deleting project:', id);
    
    // Get project image URL
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('image_url')
      .eq('id', id)
      .single();
      
    if (fetchError) throw fetchError;
      
    // Delete image from storage if exists
    if (project?.image_url) {
      const imagePath = project.image_url.split('/').pop();
      const { error: deleteImageError } = await supabase.storage
        .from('project-images')
        .remove([imagePath]);
      
      if (deleteImageError) {
        console.warn('Error deleting image:', deleteImageError);
      }
    }
    
    // Delete project from database
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    console.log('✅ Project deleted successfully:', id);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error(`Failed to delete project: ${error.message}`);
  }
};

// Search projects
export const searchProjects = async (query) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .or(`title.ilike.%${query}%, tech.cs.{${query}}`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
};

// Filter by type
export const filterByType = async (type) => {
  try {
    let query = supabase.from('projects').select('*');
    
    if (type !== 'all') {
      query = query.eq('type', type);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error filtering projects:', error);
    return [];
  }
};