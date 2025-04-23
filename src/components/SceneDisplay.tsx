import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const SceneDisplay: React.FC = () => {
  const { 
    currentScene, 
    setCurrentScene, 
    gameScenes, 
    findEvidence, 
    increaseSuspicion, 
    markAsInterviewed, 
    hasEvidence,
    characters,
    gameEnding,
    setGameEnding
  } = useGame();

  const scene = gameScenes[currentScene];

  if (!scene) {
    return <div>错误：场景未找到</div>;
  }

  const handleChoice = (choice: {
    text: string;
    nextScene: string;
    requiresEvidence?: string;
    increaseSuspicion?: { character: string; amount: number };
    revealsEvidence?: string[];
  }) => {
    // Check if this choice requires evidence
    if (choice.requiresEvidence && !hasEvidence(choice.requiresEvidence)) {
      // TODO: Show message that evidence is required
      return;
    }

    // Process evidence being revealed
    if (choice.revealsEvidence && choice.revealsEvidence.length > 0) {
      choice.revealsEvidence.forEach(evidenceId => {
        findEvidence(evidenceId);
      });
    }

    // Process suspicion increase
    if (choice.increaseSuspicion) {
      increaseSuspicion(
        choice.increaseSuspicion.character as any, 
        choice.increaseSuspicion.amount
      );
    }

    // Mark character as interviewed if applicable
    if (currentScene.startsWith('interview_') && !currentScene.includes('_')) {
      const characterId = currentScene.split('_')[1];
      markAsInterviewed(characterId as any);
    }

    // Check for endings
    if (choice.nextScene === 'bad_ending') {
      setGameEnding('bad');
    } else if (choice.nextScene === 'ambiguous_ending') {
      setGameEnding('ambiguous');
    } else if (choice.nextScene === 'true_ending') {
      setGameEnding('true');
    }

    // Move to next scene
    setCurrentScene(choice.nextScene);
  };

  return (
    <div className="scene-transition p-6 bg-card rounded-lg border border-border shadow-lg max-w-3xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-center">{scene.title}</h2>
        
        {scene.image && (
          <div className="w-full aspect-video bg-muted rounded-md overflow-hidden mb-6">
            <img 
              src={scene.image} 
              alt={scene.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-slate max-w-none">
          <p className="text-lg leading-relaxed">{scene.description}</p>
        </div>
        
        <div className="space-y-3 pt-4">
          {scene.choices.map((choice, index) => {
            const isDisabled = !!choice.requiresEvidence && !hasEvidence(choice.requiresEvidence);
            
            return (
              <div key={index} className="w-full">
                <Button
                  onClick={() => handleChoice(choice)}
                  className={`w-full text-left justify-start choice-button ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isDisabled}
                >
                  {choice.text}
                  {choice.requiresEvidence && (
                    <Badge 
                      className="ml-2" 
                      variant={hasEvidence(choice.requiresEvidence) ? "default" : "secondary"}
                    >
                      需要证据
                    </Badge>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
        
        {gameEnding && (
          <Card className="p-4 mt-4 bg-primary/10 border-primary">
            <p className="font-serif italic text-center">
              {gameEnding === 'bad' && "破案失败。真相依然被掩盖。"}
              {gameEnding === 'ambiguous' && "你走在正确的方向上，但缺乏确凿的证据。"}
              {gameEnding === 'true' && "你成功揭露了这个完美犯罪的真相！"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SceneDisplay;
