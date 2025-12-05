import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Save, X, Calendar, User, Clock } from 'lucide-react';
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

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
    setEditingPost(null);
    setIsDialogOpen(false);
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

  return (
    <EditorWrapper
      fileName="blog_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Page Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Page Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              value={data.pageTitle}
              onChange={(e) => updateField(['pageTitle'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filterLabel">Filter Label</Label>
            <Input
              id="filterLabel"
              value={data.filterLabel}
              onChange={(e) => updateField(['filterLabel'], e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle">Page Subtitle</Label>
          <Input
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField(['pageSubtitle'], e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emptyMessage">Empty State Message</Label>
            <Input
              id="emptyMessage"
              value={data.emptyMessage}
              onChange={(e) => updateField(['emptyMessage'], e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readMoreLabel">Read More Label</Label>
            <Input
              id="readMoreLabel"
              value={data.readMoreLabel}
              onChange={(e) => updateField(['readMoreLabel'], e.target.value)}
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Blog Posts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Blog Posts ({data.posts.length})</h3>
          <Button size="sm" onClick={addPost}>
            <Plus className="h-4 w-4 mr-2" />
            Add Post
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.posts.map((post: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-32 h-20 object-cover rounded"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold">{post.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editPost(index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePost(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Post Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90%] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost?._index !== undefined ? 'Edit Blog Post' : 'Add New Blog Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details below. Use markdown for rich content formatting.
            </DialogDescription>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-6 py-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-title">Title *</Label>
                    <Input
                      id="edit-title"
                      value={editingPost.title}
                      onChange={(e) => updateEditingPost('title', e.target.value)}
                      placeholder="Blog Post Title"
                      className="text-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-slug">Slug (URL) *</Label>
                    <Input
                      id="edit-slug"
                      value={editingPost.slug}
                      onChange={(e) =>
                        updateEditingPost('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))
                      }
                      placeholder="blog-post-url"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL: /blog/{editingPost.slug}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="edit-excerpt">Excerpt *</Label>
                    <Textarea
                      id="edit-excerpt"
                      value={editingPost.excerpt}
                      onChange={(e) => updateEditingPost('excerpt', e.target.value)}
                      placeholder="Brief description of your blog post"
                      rows={6}
                      className="w-full resize-y"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Metadata */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Metadata</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-author">Author</Label>
                    <Input
                      id="edit-author"
                      value={editingPost.author}
                      onChange={(e) => updateEditingPost('author', e.target.value)}
                      placeholder="Author Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-date">Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={editingPost.date}
                      onChange={(e) => updateEditingPost('date', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Input
                      id="edit-category"
                      value={editingPost.category}
                      onChange={(e) => updateEditingPost('category', e.target.value)}
                      placeholder="Category"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-readTime">Read Time</Label>
                    <Input
                      id="edit-readTime"
                      value={editingPost.readTime}
                      onChange={(e) => updateEditingPost('readTime', e.target.value)}
                      placeholder="5 min read"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingPost.status || 'published'}
                      onValueChange={(value) => updateEditingPost('status', value)}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-image">Featured Image URL</Label>
                    <Input
                      id="edit-image"
                      value={editingPost.image}
                      onChange={(e) => updateEditingPost('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">Tags</h4>
                  <Button type="button" variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {editingPost.tags.map((tag: string, tagIndex: number) => (
                    <div key={tagIndex} className="flex gap-2">
                      <Input
                        value={tag}
                        onChange={(e) => updateTag(tagIndex, e.target.value)}
                        placeholder="tag-name"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(tagIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* SEO Settings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">SEO Settings (Optional)</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="edit-seo-title">Meta Title</Label>
                    <Input
                      id="edit-seo-title"
                      value={editingPost.seo?.metaTitle || ''}
                      onChange={(e) => updateEditingPostSEO('metaTitle', e.target.value)}
                      placeholder="Custom meta title for SEO"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-seo-description">Meta Description</Label>
                    <Textarea
                      id="edit-seo-description"
                      value={editingPost.seo?.metaDescription || ''}
                      onChange={(e) => updateEditingPostSEO('metaDescription', e.target.value)}
                      placeholder="Custom meta description for SEO"
                      rows={4}
                      className="w-full resize-y"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Content Editor */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Content (Markdown) *</h4>
                <div className="border rounded-lg overflow-hidden">
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
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingPost(null);
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={savePost} className="gap-2">
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
