
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ImageUploader } from '@/components/trades/ImageUploader';
import { Trash2, Upload, User } from 'lucide-react';
import { toast } from 'sonner';

interface AvatarEditorProps {
  currentAvatar: string;
  name: string;
  onAvatarChange: (newAvatar: string | null) => void;
}

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ 
  currentAvatar, 
  name,
  onAvatarChange 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleOpenRemoveDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoveDialogOpen(true);
  };

  const handleImageUploaded = (urls: string[]) => {
    if (urls.length > 0) {
      onAvatarChange(urls[0]);
      setIsDialogOpen(false);
      toast.success("Avatar updated successfully");
    }
  };

  const handleRemoveAvatar = () => {
    onAvatarChange(null);
    setIsRemoveDialogOpen(false);
    toast.success("Avatar removed");
  };

  return (
    <>
      <div 
        className="relative group cursor-pointer" 
        onClick={handleOpenDialog}
        title="Click to change avatar"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-tradeedge-blue-light rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
        <Avatar className="h-32 w-32 border-4 border-background relative">
          <AvatarImage src={currentAvatar} alt={name} />
          <AvatarFallback className="text-4xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Upload className="h-8 w-8 text-white" />
        </div>

        {currentAvatar && (
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute -bottom-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleOpenRemoveDialog}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Avatar</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ImageUploader 
              onImagesUploaded={handleImageUploaded}
              initialImages={currentAvatar ? [currentAvatar] : []}
              maxImages={1}
              maxSizeInMB={2}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Avatar Confirmation Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Profile Avatar</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to remove your profile avatar?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveAvatar}>
              Remove Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
