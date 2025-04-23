import React from 'react';

type CharacterPortraitProps = {
  character: 'chen' | 'liu' | 'lin' | 'wu' | 'zhao' | 'meiMei';
  size?: 'sm' | 'md' | 'lg';
};

const characterImages = {
  chen: '/characters/chen.png',
  liu: '/characters/liu.png',
  lin: '/characters/lin.png',
  wu: '/characters/wu.png',
  zhao: '/characters/zhao.png',
  meiMei: '/characters/meiMei.png',
};

const sizes = {
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ 
  character, 
  size = 'md' 
}) => {
  return (
    <div className={`relative ${sizes[size]} overflow-hidden rounded-full`}>
      <img
        src={characterImages[character]}
        alt={`${character} portrait`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}; 