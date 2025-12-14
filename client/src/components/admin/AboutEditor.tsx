import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

interface AboutEditorProps {
  initialData: any;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingExperienceId, setEditingExperienceId] = useState<number | null>(null);
  const [editingEducationId, setEditingEducationId] = useState<number | null>(null);
  const [viewingExperienceId, setViewingExperienceId] = useState<number | null>(null);
  const [viewingEducationId, setViewingEducationId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('about_content', JSON.stringify(data));
  }, [data]);

  // ============ EXPERIENCE MANAGEMENT ============
  const addExperience = () => {
    setData((prev: any) => ({
      ...prev,
      workExperience: {
        ...prev.workExperience,
        items: [
          ...prev.workExperience.items,
          { position: 'New Position', company: 'Company Name', duration: '2024', description: '' }
        ]
      }
    }));
  };

  const deleteExperience = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      workExperience: {
        ...prev.workExperience,
        items: prev.workExperience.items.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.workExperience.items[index][field] = value;
      return newData;
    });
  };

  // ============ EDUCATION MANAGEMENT ============
  const addEducation = () => {
    setData((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        items: [
          ...prev.education.items,
          { degree: 'New Degree', school: 'Institution Name', year: '2024', details: '' }
        ]
      }
    }));
  };

  const deleteEducation = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        items: prev.education.items.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.education.items[index][field] = value;
      return newData;
    });
  };

  return (
    <div className="w-full space-y-8 pb-8">
      {/* ============ PAGE SETTINGS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Page Settings</h3>
        
        <div className="space-y-6">
          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Page Title</label>
            <Input
              value={data.pageTitle || ''}
              onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
              placeholder="Enter page title"
              className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Page Subtitle</label>
            <Textarea
              value={data.pageSubtitle || ''}
              onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
              placeholder="Enter page subtitle"
              rows={2}
              className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Personal Story</label>
            <Textarea
              value={data.personalStory?.content || ''}
              onChange={(e) => setData({
                ...data,
                personalStory: { ...data.personalStory, content: e.target.value }
              })}
              placeholder="Enter your personal story"
              rows={4}
              className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* ============ EXPERIENCE ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
          <Button
            onClick={addExperience}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Experience
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Position</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Duration</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.workExperience?.items?.map((exp: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-foreground">{exp.position}</td>
                  <td className="py-3 px-4 text-foreground">{exp.company}</td>
                  <td className="py-3 px-4 text-foreground">{exp.duration}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingExperienceId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingExperienceId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteExperience(index)}
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

        {/* Edit Experience Form */}
        {editingExperienceId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Experience</h4>
            <div className="space-y-4">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Position Title</label>
                <Input
                  value={data.workExperience.items[editingExperienceId].position}
                  onChange={(e) => updateExperience(editingExperienceId, 'position', e.target.value)}
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Company Name</label>
                <Input
                  value={data.workExperience.items[editingExperienceId].company}
                  onChange={(e) => updateExperience(editingExperienceId, 'company', e.target.value)}
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Duration</label>
                <Input
                  value={data.workExperience.items[editingExperienceId].duration}
                  onChange={(e) => updateExperience(editingExperienceId, 'duration', e.target.value)}
                  placeholder="e.g., 2020 - 2024"
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={data.workExperience.items[editingExperienceId].description}
                  onChange={(e) => updateExperience(editingExperienceId, 'description', e.target.value)}
                  rows={3}
                  className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setEditingExperienceId(null)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Experience
                </Button>
                <Button
                  onClick={() => setEditingExperienceId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Experience */}
        {viewingExperienceId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Experience</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Position:</strong> {data.workExperience.items[viewingExperienceId].position}</p>
              <p className="text-foreground"><strong>Company:</strong> {data.workExperience.items[viewingExperienceId].company}</p>
              <p className="text-foreground"><strong>Duration:</strong> {data.workExperience.items[viewingExperienceId].duration}</p>
              <p className="text-foreground"><strong>Description:</strong> {data.workExperience.items[viewingExperienceId].description}</p>
              <Button
                onClick={() => setViewingExperienceId(null)}
                variant="outline"
                className="mt-4 hover:bg-accent/50 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ============ EDUCATION ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Education</h3>
          <Button
            onClick={addEducation}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Education
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Degree</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Institution</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Year</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.education?.items?.map((edu: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-foreground">{edu.degree}</td>
                  <td className="py-3 px-4 text-foreground">{edu.school}</td>
                  <td className="py-3 px-4 text-foreground">{edu.year}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingEducationId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingEducationId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteEducation(index)}
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

        {/* Edit Education Form */}
        {editingEducationId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Education</h4>
            <div className="space-y-4">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Degree</label>
                <Input
                  value={data.education.items[editingEducationId].degree}
                  onChange={(e) => updateEducation(editingEducationId, 'degree', e.target.value)}
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Institution</label>
                <Input
                  value={data.education.items[editingEducationId].school}
                  onChange={(e) => updateEducation(editingEducationId, 'school', e.target.value)}
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Year</label>
                <Input
                  value={data.education.items[editingEducationId].year}
                  onChange={(e) => updateEducation(editingEducationId, 'year', e.target.value)}
                  className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Details</label>
                <Textarea
                  value={data.education.items[editingEducationId].details}
                  onChange={(e) => updateEducation(editingEducationId, 'details', e.target.value)}
                  rows={2}
                  className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setEditingEducationId(null)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Education
                </Button>
                <Button
                  onClick={() => setEditingEducationId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Education */}
        {viewingEducationId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Education</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Degree:</strong> {data.education.items[viewingEducationId].degree}</p>
              <p className="text-foreground"><strong>Institution:</strong> {data.education.items[viewingEducationId].school}</p>
              <p className="text-foreground"><strong>Year:</strong> {data.education.items[viewingEducationId].year}</p>
              <p className="text-foreground"><strong>Details:</strong> {data.education.items[viewingEducationId].details}</p>
              <Button
                onClick={() => setViewingEducationId(null)}
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

export default AboutEditor;
