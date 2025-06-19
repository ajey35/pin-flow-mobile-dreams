
const unsplashImages = [
  'photo-1649972904349-6e44c42644a7',
  'photo-1488590528505-98d2b5aba04b',
  'photo-1518770660439-4636190af475',
  'photo-1461749280684-dccba630e2f6',
  'photo-1581091226825-a6a2a5aee158',
  'photo-1526374965328-7f61d4dc18c5',
  'photo-1487058792275-0ad4aaf24ca7',
  'photo-1605810230434-7631ac76ec81',
  'photo-1500673922987-e212871fec22',
  'photo-1506744038136-46273834b3fb',
  'photo-1582562124811-c09040d0a901',
  'photo-1721322800607-8c38375eef04'
];

const pinTitles = [
  'Minimalist Interior Design',
  'Beautiful Nature Photography',
  'Modern Architecture',
  'Delicious Food Inspiration',
  'Creative Art Project',
  'Travel Destination',
  'Fashion Style Guide',
  'DIY Home Decor',
  'Inspiring Quotes',
  'Workspace Setup',
  'Garden Design Ideas',
  'Cozy Reading Nook'
];

const descriptions = [
  'Beautiful inspiration for your next project',
  'Love the colors and composition',
  'Perfect for modern living spaces',
  'Such a creative approach to design',
  'Bookmark this for later reference',
  'Amazing attention to detail',
  'This would look great in my home',
  'Incredible use of natural light'
];

const authors = [
  { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Emily Davis', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Alex Brown', avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'Jessica Wilson', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'David Garcia', avatar: 'https://i.pravatar.cc/40?img=6' }
];

export const generatePinData = (count: number) => {
  return Array.from({ length: count }, (_, index) => {
    const imageId = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    const height = Math.floor(Math.random() * 400) + 200; // Random height between 200-600
    
    return {
      id: `pin-${Date.now()}-${index}`,
      imageUrl: `https://images.unsplash.com/${imageId}?w=400&h=${height}&fit=crop`,
      title: pinTitles[Math.floor(Math.random() * pinTitles.length)],
      description: Math.random() > 0.5 ? descriptions[Math.floor(Math.random() * descriptions.length)] : undefined,
      author: authors[Math.floor(Math.random() * authors.length)],
      likes: Math.floor(Math.random() * 1000) + 10,
      isLiked: Math.random() > 0.7,
      isSaved: Math.random() > 0.8
    };
  });
};
