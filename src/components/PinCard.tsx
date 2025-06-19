
import React, { useState } from 'react';
import { Heart, Bookmark, MoreHorizontal, Download, Share, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PinDetailModal } from '@/components/PinDetailModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card 
        className="break-inside-avoid mb-6 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl group bg-white rounded-3xl border-0 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <img 
            src={pin.imageUrl} 
            alt={pin.title}
            className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Top Actions */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleSave}
                className={`rounded-full p-2 transition-all duration-300 shadow-lg backdrop-blur-sm transform ${
                  isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                } ${
                  isSaved ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white/95 hover:bg-white text-gray-700'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className={`rounded-full p-2 bg-white/95 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                  isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
                style={{ transitionDelay: '50ms' }}
              >
                <Share className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className={`rounded-full p-2 bg-white/95 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                  isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
                style={{ transitionDelay: '100ms' }}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Bottom Info on hover */}
            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 transform ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="flex justify-between items-end">
                <div className="flex items-center space-x-3">
                  <img 
                    src={pin.author.avatar} 
                    alt={pin.author.name}
                    className="w-10 h-10 rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-white/50"
                  />
                  <div>
                    <span className="text-white font-semibold text-sm drop-shadow-lg">{pin.author.name}</span>
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-white/90 text-xs drop-shadow">{likesCount} likes</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLike}
                  className="p-2 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <Heart 
                    className={`w-6 h-6 transition-all duration-300 ${
                      isLiked ? 'fill-red-500 text-red-500 scale-110' : 'text-white'
                    }`} 
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Pin Info */}
        <div className="p-5">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-3 group-hover:text-red-600 transition-colors duration-300 text-lg leading-tight">
            {pin.title}
          </h3>
          
          {pin.description && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">{pin.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={pin.author.avatar} 
                alt={pin.author.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
              />
              <span className="text-sm text-gray-700 font-medium">{pin.author.name}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 font-medium">{likesCount}</span>
              <Heart 
                className={`w-4 h-4 transition-colors duration-200 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`} 
              />
            </div>
          </div>
        </div>
      </Card>

      <PinDetailModal 
        pin={pin}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
