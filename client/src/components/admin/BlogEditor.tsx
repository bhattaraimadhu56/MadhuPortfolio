import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit, Calendar, User, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BlogEditorProps {
  initialData: any;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
  };

  const updateField = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPost = () => {
    const newPost = {
      slug: 'new-blog-post',
      title: 'New Blog Post',
      excerpt: 'A brief excerpt of the blog post',
      date: new Date().toISOString().split('T')[0],
      author: 'Madhu Bhattarai',
      readTime: '5 min read',
      category: 'General',
      tags: ['Tag1', 'Tag2'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      content: '# Blog Post Title\n\nYour content here...',
    };
    
    setEditingPost(newPost);
    setEditingIndex(data.posts.length);
  };

  const editPost = (index: number) => {
    setEditingPost({ ...data.posts[index] });
    setEditingIndex(index);
  };

  const savePost = () => {
    if (editingPost) {
      const newPosts = [...data.posts];
      newPosts[editingIndex] = editingPost;
      updateField('posts', newPosts);
      setEditingPost(null);
      setEditingIndex(-1);
    }
  };

  const deletePost = (index: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const newPosts = data.posts.filter((_: any, i: number) => i !== index);
      updateField('posts', newPosts);
    }
  };

  const updatePostField = (field: string, value: any) => {
    setEditingPost((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updatePostTags = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    updatePostField('tags', tags);
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
              onChange={(e) => updateField('pageTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="filterLabel">Filter Label</Label>
            <Input
              id="filterLabel"
              value={data.filterLabel}
              onChange={(e) => updateField('filterLabel', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pageSubtitle">Page Subtitle</Label>
          <Input
            id="pageSubtitle"
            value={data.pageSubtitle}
            onChange={(e) => updateField('pageSubtitle', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emptyMessage">Empty State Message</Label>
            <Input
              id="emptyMessage"
              value={data.emptyMessage}
              onChange={(e) => updateField('emptyMessage', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readMoreLabel">Read More Label</Label>
            <Input
              id="readMoreLabel"
              value={data.readMoreLabel}
              onChange={(e) => updateField('readMoreLabel', e.target.value)}
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
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePost(index)}
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
      <Dialog open={editingPost !== null} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingIndex >= data.posts.length ? 'Add New Blog Post' : 'Edit Blog Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the blog post details below
            </DialogDescription>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editingPost.title}
                    onChange={(e) => updatePostField('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug (URL)</Label>
                  <Input
                    id="edit-slug"
                    value={editingPost.slug}
                    onChange={(e) => updatePostField('slug', e.target.value)}
                    placeholder="my-blog-post"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">Excerpt</Label>
                <Textarea
                  id="edit-excerpt"
                  value={editingPost.excerpt}
                  onChange={(e) => updatePostField('excerpt', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingPost.date}
                    onChange={(e) => updatePostField('date', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-author">Author</Label>
                  <Input
                    id="edit-author"
                    value={editingPost.author}
                    onChange={(e) => updatePostField('author', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-readTime">Read Time</Label>
                  <Input
                    id="edit-readTime"
                    value={editingPost.readTime}
                    onChange={(e) => updatePostField('readTime', e.target.value)}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input
                    id="edit-category"
                    value={editingPost.category}
                    onChange={(e) => updatePostField('category', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                  <Input
                    id="edit-tags"
                    value={editingPost.tags.join(', ')}
                    onChange={(e) => updatePostTags(e.target.value)}
                    placeholder="Python, Data Analysis"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">Featured Image URL</Label>
                <Input
                  id="edit-image"
                  value={editingPost.image}
                  onChange={(e) => updatePostField('image', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-content">Content (Markdown)</Label>
                <Textarea
                  id="edit-content"
                  value={editingPost.content}
                  onChange={(e) => updatePostField('content', e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                  placeholder="# Blog Post Title&#10;&#10;Your content here..."
                />
                <p className="text-xs text-muted-foreground">
                  Use Markdown formatting for rich content
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  Cancel
                </Button>
                <Button onClick={savePost}>
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
