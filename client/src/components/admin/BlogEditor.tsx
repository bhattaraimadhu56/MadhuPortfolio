import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Eye, Save, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import MdEditor from 'react-markdown-editor-lite';
import { marked } from 'marked';
import 'react-markdown-editor-lite/lib/index.css';
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
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [viewingIndex, setViewingIndex] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPost, setNewPost] = useState<any>(null);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
    setEditingIndex(null);
    setViewingIndex(null);
    setIsAddingNew(false);
    setNewPost(null);
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

  // Add new post
  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewPost({
      slug: '',
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      readTime: '5 min read',
      category: '',
      tags: [],
      image: '',
      content: '',
      status: 'draft',
      seo: {
        metaTitle: '',
        metaDescription: '',
      },
    });
  };

  // Save new post
  const handleSaveNewPost = () => {
    if (!newPost.title || !newPost.slug || !newPost.excerpt || !newPost.content) {
      alert('Please fill in all required fields: Title, Slug, Excerpt, and Content');
      return;
    }

    setData((prev: any) => ({
      ...prev,
      posts: [newPost, ...prev.posts],
    }));

    setIsAddingNew(false);
    setNewPost(null);
  };

  // Cancel add
  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewPost(null);
  };

  // Edit post
  const handleEditPost = (index: number) => {
    setEditingIndex(index);
  };

  // Save edited post
  const handleSaveEditPost = (index: number) => {
    const post = data.posts[index];
    if (!post.title || !post.slug || !post.excerpt || !post.content) {
      alert('Please fill in all required fields: Title, Slug, Excerpt, and Content');
      return;
    }

    setEditingIndex(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingIndex(null);
    setData(initialData);
  };

  // Delete post
  const handleDeletePost = (index: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setData((prev: any) => ({
        ...prev,
        posts: prev.posts.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  // View post
  const handleViewPost = (index: number) => {
    setViewingIndex(index);
  };

  // Close view
  const handleCloseView = () => {
    setViewingIndex(null);
  };

  // Update post field during edit
  const updatePostField = (index: number, field: string, value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.posts[index][field] = value;
      return newData;
    });
  };

  // Update new post field
  const updateNewPostField = (field: string, value: any) => {
    setNewPost((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <EditorWrapper
      fileName="blog_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Page Settings */}
      <div className="space-y-6 p-4 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          Page Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="pageTitle" className="text-sm font-semibold">Page Title</Label>
            <Input
              id="pageTitle"
              value={data.pageTitle}
              onChange={(e) => updateField(['pageTitle'], e.target.value)}
              className="w-full md:w-4/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filterLabel" className="text-sm font-semibold">Filter Label</Label>
            <Input
              id="filterLabel"
              value={data.filterLabel}
              onChange={(e) => updateField(['filterLabel'], e.target.value)}
              className="w-full md:w-4/5"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle" className="text-sm font-semibold">Page Subtitle</Label>
          <Input
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
            className="w-full md:w-4/5"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2">
            <Label htmlFor="emptyMessage" className="text-sm font-semibold">Empty State Message</Label>
            <Input
              id="emptyMessage"
              value={data.emptyMessage}
              onChange={(e) => updateField(['emptyMessage'], e.target.value)}
              className="w-full md:w-4/5"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readMoreLabel" className="text-sm font-semibold">Read More Label</Label>
            <Input
              id="readMoreLabel"
              value={data.readMoreLabel}
              onChange={(e) => updateField(['readMoreLabel'], e.target.value)}
              className="w-full md:w-4/5"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Blog Posts Table */}
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Blog Posts</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {data.posts.length} {data.posts.length === 1 ? 'post' : 'posts'} total
            </p>
          </div>
          {!isAddingNew && (
            <Button 
              size="lg" 
              onClick={handleAddNew}
              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Post
            </Button>
          )}
        </div>

        {/* Add New Post Form */}
        {isAddingNew && newPost && (
          <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <h4 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Add New Blog Post</h4>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Basic Information</h5>
                
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Title *</Label>
                  <Input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => updateNewPostField('title', e.target.value)}
                    placeholder="Blog Post Title"
                    className="w-full md:w-4/5"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Slug (URL) *</Label>
                  <Input
                    type="text"
                    value={newPost.slug}
                    onChange={(e) => updateNewPostField('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="blog-post-url"
                    className="w-full md:w-4/5"
                  />
                  <p className="text-xs text-muted-foreground">URL: /blog/{newPost.slug}</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Excerpt *</Label>
                  <Textarea
                    value={newPost.excerpt}
                    onChange={(e) => updateNewPostField('excerpt', e.target.value)}
                    placeholder="Brief description of your blog post"
                    rows={4}
                    className="w-full md:w-4/5"
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Metadata</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Author</Label>
                    <Input
                      type="text"
                      value={newPost.author}
                      onChange={(e) => updateNewPostField('author', e.target.value)}
                      placeholder="Author Name"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Date</Label>
                    <Input
                      type="date"
                      value={newPost.date}
                      onChange={(e) => updateNewPostField('date', e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Category</Label>
                    <Input
                      type="text"
                      value={newPost.category}
                      onChange={(e) => updateNewPostField('category', e.target.value)}
                      placeholder="Category"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Read Time</Label>
                    <Input
                      type="text"
                      value={newPost.readTime}
                      onChange={(e) => updateNewPostField('readTime', e.target.value)}
                      placeholder="5 min read"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Status</Label>
                    <Select value={newPost.status} onValueChange={(value) => updateNewPostField('status', value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Featured Image URL</Label>
                    <Input
                      type="text"
                      value={newPost.image}
                      onChange={(e) => updateNewPostField('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h5 className="font-semibold text-slate-700 dark:text-slate-300">Content (Markdown) *</h5>
                <div className="border rounded-lg overflow-hidden shadow-lg w-full md:w-4/5">
                  <MdEditor
                    value={newPost.content}
                    style={{ height: '400px' }}
                    renderHTML={(text) => marked(text)}
                    onChange={({ text }) => updateNewPostField('content', text)}
                    config={{
                      view: { menu: true, md: true, html: true },
                      canView: { menu: true, md: true, html: true, fullScreen: true, hideMenu: true },
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelAdd}
                  className="w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSaveNewPost}
                  className="w-full sm:w-auto gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Post
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b-2 border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Title</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Author</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((post: any, index: number) => (
                <tr key={index} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-200">{post.title}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{post.author}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{post.date}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                    }`}>
                      {post.status || 'published'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2 justify-center">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPost(index)}
                        className="hover:bg-blue-50 dark:hover:bg-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPost(index)}
                        className="hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(index)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.posts.length === 0 && !isAddingNew && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p>No blog posts yet. Click "Add New Post" to create one.</p>
          </div>
        )}
      </div>

      {/* View Post */}
      {viewingIndex !== null && data.posts[viewingIndex] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{data.posts[viewingIndex].title}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseView}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 mb-6">
                <img
                  src={data.posts[viewingIndex].image}
                  alt={data.posts[viewingIndex].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{data.posts[viewingIndex].excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {data.posts[viewingIndex].tags?.map((tag: string, i: number) => (
                    <span key={i} className="text-xs px-2.5 py-1 bg-primary/15 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Separator />
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: marked(data.posts[viewingIndex].content) }}
                />
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseView}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    handleCloseView();
                    handleEditPost(viewingIndex);
                  }}
                  className="flex-1"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Post */}
      {editingIndex !== null && data.posts[editingIndex] && (
        <Card className="p-6 border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent mt-8">
          <h4 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">Edit Blog Post</h4>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Basic Information</h5>
              
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Title *</Label>
                <Input
                  type="text"
                  value={data.posts[editingIndex].title}
                  onChange={(e) => updatePostField(editingIndex, 'title', e.target.value)}
                  placeholder="Blog Post Title"
                  className="w-full md:w-4/5"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Slug (URL) *</Label>
                <Input
                  type="text"
                  value={data.posts[editingIndex].slug}
                  onChange={(e) => updatePostField(editingIndex, 'slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="blog-post-url"
                  className="w-full md:w-4/5"
                />
                <p className="text-xs text-muted-foreground">URL: /blog/{data.posts[editingIndex].slug}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Excerpt *</Label>
                <Textarea
                  value={data.posts[editingIndex].excerpt}
                  onChange={(e) => updatePostField(editingIndex, 'excerpt', e.target.value)}
                  placeholder="Brief description of your blog post"
                  rows={4}
                  className="w-full md:w-4/5"
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Metadata</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Author</Label>
                  <Input
                    type="text"
                    value={data.posts[editingIndex].author}
                    onChange={(e) => updatePostField(editingIndex, 'author', e.target.value)}
                    placeholder="Author Name"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Date</Label>
                  <Input
                    type="date"
                    value={data.posts[editingIndex].date}
                    onChange={(e) => updatePostField(editingIndex, 'date', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Category</Label>
                  <Input
                    type="text"
                    value={data.posts[editingIndex].category}
                    onChange={(e) => updatePostField(editingIndex, 'category', e.target.value)}
                    placeholder="Category"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Read Time</Label>
                  <Input
                    type="text"
                    value={data.posts[editingIndex].readTime}
                    onChange={(e) => updatePostField(editingIndex, 'readTime', e.target.value)}
                    placeholder="5 min read"
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Status</Label>
                  <Select
                    value={data.posts[editingIndex].status || 'published'}
                    onValueChange={(value) => updatePostField(editingIndex, 'status', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Featured Image URL</Label>
                  <Input
                    type="text"
                    value={data.posts[editingIndex].image}
                    onChange={(e) => updatePostField(editingIndex, 'image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h5 className="font-semibold text-slate-700 dark:text-slate-300">Content (Markdown) *</h5>
              <div className="border rounded-lg overflow-hidden shadow-lg w-full md:w-4/5">
                <MdEditor
                  value={data.posts[editingIndex].content}
                  style={{ height: '400px' }}
                  renderHTML={(text) => marked(text)}
                  onChange={({ text }) => updatePostField(editingIndex, 'content', text)}
                  config={{
                    view: { menu: true, md: true, html: true },
                    canView: { menu: true, md: true, html: true, fullScreen: true, hideMenu: true },
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
                className="w-full sm:w-auto"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleSaveEditPost(editingIndex)}
                className="w-full sm:w-auto gap-2"
              >
                <Save className="h-4 w-4" />
                Save Post
              </Button>
            </div>
          </div>
        </Card>
      )}
    </EditorWrapper>
  );
};
