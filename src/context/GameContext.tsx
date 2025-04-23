import React, { createContext, useContext, useState, useEffect } from 'react';
import { gameScenes } from '../data/gameScenes';

// Define the types for our game state
export type CharacterId = 'chen' | 'liu' | 'lin' | 'wu' | 'zhao' | 'meiMei';

export interface Evidence {
  id: string;
  name: string;
  description: string;
  found: boolean;
  relatedTo: CharacterId[];
  image?: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  image: string;
  background: string;
  interviewed: boolean;
  suspicious: number; // 0-100 scale
}

export interface GameScene {
  id: string;
  title: string;
  description: string;
  image?: string;
  choices: {
    text: string;
    nextScene: string;
    requiresEvidence?: string;
    increaseSuspicion?: { character: CharacterId; amount: number };
    revealsEvidence?: string[];
  }[];
}

interface GameContextType {
  currentScene: string;
  setCurrentScene: (scene: string) => void;
  evidence: Evidence[];
  findEvidence: (id: string) => void;
  characters: Character[];
  increaseSuspicion: (characterId: CharacterId, amount: number) => void;
  decreaseSuspicion: (characterId: CharacterId, amount: number) => void;
  markAsInterviewed: (characterId: CharacterId) => void;
  playerNotes: string;
  addPlayerNote: (note: string) => void;
  gameScenes: Record<string, GameScene>;
  gameEnding: string | null;
  setGameEnding: (ending: string) => void;
  hasEvidence: (id: string) => boolean;
  restart: () => void;
}

const initialEvidence: Evidence[] = [
  {
    id: 'book',
    name: '古版《红楼梦》',
    description: '刘同学在事发前归还给梁教授的旧书。',
    found: false,
    relatedTo: ['liu']
  },
  {
    id: 'pen',
    name: '梁教授的钢笔',
    description: '用于签名的钢笔，经检测未发现毒物。',
    found: false,
    relatedTo: ['liu']
  },
  {
    id: 'honey',
    name: '可疑的"蜂蜜"',
    description: '赵编辑加入梁教授饮品中的物质。',
    found: false,
    relatedTo: ['zhao']
  },
  {
    id: 'inhaler',
    name: '哮喘吸入器',
    description: '梁教授治疗哮喘的药物。',
    found: false,
    relatedTo: ['wu']
  },
  {
    id: 'herbalMedicine',
    name: '中药配方',
    description: '林女士为梁教授准备的草药。',
    found: false,
    relatedTo: ['lin']
  },
  {
    id: 'fan',
    name: '改装风扇',
    description: '活动现场的风扇，含有可触发哮喘的刺激物。',
    found: false,
    relatedTo: ['wu']
  },
  {
    id: 'diary',
    name: '梁教授的日记',
    description: '记载着他的著作和人际关系的笔记。',
    found: false,
    relatedTo: ['chen', 'lin', 'liu', 'wu', 'zhao', 'meiMei']
  },
  {
    id: 'medical',
    name: '验尸报告',
    description: '显示教授死于一种罕见毒素引起的呼吸衰竭。',
    found: false,
    relatedTo: ['wu']
  },
  {
    id: 'manuscript',
    name: '原稿',
    description: '梁教授的新书手稿，边缘有个人笔记。',
    found: false,
    relatedTo: ['chen', 'liu', 'zhao']
  },
  {
    id: 'ancient',
    name: '古医书',
    description: '一卷挂在梁教授办公室的古代医方卷轴。',
    found: false,
    relatedTo: ['lin', 'meiMei']
  }
];

const initialCharacters: Character[] = [
  {
    id: 'chen',
    name: '陈副教授',
    role: '嫌疑人',
    image: '/characters/chen.png',
    background: '学术竞争对手，现为梁教授前妻的丈夫。他主张文学应服务于公共伦理，与梁教授在学术理念上存在深刻分歧。',
    interviewed: false,
    suspicious: 20
  },
  {
    id: 'liu',
    name: '刘同学',
    role: '嫌疑人',
    image: '/characters/liu.png',
    background: '梁教授的博士生，研究民国文学。与梁教授曾有不当关系，后被写入新书中，对其学术前途造成严重威胁。',
    interviewed: false,
    suspicious: 30
  },
  {
    id: 'lin',
    name: '林女士',
    role: '嫌疑人',
    image: '/characters/lin.png',
    background: '梁教授的前妻，古医药专家。精通古代医学，尤其是毒理学研究。为梁教授配制中药，但两人关系早已破裂。',
    interviewed: false,
    suspicious: 20
  },
  {
    id: 'wu',
    name: '吴医生',
    role: '嫌疑人',
    image: '/characters/wu.png',
    background: '梁教授的大学同学兼医生，对林女士怀有特殊感情。在新书中被影射为一个操纵病人的伪君子形象。',
    interviewed: false,
    suspicious: 15
  },
  {
    id: 'zhao',
    name: '赵编辑',
    role: '嫌疑人',
    image: '/characters/zhao.png',
    background: '出版人，因梁教授突然违约转投其他出版社而蒙受重大经济损失。对梁教授的背信弃义心怀不满。',
    interviewed: false,
    suspicious: 10
  },
  {
    id: 'meiMei',
    name: '梁小姐',
    role: '嫌疑人',
    image: '/characters/meiMei.png',
    background: '梁教授的妹妹，与其在家族古籍处理和产业分配上长期存在争执。对哥哥的专横和独断心存芥蒂。',
    interviewed: false,
    suspicious: 15
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState('intro');
  const [evidence, setEvidence] = useState<Evidence[]>(initialEvidence);
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [playerNotes, setPlayerNotes] = useState<string>('');
  const [gameEnding, setGameEnding] = useState<string | null>(null);

  // Load game state from localStorage if available
  useEffect(() => {
    const savedState = localStorage.getItem('silentWitnessGameState');
    if (savedState) {
      const { 
        currentScene: savedScene, 
        evidence: savedEvidence, 
        characters: savedCharacters,
        playerNotes: savedNotes,
        gameEnding: savedEnding
      } = JSON.parse(savedState);
      
      setCurrentScene(savedScene);
      setEvidence(savedEvidence);
      setCharacters(savedCharacters);
      setPlayerNotes(savedNotes || '');
      setGameEnding(savedEnding);
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = {
      currentScene,
      evidence,
      characters,
      playerNotes,
      gameEnding
    };
    localStorage.setItem('silentWitnessGameState', JSON.stringify(gameState));
  }, [currentScene, evidence, characters, playerNotes, gameEnding]);

  const findEvidence = (id: string) => {
    setEvidence(prevEvidence => 
      prevEvidence.map(item => 
        item.id === id ? { ...item, found: true } : item
      )
    );
  };

  const hasEvidence = (id: string) => {
    return evidence.find(item => item.id === id)?.found || false;
  };

  const increaseSuspicion = (characterId: CharacterId, amount: number) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === characterId 
          ? { ...char, suspicious: Math.min(100, char.suspicious + amount) } 
          : char
      )
    );
  };

  const decreaseSuspicion = (characterId: CharacterId, amount: number) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === characterId 
          ? { ...char, suspicious: Math.max(0, char.suspicious - amount) } 
          : char
      )
    );
  };

  const markAsInterviewed = (characterId: CharacterId) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === characterId ? { ...char, interviewed: true } : char
      )
    );
  };

  const addPlayerNote = (note: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const newNote = `[${timestamp}] ${note}\n\n`;
    setPlayerNotes(prev => prev + newNote);
  };

  const restart = () => {
    setCurrentScene('intro');
    setEvidence(initialEvidence);
    setCharacters(initialCharacters);
    setPlayerNotes('');
    setGameEnding(null);
    localStorage.removeItem('silentWitnessGameState');
  };

  return (
    <GameContext.Provider value={{
      currentScene,
      setCurrentScene,
      evidence,
      findEvidence,
      characters,
      increaseSuspicion,
      decreaseSuspicion,
      markAsInterviewed,
      playerNotes,
      addPlayerNote,
      gameScenes,
      gameEnding,
      setGameEnding,
      hasEvidence,
      restart
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
