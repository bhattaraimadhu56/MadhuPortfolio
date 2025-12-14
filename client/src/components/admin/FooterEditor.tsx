import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

interface FooterEditorProps {
  initialData: any;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingLinkId, setEditingLinkId] = useState<{ section: number; link: number } | null>(null);
  const [viewingLinkId, setViewingLinkId] = useState<{ section: number; link: number } | null>(null);

  useEffect(() => {
    localStorage.setItem('footer_content', JSON.stringify(data));
  }, [data]);

  // ============ LINK MANAGEMENT ============
  const addLink = (sectionIndex: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].links.push({
        label: 'New Link',
        href: '#'
      });
      return newData;
    });
  };

  const deleteLink = (sectionIndex: number, linkIndex: number) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].links = newData.sections[sectionIndex].links.filter(
        (_: any, i: number) => i !== linkIndex
      );
      return newData;
    });
  };

  const updateLink = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].links[linkIndex][field] = value;
      return newData;
    });
  };

  const updateSectionTitle = (sectionIndex: number, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.sections[sectionIndex].title = value;
      return newData;
    });
  };

  return (
    <div className="w-full space-y-8 pb-8">
      {/* ============ FOOTER SETTINGS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Footer Settings</h3>
        
        <div className="space-y-6">
          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Copyright Text</label>
            <Input
              value={data.copyright || ''}
              onChange={(e) => setData({ ...data, copyright: e.target.value })}
              placeholder="e.g., © 2024 Your Name. All rights reserved."
              className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Footer Description</label>
            <Textarea
              value={data.description || ''}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Enter footer description"
              rows={2}
              className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-4/5 space-y-2">
            <label className="text-sm font-medium text-foreground">Social Media Links</label>
            <Textarea
              value={data.socialLinks || ''}
              onChange={(e) => setData({ ...data, socialLinks: e.target.value })}
              placeholder="Enter social media links (one per line)"
              rows={3}
              className="w-full resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* ============ FOOTER SECTIONS & LINKS ============ */}
      {data.sections?.map((section: any, sectionIndex: number) => (
        <Card key={sectionIndex} className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="w-4/5 space-y-2">
              <label className="text-sm font-medium text-foreground">Section Title</label>
              <Input
                value={section.title}
                onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Button
              onClick={() => addLink(sectionIndex)}
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
            >
              <Plus size={18} /> Add Link
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Label</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">URL/Href</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {section.links?.map((link: any, linkIndex: number) => (
                  <tr key={linkIndex} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                    <td className="py-3 px-4 text-foreground">{link.label}</td>
                    <td className="py-3 px-4 text-foreground truncate">{link.href}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Button
                        onClick={() => setViewingLinkId({ section: sectionIndex, link: linkIndex })}
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/20 transition-all duration-200"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        onClick={() => setEditingLinkId({ section: sectionIndex, link: linkIndex })}
                        size="sm"
                        variant="outline"
                        className="hover:bg-primary/20 transition-all duration-200"
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        onClick={() => deleteLink(sectionIndex, linkIndex)}
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

          {/* Edit Link Form */}
          {editingLinkId?.section === sectionIndex && editingLinkId?.link !== null && (
            <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
              <h4 className="font-semibold mb-4 text-foreground">Edit Link</h4>
              <div className="space-y-4">
                <div className="w-4/5 space-y-2">
                  <label className="text-sm font-medium text-foreground">Label</label>
                  <Input
                    value={section.links[editingLinkId.link].label}
                    onChange={(e) => updateLink(sectionIndex, editingLinkId.link, 'label', e.target.value)}
                    className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="w-4/5 space-y-2">
                  <label className="text-sm font-medium text-foreground">URL/Href</label>
                  <Input
                    value={section.links[editingLinkId.link].href}
                    onChange={(e) => updateLink(sectionIndex, editingLinkId.link, 'href', e.target.value)}
                    placeholder="e.g., /about or https://example.com"
                    className="w-full transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => setEditingLinkId(null)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                  >
                    Save Link
                  </Button>
                  <Button
                    onClick={() => setEditingLinkId(null)}
                    variant="outline"
                    className="hover:bg-accent/50 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* View Link */}
          {viewingLinkId?.section === sectionIndex && viewingLinkId?.link !== null && (
            <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
              <h4 className="font-semibold mb-4 text-foreground">View Link</h4>
              <div className="space-y-2">
                <p className="text-foreground"><strong>Label:</strong> {section.links[viewingLinkId.link].label}</p>
                <p className="text-foreground"><strong>URL:</strong> {section.links[viewingLinkId.link].href}</p>
                <Button
                  onClick={() => setViewingLinkId(null)}
                  variant="outline"
                  className="mt-4 hover:bg-accent/50 transition-all duration-200"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FooterEditor;
