import React, { useState } from 'react';
import { useAppData } from '@/contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Home, User, Briefcase, FileText, Mail, Layout, Settings, Sparkles } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary drop-shadow-lg" />
                <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Content Management System
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Edit your portfolio content - Changes will be downloaded as JSON files
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 md:space-y-8">
          {/* Enhanced Tab List */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-2 md:p-3">
            <TabsList className="grid w-full grid-cols-7 gap-1 md:gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <TabsTrigger 
                value="home" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <Home className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <User className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">About</span>
              </TabsTrigger>
              <TabsTrigger 
                value="portfolio" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Portfolio</span>
              </TabsTrigger>
              <TabsTrigger 
                value="blog" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <FileText className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Blog</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contact" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Contact</span>
              </TabsTrigger>
              <TabsTrigger 
                value="footer" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <Layout className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Footer</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
              >
                <Settings className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-xs md:text-sm font-medium">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents with Enhanced Cards */}
          <TabsContent value="home" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Home Page Content</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Edit banner slides, hero section, skills, and achievements
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <HomeEditor initialData={appData.content.home} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">About Page Content</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Edit personal story, work experience, education, and certifications
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <AboutEditor initialData={appData.content.about} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-transparent dark:from-green-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Portfolio Projects</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Add, edit, or remove portfolio projects
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <PortfolioEditor initialData={appData.content.portfolio} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Blog Posts</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Create, edit, or delete blog posts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <BlogEditor initialData={appData.content.blog} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-transparent dark:from-pink-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Contact Page Content</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Edit contact form configuration and page text
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ContactEditor initialData={appData.content.contact} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-transparent dark:from-cyan-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Layout className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Footer Content</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Edit footer links, description, and copyright
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <FooterEditor initialData={appData.content.footer} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="shadow-xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-950 dark:to-transparent border-b">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl md:text-2xl">Global Settings</CardTitle>
                    <CardDescription className="text-sm md:text-base mt-1">
                      Edit site metadata, branding, header navigation, and social links
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
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
