import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PortfolioEditorProps {
  initialData: any;
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
  };

  const updateField = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addProject = () => {
    const newProject = {
      title: 'New Project',
      description: 'Project description',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tags: ['Tag1', 'Tag2'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/username/repo',
      category: 'Category',
    };
    
    setEditingProject(newProject);
    setEditingIndex(data.projects.length);
  };

  const editProject = (index: number) => {
    setEditingProject({ ...data.projects[index] });
    setEditingIndex(index);
  };

  const saveProject = () => {
    if (editingProject) {
      const newProjects = [...data.projects];
      newProjects[editingIndex] = editingProject;
      updateField('projects', newProjects);
      setEditingProject(null);
      setEditingIndex(-1);
    }
  };

  const deleteProject = (index: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const newProjects = data.projects.filter((_: any, i: number) => i !== index);
      updateField('projects', newProjects);
    }
  };

  const updateProjectField = (field: string, value: any) => {
    setEditingProject((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProjectTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    updateProjectField('tags', tags);
  };

  return (
    <EditorWrapper
      fileName="portfolio_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Page Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Page Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="pageTitle">Page Title</Label>
          <Input
            id="pageTitle"
            value={data.pageTitle}
            onChange={(e) => updateField('pageTitle', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle">Page Subtitle</Label>
          <Input
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField('pageSubtitle', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emptyMessage">Empty State Message</Label>
          <Input
            id="emptyMessage"
            value={data.emptyMessage}
            onChange={(e) => updateField('emptyMessage', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="filterLabel">Filter Label</Label>
          <Input
            id="filterLabel"
            value={data.filterLabel}
            onChange={(e) => updateField('filterLabel', e.target.value)}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Projects ({data.projects.length})</h3>
          <Button size="sm" onClick={addProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.projects.map((project: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editProject(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteProject(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Editor Dialog */}
      <Dialog open={editingProject !== null} onOpenChange={(open) => !open && setEditingProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIndex >= data.projects.length ? 'Add New Project' : 'Edit Project'}
            </DialogTitle>
            <DialogDescription>
              Fill in the project details below
            </DialogDescription>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingProject.title}
                  onChange={(e) => updateProjectField('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProject.description}
                  onChange={(e) => updateProjectField('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={editingProject.image}
                  onChange={(e) => updateProjectField('image', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                <Input
                  id="edit-tags"
                  value={editingProject.tags.join(', ')}
                  onChange={(e) => updateProjectTags(e.target.value)}
                  placeholder="Python, Data Analysis, Visualization"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editingProject.category}
                  onChange={(e) => updateProjectField('category', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-liveUrl">Live URL</Label>
                <Input
                  id="edit-liveUrl"
                  value={editingProject.liveUrl}
                  onChange={(e) => updateProjectField('liveUrl', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-githubUrl">GitHub URL</Label>
                <Input
                  id="edit-githubUrl"
                  value={editingProject.githubUrl}
                  onChange={(e) => updateProjectField('githubUrl', e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={saveProject}>
                  Save Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </EditorWrapper>
  );
};
