
import React from 'react';
import { useGame } from '../context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CharacterPanel = () => {
  const { characters } = useGame();

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-serif font-semibold">嫌疑人</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map(character => (
          <Card key={character.id} className="border border-border overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-md font-medium">{character.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <div className="w-full aspect-square bg-secondary rounded-md overflow-hidden mb-2">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-full h-full object-cover character-portrait" 
                />
              </div>
              <div className="text-sm text-muted-foreground">{character.role}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>怀疑程度</span>
                  <span>{character.suspicious}%</span>
                </div>
                <Progress value={character.suspicious} className="h-2" />
              </div>
              {character.interviewed && (
                <div className="text-xs text-primary mt-2 italic">已询问</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CharacterPanel;
