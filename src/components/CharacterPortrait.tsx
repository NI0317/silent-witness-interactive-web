import React from 'react';

type CharacterPortraitProps = {
  character: 'chen' | 'liu' | 'lin' | 'wu' | 'zhao' | 'meiMei';
  size?: 'sm' | 'md' | 'lg';
};

const characterImages = {
  chen: '/silent-witness-interactive-web/characters/chen.png',
  liu: '/silent-witness-interactive-web/characters/liu.png',
  lin: '/silent-witness-interactive-web/characters/lin.png',
  wu: '/silent-witness-interactive-web/characters/wu.png',
  zhao: '/silent-witness-interactive-web/characters/zhao.png',
  meiMei: '/silent-witness-interactive-web/characters/meiMei.png',
};

const sizes = {
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-full h-auto',
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ 
  character, 
  size = 'md' 
}) => {
  return (
    <div className={`relative ${sizes[size]} overflow-hidden rounded-lg bg-secondary`}>
      <img
        src={characterImages[character]}
        alt={`${character} portrait`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}; 