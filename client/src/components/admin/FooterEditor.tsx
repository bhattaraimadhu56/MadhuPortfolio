import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FooterEditorProps {
  initialData: any;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({ initialData }) => {
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

  const addLink = (sectionIndex: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].links.push({
        label: 'New Link',
        href: '/',
      });
      return newData;
    });
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].links = newData.sections[sectionIndex].links.filter(
        (_: any, i: number) => i !== linkIndex
      );
      return newData;
    });
  };

  return (
    <EditorWrapper
      fileName="footer_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <div className="space-y-6">
        {/* Footer Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Footer Description</h3>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={data.description}
              onChange={(e) => updateField(['description'], e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Footer Sections */}
        {data.sections.map((section: any, sectionIndex: number) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <Button size="sm" onClick={() => addLink(sectionIndex)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input
                value={section.title}
                onChange={(e) => {
                  const newSections = [...data.sections];
                  newSections[sectionIndex].title = e.target.value;
                  updateField(['sections'], newSections);
                }}
              />
            </div>

            <div className="space-y-3">
              {section.links.map((link: any, linkIndex: number) => (
                <Card key={linkIndex} className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={link.label}
                          onChange={(e) => {
                            const newSections = [...data.sections];
                            newSections[sectionIndex].links[linkIndex].label = e.target.value;
                            updateField(['sections'], newSections);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>URL</Label>
                        <Input
                          value={link.href}
                          onChange={(e) => {
                            const newSections = [...data.sections];
                            newSections[sectionIndex].links[linkIndex].href = e.target.value;
                            updateField(['sections'], newSections);
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(sectionIndex, linkIndex)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <Separator />

        {/* Copyright */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Copyright & Credits</h3>
          
          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright Text</Label>
            <Input
              id="copyright"
              value={data.copyright}
              onChange={(e) => updateField(['copyright'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="madeWith">Made With Text (optional)</Label>
            <Input
              id="madeWith"
              value={data.madeWith}
              onChange={(e) => updateField(['madeWith'], e.target.value)}
              placeholder="Made with ❤️ by..."
            />
          </div>
        </div>
      </div>
    </EditorWrapper>
  );
};
