import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DetectiveNotebook = () => {
  const { playerNotes, addPlayerNote, evidence, characters } = useGame();
  const [newNote, setNewNote] = useState('');
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      addPlayerNote(newNote.trim());
      setNewNote('');
    }
  };
  
  const suspiciousCharacters = [...characters]
    .sort((a, b) => b.suspicious - a.suspicious)
    .filter(char => char.suspicious > 0);
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 h-full shadow-md">
      <h2 className="text-xl font-serif font-semibold mb-4">侦探笔记</h2>
      
      <Tabs defaultValue="notes">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="notes" className="flex-1">笔记</TabsTrigger>
          <TabsTrigger value="evidence" className="flex-1">案件总结</TabsTrigger>
          <TabsTrigger value="notebook" className="flex-1">线索</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="space-y-4">
          <Textarea
            placeholder="在此记录你的侦探笔记..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px] font-mono text-sm"
          />
          
          <Button onClick={handleAddNote} className="w-full">
            添加笔记
          </Button>
          
          <div className="mt-4 bg-secondary/30 rounded p-3 max-h-[300px] overflow-y-auto">
            {playerNotes ? (
              <pre className="whitespace-pre-wrap text-sm font-mono">{playerNotes}</pre>
            ) : (
              <p className="text-muted-foreground text-center italic">你的案件笔记将显示在这里</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="summary">
          <div className="space-y-4">
            <div className="detective-note">
              <p className="font-serif italic">梁教授死于一种复杂的投毒，这需要专业的医学知识和精确的时机。</p>
            </div>
            
            {evidence.filter(e => e.found).length > 0 && (
              <div>
                <h3 className="font-medium mb-2">关键证据：</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {evidence.filter(e => e.found).map(e => (
                    <li key={e.id} className="text-sm">{e.name}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {suspiciousCharacters.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">主要嫌疑人：</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {suspiciousCharacters.map(char => (
                    <li key={char.id} className="text-sm">
                      {char.name} - 嫌疑程度: {char.suspicious}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetectiveNotebook;
