
import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
    console.log('File dropped');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating pin:', { title, description, imageUrl });
    // Reset form
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Pin</h1>
        <p className="text-gray-600">Share your ideas with the world</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-300 ${
              dragOver ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Choose a file or drag and drop it here</h3>
            <p className="text-gray-500 mb-4">We recommend using high quality .jpg files less than 20MB</p>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Or paste image URL</label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Details Section */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                type="text"
                placeholder="Add a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="Tell everyone what your Pin is about"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Board</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option>Choose a board</option>
                <option>My Ideas</option>
                <option>Inspiration</option>
                <option>Home Decor</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                Create Pin
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                Save Draft
              </Button>
            </div>
          </form>

          {/* Preview */}
          {(imageUrl || title) && (
            <Card className="mt-6 p-4">
              <h3 className="font-semibold mb-3">Preview</h3>
              <div className="space-y-2">
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                {title && <p className="font-medium">{title}</p>}
                {description && <p className="text-sm text-gray-600">{description}</p>}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
