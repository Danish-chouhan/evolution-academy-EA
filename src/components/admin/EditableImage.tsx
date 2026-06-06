'use client';

import React, { useRef, useState } from 'react';
import { useContent } from './ContentProvider';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

type EditableImageProps = {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function EditableImage({
  contentKey,
  defaultSrc,
  alt,
  className = '',
  style,
}: EditableImageProps) {
  const { isAdmin, content, updateContent } = useContent();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const imageSrc = content[contentKey] ?? defaultSrc;

  if (!isAdmin) {
    return <img src={imageSrc} alt={alt} className={className} style={style} />;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      if (data.url) {
        updateContent(contentKey, data.url);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`relative group inline-block ${className}`} style={style}>
      <img src={imageSrc} alt={alt} className={`w-full h-full object-cover rounded-[inherit] ${isUploading ? 'opacity-50' : ''}`} />
      
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
      />

      <div 
        onClick={handleClick}
        className={`absolute inset-0 transition-opacity flex items-center justify-center cursor-pointer rounded-[inherit] ${isUploading ? 'bg-white/50 opacity-100' : 'bg-black/50 opacity-0 group-hover:opacity-100'}`}
      >
        <div className={`flex flex-col items-center px-4 py-2 rounded-lg ${isUploading ? 'text-brand-purple bg-white shadow-lg' : 'text-white bg-black/50'}`}>
          {isUploading ? (
            <>
              <Loader2 size={24} className="mb-1 animate-spin" />
              <span className="text-sm font-bold">Uploading...</span>
            </>
          ) : (
            <>
              <ImageIcon size={24} className="mb-1" />
              <span className="text-sm font-semibold">Change Image</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
