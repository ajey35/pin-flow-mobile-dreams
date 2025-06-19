
import React, { useState } from 'react';
import { Heart, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PinCardProps {
  pin: {
    id: string;
    imageUrl: string;
    title: string;
    description?: string;
    author: {
      name: string;
      avatar: string;
    };
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
  };
}

export const PinCard: React.FC<PinCardProps> = ({ pin }) => {
  const [isLiked, setIsLiked] = useState(pin.isLiked);
  const [isSaved, setIsSaved] = useState(pin.isSaved);
  const [likesCount, setLikesCount] = useState(pin.likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <Card 
      className="break-inside-avoid mb-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={pin.imageUrl} 
          alt={pin.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-3 right-3 flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSave}
              className={`rounded-full transition-colors duration-200 ${
                isSaved ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/90 hover:bg-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Pin Info */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{pin.title}</h3>
        
        {pin.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{pin.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={pin.author.avatar} 
              alt={pin.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600 font-medium">{pin.author.name}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLike}
              className="p-1 hover:bg-red-50"
            >
              <Heart 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
                }`} 
              />
            </Button>
            <span className="text-sm text-gray-500">{likesCount}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
