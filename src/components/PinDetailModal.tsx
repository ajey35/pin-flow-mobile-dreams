
import React, { useState } from 'react';
import { X, Heart, Bookmark, Share, Download, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface PinDetailModalProps {
  pin: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PinDetailModal: React.FC<PinDetailModalProps> = ({ pin, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(pin?.isLiked || false);
  const [isSaved, setIsSaved] = useState(pin?.isSaved || false);
  const [likesCount, setLikesCount] = useState(pin?.likes || 0);

  if (!pin) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Image Section */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img 
              src={pin.imageUrl} 
              alt={pin.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Details Section */}
          <div className="w-96 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  className={`rounded-full ${
                    isSaved ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <Share className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h1 className="text-2xl font-bold mb-4">{pin.title}</h1>
              
              {pin.description && (
                <p className="text-gray-600 mb-6 leading-relaxed">{pin.description}</p>
              )}

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={pin.author.avatar} 
                  alt={pin.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{pin.author.name}</p>
                  <p className="text-sm text-gray-500">1.2M followers</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto rounded-full">
                  Follow
                </Button>
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-4 mb-6">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLike}
                  className="flex items-center space-x-2"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
                    }`} 
                  />
                  <span>{likesCount}</span>
                </Button>
                <Button size="sm" variant="ghost" className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </Button>
              </div>

              {/* Comments Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Comments</h3>
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">John Doe</p>
                      <p className="text-gray-600 text-sm">Amazing photo! Love the composition.</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" 
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">Sarah Wilson</p>
                      <p className="text-gray-600 text-sm">Where was this taken?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
