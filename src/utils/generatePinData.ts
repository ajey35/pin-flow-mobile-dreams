
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

const categoryData = {
  Photography: {
    titles: ['Sunset Photography Tips', 'Portrait Photography', 'Landscape Photography', 'Street Photography'],
    descriptions: ['Stunning sunset captured in golden hour', 'Beautiful portrait with natural lighting', 'Breathtaking landscape view']
  },
  Design: {
    titles: ['Minimalist Design', 'UI/UX Design Inspiration', 'Logo Design', 'Graphic Design Trends'],
    descriptions: ['Clean and modern design approach', 'User-friendly interface design', 'Creative graphic design solution']
  },
  Architecture: {
    titles: ['Modern Architecture', 'Classic Building Design', 'Sustainable Architecture', 'Interior Architecture'],
    descriptions: ['Innovative architectural solution', 'Timeless building design', 'Eco-friendly architecture']
  },
  Food: {
    titles: ['Healthy Recipe Ideas', 'Dessert Inspiration', 'Cooking Tips', 'Food Photography'],
    descriptions: ['Delicious and nutritious meal', 'Sweet treats for any occasion', 'Professional food styling']
  },
  Fashion: {
    titles: ['Street Style Fashion', 'Vintage Fashion', 'Sustainable Fashion', 'Fashion Trends'],
    descriptions: ['Trendy street style outfit', 'Timeless fashion inspiration', 'Eco-conscious fashion choice']
  },
  Travel: {
    titles: ['Travel Destination', 'Adventure Travel', 'Travel Photography', 'Cultural Experiences'],
    descriptions: ['Amazing travel destination', 'Unforgettable adventure experience', 'Cultural immersion journey']
  },
  Art: {
    titles: ['Digital Art Creation', 'Traditional Painting', 'Sculpture Art', 'Abstract Art'],
    descriptions: ['Creative digital artwork', 'Beautiful traditional painting', 'Stunning abstract composition']
  },
  Nature: {
    titles: ['Wildlife Photography', 'Natural Landscapes', 'Garden Design', 'Environmental Conservation'],
    descriptions: ['Amazing wildlife capture', 'Serene natural environment', 'Beautiful garden inspiration']
  }
};

const authors = [
  { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/40?img=1' },
  { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Emily Davis', avatar: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Alex Brown', avatar: 'https://i.pravatar.cc/40?img=4' },
  { name: 'Jessica Wilson', avatar: 'https://i.pravatar.cc/40?img=5' },
  { name: 'David Garcia', avatar: 'https://i.pravatar.cc/40?img=6' }
];

export const generatePinData = (count: number) => {
  const categories = Object.keys(categoryData);
  
  return Array.from({ length: count }, (_, index) => {
    const imageId = unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
    const height = Math.floor(Math.random() * 400) + 200;
    
    // Randomly select a category
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryInfo = categoryData[category as keyof typeof categoryData];
    
    const title = categoryInfo.titles[Math.floor(Math.random() * categoryInfo.titles.length)];
    const description = Math.random() > 0.3 ? 
      categoryInfo.descriptions[Math.floor(Math.random() * categoryInfo.descriptions.length)] : 
      undefined;
    
    return {
      id: `pin-${Date.now()}-${index}`,
      imageUrl: `https://images.unsplash.com/${imageId}?w=400&h=${height}&fit=crop`,
      title,
      description,
      author: authors[Math.floor(Math.random() * authors.length)],
      likes: Math.floor(Math.random() * 1000) + 10,
      isLiked: Math.random() > 0.7,
      isSaved: Math.random() > 0.8,
      category
    };
  });
};
