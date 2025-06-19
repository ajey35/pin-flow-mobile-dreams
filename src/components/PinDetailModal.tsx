
import React, { useState } from 'react';
import { X, Heart, Bookmark, Share, Download, MoreHorizontal, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface PinDetailModalProps {
  pin: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PinDetailModal: React.FC<PinDetailModalProps> = ({ pin, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(pin?.isLiked || false);
  const [isSaved, setIsSaved] = useState(pin?.isSaved || false);
  const [likesCount, setLikesCount] = useState(pin?.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', text: 'Amazing photo! Love the composition.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
    { id: 2, author: 'Sarah Wilson', text: 'Where was this taken?', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' }
  ]);

  if (!pin) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        author: 'You',
        text: comment,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face'
      }]);
      setComment('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[95vh] p-0 overflow-hidden bg-white rounded-3xl shadow-2xl">
        <DialogTitle className="sr-only">{pin.title}</DialogTitle>
        <DialogDescription className="sr-only">Pin details and interactions</DialogDescription>
        
        <div className="flex h-full">
          {/* Image Section */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center relative group">
            <img 
              src={pin.imageUrl} 
              alt={pin.title}
              className="max-w-full max-h-full object-contain rounded-l-3xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="sm" variant="secondary" className="rounded-full bg-white/90 hover:bg-white shadow-lg">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Details Section */}
          <div className="w-96 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  onClick={handleSave}
                  className={`rounded-full px-6 py-2 font-semibold transition-all duration-200 ${
                    isSaved ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                <Button size="sm" variant="outline" className="rounded-full p-2">
                  <Share className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-full p-2">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" variant="ghost" onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{pin.title}</h1>
                {pin.description && (
                  <p className="text-gray-600 leading-relaxed">{pin.description}</p>
                )}
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                <img 
                  src={pin.author.avatar} 
                  alt={pin.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{pin.author.name}</p>
                  <p className="text-sm text-gray-500">1.2M followers</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full px-4 py-2 font-semibold">
                  Follow
                </Button>
              </div>

              {/* Engagement */}
              <div className="flex items-center space-x-6 py-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLike}
                  className="flex items-center space-x-2 hover:bg-red-50 rounded-full px-3 py-2"
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'
                    }`} 
                  />
                  <span className="font-medium">{likesCount}</span>
                </Button>
                <Button size="sm" variant="ghost" className="flex items-center space-x-2 hover:bg-gray-50 rounded-full px-3 py-2">
                  <MessageCircle className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{comments.length}</span>
                </Button>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Comments</h3>
                
                {/* Add Comment */}
                <div className="flex space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" 
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 flex space-x-2">
                    <Input
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1 border-gray-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <Button 
                      size="sm" 
                      onClick={handleAddComment}
                      disabled={!comment.trim()}
                      className="rounded-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      Post
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((commentItem) => (
                    <div key={commentItem.id} className="flex space-x-3">
                      <img 
                        src={commentItem.avatar} 
                        alt={commentItem.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">{commentItem.author}</p>
                        <p className="text-gray-600 text-sm mt-1">{commentItem.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
