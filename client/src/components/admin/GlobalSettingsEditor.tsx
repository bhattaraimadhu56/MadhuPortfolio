import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GlobalSettingsEditorProps {
  initialData: any;
}

export const GlobalSettingsEditor: React.FC<GlobalSettingsEditorProps> = ({ initialData }) => {
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

  const addNavigationLink = () => {
    setData((prev: any) => ({
      ...prev,
      header: {
        ...prev.header,
        navigationLinks: [
          ...prev.header.navigationLinks,
          { label: 'New Page', href: '/new-page' },
        ],
      },
    }));
  };

  const removeNavigationLink = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      header: {
        ...prev.header,
        navigationLinks: prev.header.navigationLinks.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const addSocialLink = () => {
    setData((prev: any) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { icon: 'link', href: 'https://example.com', label: 'New Link' },
      ],
    }));
  };

  const removeSocialLink = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_: any, i: number) => i !== index),
    }));
  };

  return (
    <EditorWrapper
      fileName="global_settings.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      <Tabs defaultValue="metadata" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        {/* Metadata Tab */}
        <TabsContent value="metadata" className="space-y-4">
          <h3 className="text-lg font-semibold">Site Metadata</h3>
          
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              value={data.metadata.siteTitle}
              onChange={(e) => updateField(['metadata', 'siteTitle'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={data.metadata.siteDescription}
              onChange={(e) => updateField(['metadata', 'siteDescription'], e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteUrl">Site URL</Label>
            <Input
              id="siteUrl"
              value={data.metadata.siteUrl}
              onChange={(e) => updateField(['metadata', 'siteUrl'], e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faviconPath">Favicon Path</Label>
              <Input
                id="faviconPath"
                value={data.metadata.faviconPath}
                onChange={(e) => updateField(['metadata', 'faviconPath'], e.target.value)}
                placeholder="/images/favicon.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appleTouchIconPath">Apple Touch Icon Path</Label>
              <Input
                id="appleTouchIconPath"
                value={data.metadata.appleTouchIconPath}
                onChange={(e) => updateField(['metadata', 'appleTouchIconPath'], e.target.value)}
                placeholder="/images/apple-touch-icon.png"
              />
            </div>
          </div>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <h3 className="text-lg font-semibold">Brand Colors & Fonts</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={data.branding.primaryColor}
                  onChange={(e) => updateField(['branding', 'primaryColor'], e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={data.branding.primaryColor}
                  onChange={(e) => updateField(['branding', 'primaryColor'], e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={data.branding.secondaryColor}
                  onChange={(e) => updateField(['branding', 'secondaryColor'], e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={data.branding.secondaryColor}
                  onChange={(e) => updateField(['branding', 'secondaryColor'], e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={data.branding.accentColor}
                  onChange={(e) => updateField(['branding', 'accentColor'], e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={data.branding.accentColor}
                  onChange={(e) => updateField(['branding', 'accentColor'], e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fontFamily">Body Font Family</Label>
              <Input
                id="fontFamily"
                value={data.branding.fontFamily}
                onChange={(e) => updateField(['branding', 'fontFamily'], e.target.value)}
                placeholder="Inter, sans-serif"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headingFontFamily">Heading Font Family</Label>
              <Input
                id="headingFontFamily"
                value={data.branding.headingFontFamily}
                onChange={(e) => updateField(['branding', 'headingFontFamily'], e.target.value)}
                placeholder="Space Grotesk, sans-serif"
              />
            </div>
          </div>
        </TabsContent>

        {/* Header Tab */}
        <TabsContent value="header" className="space-y-4">
          <h3 className="text-lg font-semibold">Header Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                value={data.header.appName}
                onChange={(e) => updateField(['header', 'appName'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="appLogo">App Logo Path</Label>
              <Input
                id="appLogo"
                value={data.header.appLogo}
                onChange={(e) => updateField(['header', 'appLogo'], e.target.value)}
                placeholder="/images/logo.png"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Navigation Links</h4>
              <Button size="sm" onClick={addNavigationLink}>
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </div>

            {data.header.navigationLinks.map((link: any, index: number) => (
              <Card key={index} className="p-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Label</Label>
                      <Input
                        value={link.label}
                        onChange={(e) => {
                          const newLinks = [...data.header.navigationLinks];
                          newLinks[index].label = e.target.value;
                          updateField(['header', 'navigationLinks'], newLinks);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={link.href}
                        onChange={(e) => {
                          const newLinks = [...data.header.navigationLinks];
                          newLinks[index].href = e.target.value;
                          updateField(['header', 'navigationLinks'], newLinks);
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeNavigationLink(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={data.profile.fullName}
                onChange={(e) => updateField(['profile', 'fullName'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={data.profile.title}
                onChange={(e) => updateField(['profile', 'title'], e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.profile.location}
                onChange={(e) => updateField(['profile', 'location'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image Path</Label>
              <Input
                id="profileImage"
                value={data.profile.profileImage}
                onChange={(e) => updateField(['profile', 'profileImage'], e.target.value)}
                placeholder="/images/profile.jpg"
              />
            </div>
          </div>

          <Separator />

          <h4 className="font-semibold">Contact Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryEmail">Primary Email</Label>
              <Input
                id="primaryEmail"
                type="email"
                value={data.contact_info.primaryEmail}
                onChange={(e) => updateField(['contact_info', 'primaryEmail'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryEmail">Secondary Email</Label>
              <Input
                id="secondaryEmail"
                type="email"
                value={data.contact_info.secondaryEmail}
                onChange={(e) => updateField(['contact_info', 'secondaryEmail'], e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.contact_info.phone}
                onChange={(e) => updateField(['contact_info', 'phone'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeFileName">Resume File Path</Label>
              <Input
                id="resumeFileName"
                value={data.contact_info.resumeFileName}
                onChange={(e) => updateField(['contact_info', 'resumeFileName'], e.target.value)}
                placeholder="/resume.pdf"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                value={data.contact_info.githubUrl}
                onChange={(e) => updateField(['contact_info', 'githubUrl'], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                value={data.contact_info.linkedinUrl}
                onChange={(e) => updateField(['contact_info', 'linkedinUrl'], e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <Button size="sm" onClick={addSocialLink}>
              <Plus className="h-4 w-4 mr-2" />
              Add Social Link
            </Button>
          </div>

          {data.socialLinks.map((link: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Input
                      value={link.icon}
                      onChange={(e) => {
                        const newLinks = [...data.socialLinks];
                        newLinks[index].icon = e.target.value;
                        updateField(['socialLinks'], newLinks);
                      }}
                      placeholder="github"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...data.socialLinks];
                        newLinks[index].label = e.target.value;
                        updateField(['socialLinks'], newLinks);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={link.href}
                      onChange={(e) => {
                        const newLinks = [...data.socialLinks];
                        newLinks[index].href = e.target.value;
                        updateField(['socialLinks'], newLinks);
                      }}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </EditorWrapper>
  );
};
