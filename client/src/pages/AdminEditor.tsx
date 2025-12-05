import React, { useState } from 'react';
import { useAppData } from '@/contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Home, User, Briefcase, FileText, Mail, Layout, Settings } from 'lucide-react';
import { HomeEditor } from '@/components/admin/HomeEditor';
import { AboutEditor } from '@/components/admin/AboutEditor';
import { PortfolioEditor } from '@/components/admin/PortfolioEditor';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { ContactEditor } from '@/components/admin/ContactEditor';
import { FooterEditor } from '@/components/admin/FooterEditor';
import { GlobalSettingsEditor } from '@/components/admin/GlobalSettingsEditor';

/**
 * Admin Editor Page
 * Central content management interface for all pages
 * Provides CRUD operations for all JSON data files
 */

const AdminEditor: React.FC = () => {
  const appData = useAppData();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Content Management System</h1>
              <p className="text-muted-foreground">
                Edit your portfolio content - Changes will be downloaded as JSON files
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid">
            <TabsTrigger value="home" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="footer" className="gap-2">
              <Layout className="h-4 w-4" />
              <span className="hidden sm:inline">Footer</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <Card>
              <CardHeader>
                <CardTitle>Home Page Content</CardTitle>
                <CardDescription>
                  Edit banner slides, hero section, skills, and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HomeEditor initialData={appData.content.home} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Page Content</CardTitle>
                <CardDescription>
                  Edit personal story, work experience, education, and certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AboutEditor initialData={appData.content.about} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Projects</CardTitle>
                <CardDescription>
                  Add, edit, or remove portfolio projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PortfolioEditor initialData={appData.content.portfolio} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>
                  Create, edit, or delete blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogEditor initialData={appData.content.blog} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Page Content</CardTitle>
                <CardDescription>
                  Edit contact form configuration and page text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactEditor initialData={appData.content.contact} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Footer Content</CardTitle>
                <CardDescription>
                  Edit footer links, description, and copyright
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FooterEditor initialData={appData.content.footer} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <CardDescription>
                  Edit site metadata, branding, header navigation, and social links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GlobalSettingsEditor initialData={appData.global} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminEditor;
