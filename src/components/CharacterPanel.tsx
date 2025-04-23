import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CharacterPortrait } from './CharacterPortrait';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useMediaQuery } from '../hooks/use-media-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CharacterPanel = () => {
  const { characters } = useGame();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const CharacterCard = ({ character }) => (
    <Card className="border border-border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-md font-medium">{character.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
      <div className="w-full aspect-square bg-secondary rounded-md overflow-hidden mb-2">
          <CharacterPortrait 
            character={character.id as any} 
            size="lg" 
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
  );

  const CharacterDetail = ({ character }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <CharacterPortrait character={character.id as any} size="md" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{character.name}</h4>
          <p className="text-sm text-muted-foreground">{character.role}</p>
        </div>
      </div>
      <div className="space-y-2">
        <h5 className="text-sm font-medium">人物背景</h5>
        <p className="text-sm leading-relaxed">{character.background}</p>
      </div>
      <div className="space-y-2">
        <h5 className="text-sm font-medium">怀疑程度</h5>
        <div className="flex items-center gap-2">
          <Progress value={character.suspicious} className="flex-1 h-2" />
          <span className="text-sm">{character.suspicious}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-serif font-semibold">嫌疑人</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map(character => (
          <div key={character.id}>
            {isDesktop ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="cursor-pointer">
                    <CharacterCard character={character} />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent 
                  className="w-80 bg-card p-4 shadow-xl border border-border"
                  side="right"
                  align="start"
                >
                  <CharacterDetail character={character} />
                </HoverCardContent>
              </HoverCard>
            ) : (
              <div 
                className="touch-pan-y cursor-pointer" 
                onClick={() => setSelectedCharacter(character)}
              >
                <CharacterCard character={character} />
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={selectedCharacter !== null} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>人物档案</DialogTitle>
          </DialogHeader>
          {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharacterPanel;
