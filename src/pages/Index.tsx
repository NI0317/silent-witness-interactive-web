
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameHeader from '../components/GameHeader';
import SceneDisplay from '../components/SceneDisplay';
import CharacterPanel from '../components/CharacterPanel';
import EvidencePanel from '../components/EvidencePanel';
import DetectiveNotebook from '../components/DetectiveNotebook';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <GameHeader />
        
        <main className="flex-1 container py-6 px-4 md:py-8 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SceneDisplay />
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="suspects">
                <TabsList className="w-full">
                  <TabsTrigger value="suspects" className="flex-1">嫌疑人</TabsTrigger>  
                  <TabsTrigger value="evidence" className="flex-1">证据</TabsTrigger>
                  <TabsTrigger value="notebook" className="flex-1">笔记</TabsTrigger>
                </TabsList>
                
                <TabsContent value="suspects" className="mt-4 space-y-4">
                  <CharacterPanel />
                </TabsContent>
                
                <TabsContent value="evidence" className="mt-4 space-y-4">
                  <EvidencePanel />
                </TabsContent>
                
                <TabsContent value="notebook" className="mt-4 space-y-4">
                  <DetectiveNotebook />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <footer className="border-t border-primary/20 py-4">
          <div className="container text-center text-sm text-muted-foreground">
            <p>沉默的证人 - 校园谋杀悬疑互动游戏</p>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
};

export default Index;
