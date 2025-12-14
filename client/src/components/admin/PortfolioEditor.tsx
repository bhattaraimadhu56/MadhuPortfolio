import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

interface PortfolioEditorProps {
  initialData: any;
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [viewingProjectId, setViewingProjectId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('portfolio_content', JSON.stringify(data));
  }, [data]);

  // ============ PROJECT MANAGEMENT ============
  const addProject = () => {
    setData((prev: any) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: 'New Project',
          description: 'Project description',
          image: '',
          tags: [],
          liveUrl: '',
          githubUrl: '',
          category: 'Web Development'
        }
      ]
    }));
  };

  const deleteProject = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateProject = (index: number, field: string, value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.projects[index][field] = value;
      return newData;
    });
  };

  const handleProjectImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProject(index, 'image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full space-y-8 pb-8">
      {/* ============ PAGE SETTINGS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Page Settings</h3>
        
        <div className="space-y-6">
          <div className="w-[90%] space-y-2">
            <label className="text-sm font-medium text-foreground">Page Title</label>
            <Input
              value={data.pageTitle || ''}
              onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
              placeholder="Enter page title"
              className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-[90%] space-y-2">
            <label className="text-sm font-medium text-foreground">Page Subtitle</label>
            <Textarea
              value={data.pageSubtitle || ''}
              onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
              placeholder="Enter page subtitle"
              rows={2}
              className="w-[90%] resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-[90%] space-y-2">
            <label className="text-sm font-medium text-foreground">Portfolio Description</label>
            <Textarea
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Enter portfolio description"
              rows={3}
              className="w-[90%] resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* ============ PROJECTS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Projects</h3>
          <Button
            onClick={addProject}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Project
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Image</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.projects?.map((project: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-foreground">{project.title}</td>
                  <td className="py-3 px-4 text-foreground">{project.category}</td>
                  <td className="py-3 px-4">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-10 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingProjectId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingProjectId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteProject(index)}
                      size="sm"
                      variant="destructive"
                      className="hover:bg-destructive/90 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Project Form */}
        {editingProjectId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Project</h4>
            <div className="space-y-4">
              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Project Title</label>
                <Input
                  value={data.projects[editingProjectId].title}
                  onChange={(e) => updateProject(editingProjectId, 'title', e.target.value)}
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Input
                  value={data.projects[editingProjectId].category}
                  onChange={(e) => updateProject(editingProjectId, 'category', e.target.value)}
                  placeholder="e.g., Web Development, Mobile App"
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={data.projects[editingProjectId].description}
                  onChange={(e) => updateProject(editingProjectId, 'description', e.target.value)}
                  rows={3}
                  className="w-[90%] resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleProjectImageUpload(editingProjectId, e.target.files[0]);
                    }
                  }}
                  className="w-[90%] p-2 border border-border rounded transition-all duration-200 hover:border-primary/50"
                />
                {data.projects[editingProjectId].image && (
                  <img
                    src={data.projects[editingProjectId].image}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded mt-2"
                  />
                )}
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Tags (comma-separated)</label>
                <Input
                  value={Array.isArray(data.projects[editingProjectId].tags) 
                    ? data.projects[editingProjectId].tags.join(', ')
                    : ''}
                  onChange={(e) => updateProject(editingProjectId, 'tags', e.target.value.split(',').map(t => t.trim()))}
                  placeholder="e.g., React, TypeScript, Tailwind"
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Live URL</label>
                <Input
                  value={data.projects[editingProjectId].liveUrl}
                  onChange={(e) => updateProject(editingProjectId, 'liveUrl', e.target.value)}
                  placeholder="https://example.com"
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">GitHub URL</label>
                <Input
                  value={data.projects[editingProjectId].githubUrl}
                  onChange={(e) => updateProject(editingProjectId, 'githubUrl', e.target.value)}
                  placeholder="https://github.com/username/repo"
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setEditingProjectId(null)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Project
                </Button>
                <Button
                  onClick={() => setEditingProjectId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Project */}
        {viewingProjectId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Project</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Title:</strong> {data.projects[viewingProjectId].title}</p>
              <p className="text-foreground"><strong>Category:</strong> {data.projects[viewingProjectId].category}</p>
              <p className="text-foreground"><strong>Description:</strong> {data.projects[viewingProjectId].description}</p>
              {data.projects[viewingProjectId].image && (
                <img
                  src={data.projects[viewingProjectId].image}
                  alt={data.projects[viewingProjectId].title}
                  className="h-48 w-full object-cover rounded"
                />
              )}
              <p className="text-foreground"><strong>Tags:</strong> {Array.isArray(data.projects[viewingProjectId].tags) ? data.projects[viewingProjectId].tags.join(', ') : ''}</p>
              <p className="text-foreground"><strong>Live URL:</strong> {data.projects[viewingProjectId].liveUrl}</p>
              <p className="text-foreground"><strong>GitHub URL:</strong> {data.projects[viewingProjectId].githubUrl}</p>
              <Button
                onClick={() => setViewingProjectId(null)}
                variant="outline"
                className="mt-4 hover:bg-accent/50 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PortfolioEditor;
