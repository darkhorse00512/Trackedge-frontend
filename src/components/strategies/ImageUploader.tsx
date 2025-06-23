import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Plus, X, Upload } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
  maxSizeInMB?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImagesUploaded,
  initialImages = [],
  maxImages = 10,
  maxSizeInMB = 5
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processFiles(Array.from(e.target.files));
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadToFirebase = async (file: File) => {
    const userId = auth.currentUser?.uid;
    
    if (!userId) {
      toast.error("You must be logged in to upload images");
      return null;
    }

    try {
      const storage = getStorage();
      const imageId = uuidv4();
      
      // Create a reference to the specific path as requested
      const storageRef = ref(storage, `users/${userId}/strategies`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const processFiles = async (files: File[]) => {
    // Check if adding new files exceeds the maximum
    if (images.length + files.length > maxImages) {
      toast.error(`You can upload a maximum of ${maxImages} images`);
      return;
    }

    const validFiles: File[] = [];

    // Validate files
    for (const file of files) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }

      // Check file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error(`${file.name} is too large (max ${maxSizeInMB}MB)`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const uploadPromises = validFiles.map(async file => {
        // Upload to Firebase and get URL
        const url = await uploadToFirebase(file);
        return url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null) as string[];
      
      if (validUrls.length > 0) {
        setImages(prev => {
          const newImages = [...prev, ...validUrls];
          onImagesUploaded(newImages);
          return newImages;
        });
        
        toast.success(`${validUrls.length} image${validUrls.length > 1 ? 's' : ''} uploaded successfully`);
      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error processing uploads:", error);
      toast.error("An error occurred while uploading images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      onImagesUploaded(newImages);
      return newImages;
    });
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-border hover:border-primary/50 hover:bg-muted'
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-muted p-3">
            <Upload className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG or GIF (max {maxSizeInMB}MB)
            </p>
          </div>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group aspect-square border rounded-md overflow-hidden bg-muted"
            >
              <img 
                src={image} 
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 
                          opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
