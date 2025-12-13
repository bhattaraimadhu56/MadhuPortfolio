import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Eye, Save, X, ExternalLink, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PortfolioEditorProps {
  initialData: any;
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProject, setNewProject] = useState<any>(null);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
    setEditingIndex(null);
    setViewingIndex(null);
    setIsAddingNew(false);
    setNewProject(null);
  };

  const updateField = (path: string[], value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }

      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  // Convert file to base64
  const handleImageUpload = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      callback(base64);
    };
    reader.readAsDataURL(file);
  };

  // Add new project
  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewProject({
      title: '',
      description: '',
      image: '',
      tags: [],
      liveUrl: '',
      githubUrl: '',
      category: '',
    });
  };

  // Save new project
  const handleSaveNewProject = () => {
    if (!newProject.title || !newProject.description || !newProject.category) {
      alert('Please fill in all required fields: Title, Description, and Category');
      return;
    }

    setData((prev: any) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));

    setIsAddingNew(false);
    setNewProject(null);
  };

  // Cancel add
  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewProject(null);
  };

  // Edit project
  const handleEditProject = (index: number) => {
    setEditingIndex(index);
  };

  // Save edited project
  const handleSaveEditProject = (index: number) => {
    const project = data.projects[index];
    if (!project.title || !project.description || !project.category) {
      alert('Please fill in all required fields: Title, Description, and Category');
      return;
    }

    setEditingIndex(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setData(initialData);
  };

  // Delete project
  const handleDeleteProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setData((prev: any) => ({
        ...prev,
        projects: prev.projects.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  // View project
  const handleViewProject = (index: number) => {
    setViewingIndex(index);
  };

  // Close view
  const handleCloseView = () => {
    setViewingIndex(null);
  };

  // Update project field during edit
  const updateProjectField = (index: number, field: string, value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.projects[index][field] = value;
      return newData;
    });
  };

  // Update new project field
  const updateNewProjectField = (field: string, value: any) => {
    setNewProject((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add tag to new project
  const addTagToNewProject = () => {
    setNewProject((prev: any) => ({
      ...prev,
      tags: [...(prev.tags || []), 'new-tag'],
    }));
  };

  // Update tag in new project
  const updateNewProjectTag = (tagIndex: number, value: string) => {
    setNewProject((prev: any) => {
      const newTags = [...(prev.tags || [])];
      newTags[tagIndex] = value;
      return { ...prev, tags: newTags };
    });
  };

  // Remove tag from new project
  const removeNewProjectTag = (tagIndex: number) => {
    setNewProject((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((_: any, i: number) => i !== tagIndex),
    }));
  };

  // Add tag to editing project
  const addTagToEditingProject = (index: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.projects[index].tags = [...(newData.projects[index].tags || []), 'new-tag'];
      return newData;
    });
  };

  // Update tag in editing project
  const updateEditingProjectTag = (projectIndex: number, tagIndex: number, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.projects[projectIndex].tags[tagIndex] = value;
      return newData;
    });
  };

  // Remove tag from editing project
  const removeEditingProjectTag = (projectIndex: number, tagIndex: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.projects[projectIndex].tags = newData.projects[projectIndex].tags.filter(
        (_: any, i: number) => i !== tagIndex
      );
      return newData;
    });
  };

  return (
    <EditorWrapper
      fileName="portfolio_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Page Settings */}
      <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Page Settings
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2 w-4/5">
            <Label htmlFor="pageTitle" className="text-sm font-semibold">Page Title</Label>
            <Input
              id="pageTitle"
              value={data.pageTitle}
              onChange={(e) => updateField(['pageTitle'], e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2 w-4/5">
            <Label htmlFor="filterLabel" className="text-sm font-semibold">Filter Label</Label>
            <Input
              id="filterLabel"
              value={data.filterLabel}
              onChange={(e) => updateField(['filterLabel'], e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2 w-4/5">
            <Label htmlFor="pageSubtitle" className="text-sm font-semibold">Page Subtitle</Label>
            <Input
              id="pageSubtitle"
              value={data.pageSubtitle}
              onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2 w-4/5">
            <Label htmlFor="emptyMessage" className="text-sm font-semibold">Empty Message</Label>
            <Input
              id="emptyMessage"
              value={data.emptyMessage}
              onChange={(e) => updateField(['emptyMessage'], e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Projects Table */}
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Portfolio Projects</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {data.projects.length} {data.projects.length === 1 ? 'project' : 'projects'} total
            </p>
          </div>
          {!isAddingNew && (
            <Button 
              size="lg" 
              onClick={handleAddNew}
              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Project
            </Button>
          )}
        </div>

        {/* Add New Project Form */}
        {isAddingNew && newProject && (
          <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <h4 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Add New Project</h4>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Basic Information</h5>
                
                <div className="space-y-2 w-4/5">
                  <Label className="text-sm font-semibold">Project Title *</Label>
                  <Input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => updateNewProjectField('title', e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 w-4/5">
                  <Label className="text-sm font-semibold">Category *</Label>
                  <Input
                    type="text"
                    value={newProject.category}
                    onChange={(e) => updateNewProjectField('category', e.target.value)}
                    placeholder="Web Development, Data Analysis, etc."
                    className="w-full"
                  />
                </div>

                <div className="space-y-2 w-4/5">
                  <Label className="text-sm font-semibold">Description *</Label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => updateNewProjectField('description', e.target.value)}
                    placeholder="Detailed description of your project, technologies used, challenges overcome, and results achieved..."
                    rows={2}
                    className="w-full resize-y min-h-[60px]"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Project Image</h5>
                
                <div className="space-y-2 w-4/5">
                  <Label className="text-sm font-semibold">Upload Image from Computer</Label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, (base64) => {
                            updateNewProjectField('image', base64);
                          });
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  {newProject.image && (
                    <div className="mt-4">
                      <img
                        src={newProject.image}
                        alt="Preview"
                        className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Project Links */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Project Links</h5>
                
                <div className="space-y-4 w-4/5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Live Demo URL</Label>
                    <Input
                      type="url"
                      value={newProject.liveUrl}
                      onChange={(e) => updateNewProjectField('liveUrl', e.target.value)}
                      placeholder="https://example.com/demo"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">GitHub Repository URL</Label>
                    <Input
                      type="url"
                      value={newProject.githubUrl}
                      onChange={(e) => updateNewProjectField('githubUrl', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Technologies & Tags</h5>
                
                <div className="space-y-3 w-4/5">
                  {newProject.tags?.map((tag: string, tagIndex: number) => (
                    <div key={tagIndex} className="flex gap-2">
                      <Input
                        type="text"
                        value={tag}
                        onChange={(e) => updateNewProjectTag(tagIndex, e.target.value)}
                        placeholder="Technology or skill"
                        className="w-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeNewProjectTag(tagIndex)}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTagToNewProject}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t w-4/5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelAdd}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveNewProject}
                  className="w-full sm:w-auto gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Project
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Tags</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project: any, index: number) => (
                <tr key={index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-200">{project.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{project.category}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {project.tags?.slice(0, 2).map((tag: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-primary/15 text-primary rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2 justify-center">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewProject(index)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditProject(index)}
                        className="hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteProject(index)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.projects.length === 0 && !isAddingNew && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p>No projects yet. Click "Add New Project" to create one.</p>
          </div>
        )}
      </div>

      {/* View Project */}
      {viewingIndex !== null && data.projects[viewingIndex] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{data.projects[viewingIndex].title}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseView}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                {data.projects[viewingIndex].image && (
                  <img
                    src={data.projects[viewingIndex].image}
                    alt={data.projects[viewingIndex].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</p>
                  <p className="text-muted-foreground">{data.projects[viewingIndex].category}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</p>
                  <p className="text-muted-foreground whitespace-pre-wrap">{data.projects[viewingIndex].description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.projects[viewingIndex].tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-primary/15 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Separator />
                <div className="flex gap-4">
                  {data.projects[viewingIndex].liveUrl && (
                    <a
                      href={data.projects[viewingIndex].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {data.projects[viewingIndex].githubUrl && (
                    <a
                      href={data.projects[viewingIndex].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseView}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    handleCloseView();
                    handleEditProject(viewingIndex);
                  }}
                  className="flex-1"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Project */}
      {editingIndex !== null && data.projects[editingIndex] && (
        <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent mt-8">
          <h4 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Edit Project</h4>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Basic Information</h5>
              
              <div className="space-y-2 w-4/5">
                <Label className="text-sm font-semibold">Project Title *</Label>
                <Input
                  type="text"
                  value={data.projects[editingIndex].title}
                  onChange={(e) => updateProjectField(editingIndex, 'title', e.target.value)}
                  placeholder="My Awesome Project"
                  className="w-full"
                />
              </div>

              <div className="space-y-2 w-4/5">
                <Label className="text-sm font-semibold">Category *</Label>
                <Input
                  type="text"
                  value={data.projects[editingIndex].category}
                  onChange={(e) => updateProjectField(editingIndex, 'category', e.target.value)}
                  placeholder="Web Development, Data Analysis, etc."
                  className="w-full"
                />
              </div>

              <div className="space-y-2 w-4/5">
                <Label className="text-sm font-semibold">Description *</Label>
                <Textarea
                  value={data.projects[editingIndex].description}
                  onChange={(e) => updateProjectField(editingIndex, 'description', e.target.value)}
                  placeholder="Detailed description of your project..."
                  rows={2}
                  className="w-full resize-y min-h-[60px]"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Project Image</h5>
              
              <div className="space-y-2 w-4/5">
                <Label className="text-sm font-semibold">Upload Image from Computer</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, (base64) => {
                          updateProjectField(editingIndex, 'image', base64);
                        });
                      }
                    }}
                    className="w-full"
                  />
                </div>
                {data.projects[editingIndex].image && (
                  <div className="mt-4">
                    <img
                      src={data.projects[editingIndex].image}
                      alt="Preview"
                      className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Project Links */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Project Links</h5>
              
              <div className="space-y-4 w-4/5">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Live Demo URL</Label>
                  <Input
                    type="url"
                    value={data.projects[editingIndex].liveUrl}
                    onChange={(e) => updateProjectField(editingIndex, 'liveUrl', e.target.value)}
                    placeholder="https://example.com/demo"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">GitHub Repository URL</Label>
                  <Input
                    type="url"
                    value={data.projects[editingIndex].githubUrl}
                    onChange={(e) => updateProjectField(editingIndex, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Technologies & Tags</h5>
              
              <div className="space-y-3 w-4/5">
                {data.projects[editingIndex].tags?.map((tag: string, tagIndex: number) => (
                  <div key={tagIndex} className="flex gap-2">
                    <Input
                      type="text"
                      value={tag}
                      onChange={(e) => updateEditingProjectTag(editingIndex, tagIndex, e.target.value)}
                      placeholder="Technology or skill"
                      className="w-full"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeEditingProjectTag(editingIndex, tagIndex)}
                      className="text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addTagToEditingProject(editingIndex)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t w-4/5">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                className="w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSaveEditProject(editingIndex)}
                className="w-full sm:w-auto gap-2"
              >
                <Save className="h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>
        </Card>
      )}
    </EditorWrapper>
  );
};
