import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
  aspectRatio?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Image',
  placeholder = 'https://example.com/image.jpg',
  aspectRatio = '16:10',
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create a local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onChange(result);
      };
      reader.readAsDataURL(file);

      // In a real implementation, you would upload to Cloudinary or another service here
      // For now, we're just using the local data URL
      // Example Cloudinary upload:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset');
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      
      const data = await response.json();
      onChange(data.secure_url);
      setPreviewUrl(data.secure_url);
      */
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    onChange(url);
    setPreviewUrl(url);
  };

  const clearImage = () => {
    onChange('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* URL Input */}
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearImage}
            title="Clear image"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* File Upload */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${label}`}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Image
            </>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">
          or enter URL above (Max 5MB, JPG/PNG/WebP)
        </span>
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <Card className="p-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Preview:</Label>
            <div className="relative w-full max-w-md mx-auto">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto rounded border"
                style={{ aspectRatio }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/800x500?text=Invalid+Image+URL';
                }}
              />
            </div>
          </div>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        Recommended aspect ratio: {aspectRatio}. Use high-quality images for best results.
      </p>
    </div>
  );
};
