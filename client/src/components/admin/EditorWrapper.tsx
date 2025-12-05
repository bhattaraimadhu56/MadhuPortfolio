import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Editor Wrapper Component
 * Provides consistent UI and functionality for all content editors
 * Handles save/download and reset operations
 */

interface EditorWrapperProps {
  children: React.ReactNode;
  fileName: string;
  data: any;
  onReset: () => void;
  hasChanges: boolean;
}

export const EditorWrapper: React.FC<EditorWrapperProps> = ({
  children,
  fileName,
  data,
  onReset,
  hasChanges,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = () => {
    setIsSaving(true);
    
    try {
      // Create JSON string with proper formatting
      const jsonString = JSON.stringify(data, null, 2);
      
      // Create blob and download link
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      toast.success('File downloaded successfully!', {
        description: `${fileName} has been downloaded. Replace the file in your repository and push to deploy.`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file', {
        description: 'Please try again or check the console for errors.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes? This cannot be undone.')) {
      onReset();
      toast.info('Changes reset', {
        description: 'All changes have been discarded.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2">
          <Save className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {hasChanges ? 'You have unsaved changes' : 'No changes'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            size="sm"
            onClick={handleDownload}
            disabled={isSaving}
          >
            <Download className="h-4 w-4 mr-2" />
            {isSaving ? 'Downloading...' : 'Download JSON'}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="font-semibold text-sm mb-2 text-blue-900 dark:text-blue-100">
          📝 How to save your changes:
        </h4>
        <ol className="text-sm space-y-1 text-blue-800 dark:text-blue-200 list-decimal list-inside">
          <li>Make your edits using the form above</li>
          <li>Click "Download JSON" to save the file to your computer</li>
          <li>Replace the old <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">{fileName}</code> in <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">client/public/data/</code></li>
          <li>Commit and push the changes to GitHub</li>
          <li>GitHub Actions will automatically deploy your updates</li>
        </ol>
      </div>
    </div>
  );
};
