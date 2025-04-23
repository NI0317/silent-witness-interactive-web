
import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '@/components/ui/button';

const GameHeader = () => {
  const { restart } = useGame();

  return (
    <header className="w-full py-4 border-b border-primary/20">
      <div className="container flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-primary">沉默的证人</h1>
        <div>
          <Button 
            variant="outline"
            onClick={restart}
            className="font-serif"
          >
            重新开始
          </Button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
