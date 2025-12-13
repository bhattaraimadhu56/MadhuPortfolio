import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { Lock, AlertCircle } from 'lucide-react';

/**
 * Admin Password Dialog
 * Shows a password prompt when admin mode is triggered
 */

export const AdminPasswordDialog: React.FC = () => {
  const { showPasswordPrompt, authenticate, closePasswordPrompt } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await authenticate(password);
      
      if (success) {
        setPassword('');
        setError('');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      setError('Authentication error. Please try again.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    closePasswordPrompt();
  };

  return (
    <Dialog open={showPasswordPrompt} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Admin Mode Authentication
          </DialogTitle>
          <DialogDescription>
            Enter the admin password to access the content editor.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className={error ? 'border-red-500' : ''}
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Authenticate'}
            </Button>
          </div>
        </form>
        
        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md">
          <p className="font-semibold mb-1">💡 Tip:</p>
          <p>Press <kbd className="px-1 py-0.5 bg-background rounded">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-background rounded">Shift</kbd> + <kbd className="px-1 py-0.5 bg-background rounded">E</kbd> to toggle admin mode</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
