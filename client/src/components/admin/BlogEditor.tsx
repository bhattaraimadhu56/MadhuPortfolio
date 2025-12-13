import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Save, X, Calendar, User, Clock, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MdEditor from 'react-markdown-editor-lite';
import { marked } from 'marked';
import 'react-markdown-editor-lite/lib/index.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BlogEditorProps {
  initialData: any;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
    setEditingPost(null);
    setIsDialogOpen(false);
    setViewingPost(null);
    setIsViewDialogOpen(false);
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

  const addPost = () => {
    const newPost = {
      slug: 'new-blog-post',
      title: 'New Blog Post',
      excerpt: 'Brief description of your blog post',
      date: new Date().toISOString().split('T')[0],
      author: 'Author Name',
      readTime: '5 min read',
      category: 'General',
      tags: ['tag1', 'tag2'],
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
      content: '# New Blog Post\n\nStart writing your content here...',
      status: 'draft',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: [],
      },
    };
    setEditingPost(newPost);
    setIsDialogOpen(true);
  };

  const editPost = (index: number) => {
    setEditingPost({ ...data.posts[index], _index: index });
    setIsDialogOpen(true);
  };

  const viewPost = (index: number) => {
    setViewingPost(data.posts[index]);
    setIsViewDialogOpen(true);
  };

  const savePost = () => {
    if (!editingPost) return;

    // Validate required fields
    if (!editingPost.title || !editingPost.slug || !editingPost.excerpt || !editingPost.content) {
      alert('Please fill in all required fields: Title, Slug, Excerpt, and Content');
      return;
    }

    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      // Ensure posts array exists
      if (!Array.isArray(newData.posts)) {
        newData.posts = [];
      }

      const postData = {
        slug: editingPost.slug,
        title: editingPost.title,
        excerpt: editingPost.excerpt,
        date: editingPost.date,
        author: editingPost.author,
        readTime: editingPost.readTime,
        category: editingPost.category,
        tags: Array.isArray(editingPost.tags) ? editingPost.tags : [],
        image: editingPost.image,
        content: editingPost.content,
        status: editingPost.status || 'published',
        seo: editingPost.seo || {},
      };

      if (editingPost._index !== undefined) {
        // Update existing post
        newData.posts[editingPost._index] = postData;
      } else {
        // Add new post to the beginning
        newData.posts.unshift(postData);
      }
      return newData;
    });

    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const removePost = (index: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setData((prev: any) => ({
        ...prev,
        posts: prev.posts.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  const updateEditingPost = (field: string, value: any) => {
    setEditingPost((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEditingPostSEO = (field: string, value: any) => {
    setEditingPost((prev: any) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  const addTag = () => {
    if (editingPost) {
      setEditingPost((prev: any) => ({
        ...prev,
        tags: [...prev.tags, 'new-tag'],
      }));
    }
  };

  const updateTag = (index: number, value: string) => {
    if (editingPost) {
      const newTags = [...editingPost.tags];
      newTags[index] = value;
      setEditingPost((prev: any) => ({
        ...prev,
        tags: newTags,
      }));
    }
  };

  const removeTag = (index: number) => {
    if (editingPost) {
      setEditingPost((prev: any) => ({
        ...prev,
        tags: prev.tags.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  const closeEditDialog = () => {
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const closeViewDialog = () => {
    setViewingPost(null);
    setIsViewDialogOpen(false);
  };

  return (
    <EditorWrapper
      fileName="blog_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Page Settings */}
      <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Page Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="pageTitle" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Page Title</Label>
            <Input
              id="pageTitle"
              value={data.pageTitle}
              onChange={(e) => updateField(['pageTitle'], e.target.value)}
              className="w-full md:w-4/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filterLabel" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Filter Label</Label>
            <Input
              id="filterLabel"
              value={data.filterLabel}
              onChange={(e) => updateField(['filterLabel'], e.target.value)}
              className="w-full md:w-4/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Page Subtitle</Label>
          <Input
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
            className="w-full md:w-4/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="emptyMessage" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Empty State Message</Label>
            <Input
              id="emptyMessage"
              value={data.emptyMessage}
              onChange={(e) => updateField(['emptyMessage'], e.target.value)}
              className="w-full md:w-4/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readMoreLabel" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Read More Label</Label>
            <Input
              id="readMoreLabel"
              value={data.readMoreLabel}
              onChange={(e) => updateField(['readMoreLabel'], e.target.value)}
              className="w-full md:w-4/5 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Blog Posts */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Blog Posts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} total
            </p>
          </div>
          <Button 
            size="lg" 
            onClick={addPost} 
            className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Post
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {data.posts.map((post: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50">
              <div className="flex flex-col md:flex-row items-start gap-4 p-4 md:p-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full md:w-48 h-32 md:h-28 object-cover rounded-lg shadow-md"
                />
                
                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-2">{post.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      post.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}>
                      {post.status || 'published'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary-foreground rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => viewPost(index)}
                    className="flex-1 md:flex-none hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editPost(index)}
                    className="flex-1 md:flex-none hover:bg-primary/10 hover:border-primary transition-all duration-200"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePost(index)}
                    className="flex-1 md:flex-none text-destructive hover:bg-destructive/10 hover:border-destructive transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* View Post Dialog - Always in DOM */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">View Blog Post</DialogTitle>
            <DialogDescription>
              Preview of the blog post content
            </DialogDescription>
          </DialogHeader>

          {viewingPost && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <img
                  src={viewingPost.image}
                  alt={viewingPost.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <h2 className="text-3xl font-bold">{viewingPost.title}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {viewingPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {viewingPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {viewingPost.readTime}
                  </span>
                </div>
                <p className="text-lg text-muted-foreground">{viewingPost.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {viewingPost.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 bg-primary/15 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Separator />
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(viewingPost.content) }}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    closeViewDialog();
                  }}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const index = data.posts.findIndex((p: any) => p.slug === viewingPost.slug);
                    closeViewDialog();
                    if (index !== -1) {
                      setTimeout(() => editPost(index), 100);
                    }
                  }}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Post Editor Dialog - Always in DOM */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingPost?._index !== undefined ? 'Edit Blog Post' : 'Add New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below. Use markdown for rich content formatting.
            </DialogDescription>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-8 py-4">
              {/* Basic Information */}
              <div className="space-y-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="edit-title" className="text-sm font-semibold">Title *</Label>
                    <Input
                      id="edit-title"
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => updateEditingPost('title', e.target.value)}
                      placeholder="Blog Post Title"
                      className="text-lg mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-slug" className="text-sm font-semibold">Slug (URL) *</Label>
                    <Input
                      id="edit-slug"
                      type="text"
                      value={editingPost.slug}
                      onChange={(e) =>
                        updateEditingPost('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))
                      }
                      placeholder="blog-post-url"
                      className="mt-2 w-full md:w-4/5"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: /blog/{editingPost.slug}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="edit-excerpt" className="text-sm font-semibold">Excerpt *</Label>
                    <Textarea
                      id="edit-excerpt"
                      value={editingPost.excerpt}
                      onChange={(e) => updateEditingPost('excerpt', e.target.value)}
                      placeholder="Brief description of your blog post"
                      rows={6}
                      className="w-full md:w-4/5 resize-y mt-2"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Metadata
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-author" className="text-sm font-semibold">Author</Label>
                    <Input
                      id="edit-author"
                      type="text"
                      value={editingPost.author}
                      onChange={(e) => updateEditingPost('author', e.target.value)}
                      placeholder="Author Name"
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-date" className="text-sm font-semibold">Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingPost.date}
                      onChange={(e) => updateEditingPost('date', e.target.value)}
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category" className="text-sm font-semibold">Category</Label>
                    <Input
                      id="edit-category"
                      type="text"
                      value={editingPost.category}
                      onChange={(e) => updateEditingPost('category', e.target.value)}
                      placeholder="Category"
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-readTime" className="text-sm font-semibold">Read Time</Label>
                    <Input
                      id="edit-readTime"
                      type="text"
                      value={editingPost.readTime}
                      onChange={(e) => updateEditingPost('readTime', e.target.value)}
                      placeholder="5 min read"
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status" className="text-sm font-semibold">Status</Label>
                    <Select
                      value={editingPost.status || 'published'}
                      onValueChange={(value) => updateEditingPost('status', value)}
                    >
                      <SelectTrigger id="edit-status" className="mt-2 w-full md:w-4/5">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-image" className="text-sm font-semibold">Featured Image URL</Label>
                    <Input
                      id="edit-image"
                      type="text"
                      value={editingPost.image}
                      onChange={(e) => updateEditingPost('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <span className="w-1 h-5 bg-primary rounded-full"></span>
                    Tags
                  </h4>
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {editingPost.tags.map((tag: string, tagIndex: number) => (
                    <div key={tagIndex} className="flex gap-2">
                      <Input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(tagIndex, e.target.value)}
                        placeholder="tag-name"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(tagIndex)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* SEO Settings */}
              <div className="space-y-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  SEO Settings (Optional)
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="edit-seo-title" className="text-sm font-semibold">Meta Title</Label>
                    <Input
                      id="edit-seo-title"
                      type="text"
                      value={editingPost.seo?.metaTitle || ''}
                      onChange={(e) => updateEditingPostSEO('metaTitle', e.target.value)}
                      placeholder="Custom meta title for SEO"
                      className="mt-2 w-full md:w-4/5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-seo-description" className="text-sm font-semibold">Meta Description</Label>
                    <Textarea
                      id="edit-seo-description"
                      value={editingPost.seo?.metaDescription || ''}
                      onChange={(e) => updateEditingPostSEO('metaDescription', e.target.value)}
                      placeholder="Custom meta description for SEO"
                      rows={4}
                      className="w-full md:w-4/5 resize-y mt-2"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Content Editor */}
              <div className="space-y-4 p-4 md:p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <span className="w-1 h-5 bg-primary rounded-full"></span>
                  Content (Markdown) *
                </h4>
                <div className="border rounded-lg overflow-hidden shadow-lg w-full md:w-4/5">
                  <MdEditor
                    value={editingPost.content}
                    style={{ height: '600px' }}
                    renderHTML={(text) => marked(text)}
                    onChange={({ text }) => updateEditingPost('content', text)}
                    config={{
                      view: {
                        menu: true,
                        md: true,
                        html: true,
                      },
                      canView: {
                        menu: true,
                        md: true,
                        html: true,
                        fullScreen: true,
                        hideMenu: true,
                      },
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Use markdown syntax for formatting. Supports headings, lists, code blocks, links, images, and more.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    closeEditDialog();
                  }}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={savePost} 
                  className="w-full sm:w-auto gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Save className="h-4 w-4" />
                  Save Post
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </EditorWrapper>
  );
};
