import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AboutEditorProps {
  initialData: any;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
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

  const addWorkExperience = () => {
    setData((prev: any) => ({
      ...prev,
      workExperience: {
        ...prev.workExperience,
        items: [
          ...prev.workExperience.items,
          {
            position: 'Position Title',
            company: 'Company Name',
            duration: '2023 - Present',
            description: 'Job description',
          },
        ],
      },
    }));
  };

  const removeWorkExperience = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      workExperience: {
        ...prev.workExperience,
        items: prev.workExperience.items.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const addEducation = () => {
    setData((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        items: [
          ...prev.education.items,
          {
            degree: 'Degree Name',
            school: 'School Name',
            year: '2023',
            details: 'Additional details',
          },
        ],
      },
    }));
  };

  const removeEducation = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      education: {
        ...prev.education,
        items: prev.education.items.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const addCertification = () => {
    setData((prev: any) => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        items: [
          ...prev.certifications.items,
          {
            name: 'Certification Name',
            issuer: 'Issuing Organization',
            year: '2023',
          },
        ],
      },
    }));
  };

  const removeCertification = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      certifications: {
        ...prev.certifications,
        items: prev.certifications.items.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  return (
    <EditorWrapper
      fileName="about_content.json"
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
            onChange={(e) => updateField(['pageTitle'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle">Page Subtitle</Label>
          <Textarea
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
            rows={2}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Personal Story */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Story</h3>
        
        <div className="space-y-2">
          <Label htmlFor="storyTitle">Section Title</Label>
          <Input
            id="storyTitle"
            value={data.personalStory.title}
            onChange={(e) => updateField(['personalStory', 'title'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storyContent">Content</Label>
          <Textarea
            id="storyContent"
            value={data.personalStory.content}
            onChange={(e) => updateField(['personalStory', 'content'], e.target.value)}
            rows={8}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Work Experience */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button size="sm" onClick={addWorkExperience}>
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workTitle">Section Title</Label>
          <Input
            id="workTitle"
            value={data.workExperience.title}
            onChange={(e) => updateField(['workExperience', 'title'], e.target.value)}
          />
        </div>

        {data.workExperience.items.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={item.position}
                      onChange={(e) => {
                        const newItems = [...data.workExperience.items];
                        newItems[index].position = e.target.value;
                        updateField(['workExperience', 'items'], newItems);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={item.company}
                      onChange={(e) => {
                        const newItems = [...data.workExperience.items];
                        newItems[index].company = e.target.value;
                        updateField(['workExperience', 'items'], newItems);
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={item.duration}
                    onChange={(e) => {
                      const newItems = [...data.workExperience.items];
                      newItems[index].duration = e.target.value;
                      updateField(['workExperience', 'items'], newItems);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...data.workExperience.items];
                      newItems[index].description = e.target.value;
                      updateField(['workExperience', 'items'], newItems);
                    }}
                    rows={3}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeWorkExperience(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Education */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button size="sm" onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eduTitle">Section Title</Label>
          <Input
            id="eduTitle"
            value={data.education.title}
            onChange={(e) => updateField(['education', 'title'], e.target.value)}
          />
        </div>

        {data.education.items.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={item.degree}
                      onChange={(e) => {
                        const newItems = [...data.education.items];
                        newItems[index].degree = e.target.value;
                        updateField(['education', 'items'], newItems);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>School</Label>
                    <Input
                      value={item.school}
                      onChange={(e) => {
                        const newItems = [...data.education.items];
                        newItems[index].school = e.target.value;
                        updateField(['education', 'items'], newItems);
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={item.year}
                    onChange={(e) => {
                      const newItems = [...data.education.items];
                      newItems[index].year = e.target.value;
                      updateField(['education', 'items'], newItems);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Details</Label>
                  <Input
                    value={item.details}
                    onChange={(e) => {
                      const newItems = [...data.education.items];
                      newItems[index].details = e.target.value;
                      updateField(['education', 'items'], newItems);
                    }}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Separator className="my-6" />

      {/* Certifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Certifications</h3>
          <Button size="sm" onClick={addCertification}>
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="certTitle">Section Title</Label>
          <Input
            id="certTitle"
            value={data.certifications.title}
            onChange={(e) => updateField(['certifications', 'title'], e.target.value)}
          />
        </div>

        {data.certifications.items.map((item: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      const newItems = [...data.certifications.items];
                      newItems[index].name = e.target.value;
                      updateField(['certifications', 'items'], newItems);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuer</Label>
                  <Input
                    value={item.issuer}
                    onChange={(e) => {
                      const newItems = [...data.certifications.items];
                      newItems[index].issuer = e.target.value;
                      updateField(['certifications', 'items'], newItems);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    value={item.year}
                    onChange={(e) => {
                      const newItems = [...data.certifications.items];
                      newItems[index].year = e.target.value;
                      updateField(['certifications', 'items'], newItems);
                    }}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCertification(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </EditorWrapper>
  );
};
