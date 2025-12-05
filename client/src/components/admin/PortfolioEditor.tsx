import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Save, X, ExternalLink, Github } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PortfolioEditorProps {
  initialData: any;
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
    setEditingProject(null);
    setIsDialogOpen(false);
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

  const addProject = () => {
    const newProject = {
      title: 'New Project',
      description: 'Detailed description of your project, its goals, technologies used, and outcomes achieved.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      tags: ['Technology1', 'Technology2'],
      liveUrl: 'https://example.com/project',
      githubUrl: 'https://github.com/username/project',
      category: 'Web Development',
    };
    setEditingProject(newProject);
    setIsDialogOpen(true);
  };

  const editProject = (index: number) => {
    setEditingProject({ ...data.projects[index], _index: index });
    setIsDialogOpen(true);
  };

  const saveProject = () => {
    if (!editingProject) return;

    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      if (editingProject._index !== undefined) {
        // Update existing project
        newData.projects[editingProject._index] = {
          title: editingProject.title,
          description: editingProject.description,
          image: editingProject.image,
          tags: editingProject.tags,
          liveUrl: editingProject.liveUrl,
          githubUrl: editingProject.githubUrl,
          category: editingProject.category,
        };
      } else {
        // Add new project
        newData.projects = [
          {
            title: editingProject.title,
            description: editingProject.description,
            image: editingProject.image,
            tags: editingProject.tags,
            liveUrl: editingProject.liveUrl,
            githubUrl: editingProject.githubUrl,
            category: editingProject.category,
          },
          ...newData.projects,
        ];
      }
      return newData;
    });

    setEditingProject(null);
    setIsDialogOpen(false);
  };

  const removeProject = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setData((prev: any) => ({
        ...prev,
        projects: prev.projects.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  const updateEditingProject = (field: string, value: any) => {
    setEditingProject((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = () => {
    if (editingProject) {
      setEditingProject((prev: any) => ({
        ...prev,
        tags: [...prev.tags, 'new-tag'],
      }));
    }
  };

  const updateTag = (index: number, value: string) => {
    if (editingProject) {
      const newTags = [...editingProject.tags];
      newTags[index] = value;
      setEditingProject((prev: any) => ({
        ...prev,
        tags: newTags,
      }));
    }
  };

  const removeTag = (index: number) => {
    if (editingProject) {
      setEditingProject((prev: any) => ({
        ...prev,
        tags: prev.tags.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  return (
    <EditorWrapper
      data={data}
      hasChanges={hasChanges}
      onReset={handleReset}
      fileName="portfolio_content.json"
    >
      <div className="space-y-8">
        {/* Page Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Page Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={data.pageTitle}
                  onChange={(e) => updateField(['pageTitle'], e.target.value)}
                  placeholder="Portfolio"
                />
              </div>
              <div>
                <Label htmlFor="filterLabel">Filter Label</Label>
                <Input
                  id="filterLabel"
                  value={data.filterLabel}
                  onChange={(e) => updateField(['filterLabel'], e.target.value)}
                  placeholder="Filter by skill:"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pageSubtitle">Page Subtitle</Label>
              <Input
                id="pageSubtitle"
                value={data.pageSubtitle}
                onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
                placeholder="Showcase of my projects"
              />
            </div>
            <div>
              <Label htmlFor="emptyMessage">Empty Message</Label>
              <Input
                id="emptyMessage"
                value={data.emptyMessage}
                onChange={(e) => updateField(['emptyMessage'], e.target.value)}
                placeholder="No projects yet"
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Projects Management */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Projects ({data.projects.length})</h3>
            <Button onClick={addProject} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.projects.map((project: any, index: number) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-48 h-32 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="px-2 py-1 bg-secondary rounded">{project.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 text-xs">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Github className="h-3 w-3" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editProject(index)}
                        className="gap-2"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Edit/Add Project Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProject?._index !== undefined ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <DialogDescription>
                Fill in the project details below. Provide comprehensive information about your work.
              </DialogDescription>
            </DialogHeader>

            {editingProject && (
              <div className="space-y-6 py-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Basic Information</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Project Title *</Label>
                      <Input
                        id="edit-title"
                        value={editingProject.title}
                        onChange={(e) => updateEditingProject('title', e.target.value)}
                        placeholder="My Awesome Project"
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-category">Category *</Label>
                      <Input
                        id="edit-category"
                        value={editingProject.category}
                        onChange={(e) => updateEditingProject('category', e.target.value)}
                        placeholder="Web Development, Data Analysis, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description *</Label>
                      <Textarea
                        id="edit-description"
                        value={editingProject.description}
                        onChange={(e) => updateEditingProject('description', e.target.value)}
                        placeholder="Detailed description of your project, technologies used, challenges overcome, and results achieved..."
                        rows={8}
                        className="resize-y"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Provide a comprehensive description of your project (200-500 words recommended)
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Links */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Project Links</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="edit-image">Project Image URL *</Label>
                      <Input
                        id="edit-image"
                        value={editingProject.image}
                        onChange={(e) => updateEditingProject('image', e.target.value)}
                        placeholder="https://example.com/project-image.jpg"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Use a high-quality image (recommended: 800x500px or 16:10 ratio)
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="edit-liveUrl">Live Demo URL</Label>
                      <Input
                        id="edit-liveUrl"
                        value={editingProject.liveUrl}
                        onChange={(e) => updateEditingProject('liveUrl', e.target.value)}
                        placeholder="https://example.com/demo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-githubUrl">GitHub Repository URL</Label>
                      <Input
                        id="edit-githubUrl"
                        value={editingProject.githubUrl}
                        onChange={(e) => updateEditingProject('githubUrl', e.target.value)}
                        placeholder="https://github.com/username/repository"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tags/Technologies */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Technologies & Tags</h4>
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tag
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {editingProject.tags.map((tag: string, tagIndex: number) => (
                      <div key={tagIndex} className="flex gap-2">
                        <Input
                          value={tag}
                          onChange={(e) => updateTag(tagIndex, e.target.value)}
                          placeholder="Technology name"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(tagIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add technologies, tools, and frameworks used in this project
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingProject(null);
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={saveProject} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </EditorWrapper>
  );
};
