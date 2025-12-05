import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContactEditorProps {
  initialData: any;
}

export const ContactEditor: React.FC<ContactEditorProps> = ({ initialData }) => {
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

  return (
    <EditorWrapper
      fileName="contact_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <div className="space-y-6">
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

        {/* Contact Form Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Form Settings</h3>
          
          <div className="space-y-2">
            <Label htmlFor="formTitle">Form Title</Label>
            <Input
              id="formTitle"
              value={data.contactForm.title}
              onChange={(e) => updateField(['contactForm', 'title'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="formDescription">Form Description</Label>
            <Textarea
              id="formDescription"
              value={data.contactForm.description}
              onChange={(e) => updateField(['contactForm', 'description'], e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitButton">Submit Button Text</Label>
            <Input
              id="submitButton"
              value={data.contactForm.submitButton}
              onChange={(e) => updateField(['contactForm', 'submitButton'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successMessage">Success Message</Label>
            <Input
              id="successMessage"
              value={data.contactForm.successMessage}
              onChange={(e) => updateField(['contactForm', 'successMessage'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="errorMessage">Error Message</Label>
            <Input
              id="errorMessage"
              value={data.contactForm.errorMessage}
              onChange={(e) => updateField(['contactForm', 'errorMessage'], e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Form field configuration (name, email, subject, message) is managed in the code. 
            This editor allows you to customize the labels and messages displayed to users.
          </p>
        </div>
      </div>
    </EditorWrapper>
  );
};
