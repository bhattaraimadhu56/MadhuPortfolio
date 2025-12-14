import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

interface ContactEditorProps {
  initialData: any;
}

export const ContactEditor: React.FC<ContactEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [viewingContactId, setViewingContactId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('contact_content', JSON.stringify(data));
  }, [data]);

  // ============ CONTACT METHOD MANAGEMENT ============
  const addContactMethod = () => {
    setData((prev: any) => ({
      ...prev,
      contactMethods: [
        ...prev.contactMethods,
        { type: 'Email', value: 'contact@example.com', icon: '✉️' }
      ]
    }));
  };

  const deleteContactMethod = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      contactMethods: prev.contactMethods.filter((_: any, i: number) => i !== index)
    }));
  };

  const updateContactMethod = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.contactMethods[index][field] = value;
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
              className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Page Subtitle</label>
            <Textarea
              value={data.pageSubtitle || ''}
              onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
              placeholder="Enter page subtitle"
              rows={2}
              className="w-4/5 resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Introduction Text</label>
            <Textarea
              value={data.introductionText || ''}
              onChange={(e) => setData({ ...data, introductionText: e.target.value })}
              placeholder="Enter introduction text"
              rows={3}
              className="w-4/5 resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Response Time</label>
            <Input
              value={data.responseTime || ''}
              onChange={(e) => setData({ ...data, responseTime: e.target.value })}
              placeholder="e.g., 24 hours"
              className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* ============ CONTACT METHODS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Contact Methods</h3>
          <Button
            onClick={addContactMethod}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Method
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Icon</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.contactMethods?.map((method: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4 text-foreground">{method.type}</td>
                  <td className="py-3 px-4 text-foreground truncate">{method.value}</td>
                  <td className="py-3 px-4 text-2xl">{method.icon}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingContactId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingContactId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteContactMethod(index)}
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

        {/* Edit Contact Method Form */}
        {editingContactId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Contact Method</h4>
            <div className="space-y-4">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Type</label>
                  <Input
                    value={data.contactMethods[editingContactId].type}
                    onChange={(e) => updateContactMethod(editingContactId, 'type', e.target.value)}
                    placeholder="e.g., Email, Phone, LinkedIn"
                    className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Value</label>
                  <Input
                    value={data.contactMethods[editingContactId].value}
                    onChange={(e) => updateContactMethod(editingContactId, 'value', e.target.value)}
                    placeholder="e.g., contact@example.com"
                    className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Icon</label>
                  <Input
                    value={data.contactMethods[editingContactId].icon}
                    onChange={(e) => updateContactMethod(editingContactId, 'icon', e.target.value)}
                    maxLength={2}
                    placeholder="e.g., ✉️"
                    className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => setEditingContactId(null)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Method
                </Button>
                <Button
                  onClick={() => setEditingContactId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Contact Method */}
        {viewingContactId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Contact Method</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Type:</strong> {data.contactMethods[viewingContactId].type}</p>
              <p className="text-foreground"><strong>Value:</strong> {data.contactMethods[viewingContactId].value}</p>
              <p className="text-2xl"><strong>Icon:</strong> {data.contactMethods[viewingContactId].icon}</p>
              <Button
                onClick={() => setViewingContactId(null)}
                variant="outline"
                className="mt-4 hover:bg-accent/50 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ============ FORM SETTINGS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Form Settings</h3>
        
        <div className="space-y-6">
          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Form Title</label>
            <Input
              value={data.formSettings?.title || ''}
              onChange={(e) => setData({
                ...data,
                formSettings: { ...data.formSettings, title: e.target.value }
              })}
              placeholder="Enter form title"
              className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Form Description</label>
            <Textarea
              value={data.formSettings?.description || ''}
              onChange={(e) => setData({
                ...data,
                formSettings: { ...data.formSettings, description: e.target.value }
              })}
              placeholder="Enter form description"
              rows={2}
              className="w-4/5 resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Submit Button Text</label>
            <Input
              value={data.formSettings?.submitButtonText || ''}
              onChange={(e) => setData({
                ...data,
                formSettings: { ...data.formSettings, submitButtonText: e.target.value }
              })}
              placeholder="e.g., Send Message"
              className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Success Message</label>
            <Textarea
              value={data.formSettings?.successMessage || ''}
              onChange={(e) => setData({
                ...data,
                formSettings: { ...data.formSettings, successMessage: e.target.value }
              })}
              placeholder="Enter success message"
              rows={2}
              className="w-4/5 resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactEditor;
