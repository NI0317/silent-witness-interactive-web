
import React from 'react';
import { useGame } from '../context/GameContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EvidencePanel = () => {
  const { evidence, characters } = useGame();
  
  const foundEvidence = evidence.filter(item => item.found);

  if (foundEvidence.length === 0) {
    return (
      <div className="w-full space-y-4">
        <h2 className="text-xl font-serif font-semibold">证据</h2>
        <Card className="border border-dashed border-muted p-6">
          <div className="text-center text-muted-foreground">
            尚未收集到证据。继续调查。
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-serif font-semibold">证据 ({foundEvidence.length}/{evidence.length})</h2>
      <div className="grid grid-cols-1 gap-4">
        {foundEvidence.map(item => (
          <Card key={item.id} className="evidence-item">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-md font-medium">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex flex-wrap gap-2 mt-2">
                {item.relatedTo.map(charId => {
                  const character = characters.find(c => c.id === charId);
                  return character ? (
                    <Badge key={charId} variant="secondary" className="text-xs">
                      相关人物: {character.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EvidencePanel;
