import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GlobalSettingsEditorProps {
  initialData: any;
}

export const GlobalSettingsEditor: React.FC<GlobalSettingsEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingNavId, setEditingNavId] = useState<number | null>(null);
  const [viewingNavId, setViewingNavId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('global_settings', JSON.stringify(data));
  }, [data]);

  // ============ NAVIGATION MANAGEMENT ============
  const addNavigationLink = () => {
    setData((prev: any) => ({
      ...prev,
      header: {
        ...prev.header,
        navigationLinks: [
          ...prev.header.navigationLinks,
          { label: 'New Page', href: '/new-page' }
        ]
      }
    }));
  };

  const deleteNavigationLink = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      header: {
        ...prev.header,
        navigationLinks: prev.header.navigationLinks.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateNavigationLink = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.header.navigationLinks[index][field] = value;
      return newData;
    });
  };

  return (
    <div className="w-full space-y-8 pb-8">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-accent/20 border border-border/50">
          <TabsTrigger value="general" className="transition-all duration-200 hover:bg-accent/50">General</TabsTrigger>
          <TabsTrigger value="header" className="transition-all duration-200 hover:bg-accent/50">Header</TabsTrigger>
          <TabsTrigger value="theme" className="transition-all duration-200 hover:bg-accent/50">Theme</TabsTrigger>
        </TabsList>

        {/* ============ GENERAL SETTINGS ============ */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6 text-foreground">General Settings</h3>
            
            <div className="space-y-6">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Site Title</label>
              <Input
                value={data.siteTitle || ''}
                onChange={(e) => setData({ ...data, siteTitle: e.target.value })}
                placeholder="Enter site title"
                className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Site Description</label>
              <Textarea
                value={data.siteDescription || ''}
                onChange={(e) => setData({ ...data, siteDescription: e.target.value })}
                placeholder="Enter site description"
                rows={3}
                className="w-4/5 resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Author Name</label>
              <Input
                value={data.authorName || ''}
                onChange={(e) => setData({ ...data, authorName: e.target.value })}
                placeholder="Enter author name"
                className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Author Email</label>
              <Input
                value={data.authorEmail || ''}
                onChange={(e) => setData({ ...data, authorEmail: e.target.value })}
                placeholder="Enter author email"
                type="email"
                className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Site URL</label>
              <Input
                value={data.siteUrl || ''}
                onChange={(e) => setData({ ...data, siteUrl: e.target.value })}
                placeholder="e.g., https://example.com"
                className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* ============ HEADER SETTINGS ============ */}
        <TabsContent value="header" className="space-y-6 mt-6">
          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6 text-foreground">Header Settings</h3>
            
            <div className="space-y-6">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Header Title</label>
                <Input
                  value={data.header?.title || ''}
                  onChange={(e) => setData({
                    ...data,
                    header: { ...data.header, title: e.target.value }
                  })}
                  placeholder="Enter header title"
                  className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Header Subtitle</label>
                <Input
                  value={data.header?.subtitle || ''}
                  onChange={(e) => setData({
                    ...data,
                    header: { ...data.header, subtitle: e.target.value }
                  })}
                  placeholder="Enter header subtitle"
                  className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Logo URL</label>
                <Input
                  value={data.header?.logo || ''}
                  onChange={(e) => setData({
                    ...data,
                    header: { ...data.header, logo: e.target.value }
                  })}
                  placeholder="Enter logo URL"
                  className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </Card>

          {/* ============ NAVIGATION LINKS ============ */}
          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">Navigation Links</h3>
              <Button
                onClick={addNavigationLink}
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
                  {data.header?.navigationLinks?.map((link: any, index: number) => (
                    <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                      <td className="py-3 px-4 text-foreground">{link.label}</td>
                      <td className="py-3 px-4 text-foreground truncate">{link.href}</td>
                      <td className="py-3 px-4 text-center space-x-2">
                        <Button
                          onClick={() => setViewingNavId(index)}
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary/20 transition-all duration-200"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          onClick={() => setEditingNavId(index)}
                          size="sm"
                          variant="outline"
                          className="hover:bg-primary/20 transition-all duration-200"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          onClick={() => deleteNavigationLink(index)}
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

            {/* Edit Navigation Link Form */}
            {editingNavId !== null && (
              <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
                <h4 className="font-semibold mb-4 text-foreground">Edit Navigation Link</h4>
                <div className="space-y-4">
                  <div className="w-4/5 space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Input
                      value={data.header.navigationLinks[editingNavId].label}
                      onChange={(e) => updateNavigationLink(editingNavId, 'label', e.target.value)}
                      className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="w-4/5 space-y-2">
                    <label className="text-sm font-medium text-foreground">URL/Href</label>
                    <Input
                      value={data.header.navigationLinks[editingNavId].href}
                      onChange={(e) => updateNavigationLink(editingNavId, 'href', e.target.value)}
                      placeholder="e.g., /about or https://example.com"
                      className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => setEditingNavId(null)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                    >
                      Save Link
                    </Button>
                    <Button
                      onClick={() => setEditingNavId(null)}
                      variant="outline"
                      className="hover:bg-accent/50 transition-all duration-200"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* View Navigation Link */}
            {viewingNavId !== null && (
              <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
                <h4 className="font-semibold mb-4 text-foreground">View Navigation Link</h4>
                <div className="space-y-2">
                  <p className="text-foreground"><strong>Label:</strong> {data.header.navigationLinks[viewingNavId].label}</p>
                  <p className="text-foreground"><strong>URL:</strong> {data.header.navigationLinks[viewingNavId].href}</p>
                  <Button
                    onClick={() => setViewingNavId(null)}
                    variant="outline"
                    className="mt-4 hover:bg-accent/50 transition-all duration-200"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* ============ THEME SETTINGS ============ */}
        <TabsContent value="theme" className="space-y-6 mt-6">
          <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-6 text-foreground">Theme Settings</h3>
            
            <div className="space-y-6">
              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Primary Color</label>
                <Input
                  value={data.theme?.primaryColor || '#000000'}
                  onChange={(e) => setData({
                    ...data,
                    theme: { ...data.theme, primaryColor: e.target.value }
                  })}
                  type="color"
                  className="w-4/5 h-10 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Secondary Color</label>
                <Input
                  value={data.theme?.secondaryColor || '#ffffff'}
                  onChange={(e) => setData({
                    ...data,
                    theme: { ...data.theme, secondaryColor: e.target.value }
                  })}
                  type="color"
                  className="w-4/5 h-10 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Font Family</label>
                <Input
                  value={data.theme?.fontFamily || 'Inter'}
                  onChange={(e) => setData({
                    ...data,
                    theme: { ...data.theme, fontFamily: e.target.value }
                  })}
                  placeholder="e.g., Inter, Roboto, Poppins"
                  className="w-4/5 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-4/5 space-y-2">
                <label className="text-sm font-medium text-foreground">Dark Mode</label>
                <select
                  value={data.theme?.darkMode || 'auto'}
                  onChange={(e) => setData({
                    ...data,
                    theme: { ...data.theme, darkMode: e.target.value }
                  })}
                  className="w-4/5 px-3 py-2 border border-border rounded-md bg-background text-foreground transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="auto">Auto</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalSettingsEditor;
