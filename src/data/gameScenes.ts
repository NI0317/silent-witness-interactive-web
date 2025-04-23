
import { GameScene } from '../context/GameContext';
import { introScene } from './scenes/introScene';
import { evidenceScenes } from './scenes/evidenceScenes';
import { interviewScenes } from './scenes/interviewScenes';
import { endingScenes } from './scenes/endingScenes';

export const gameScenes: Record<string, GameScene> = {
  ...introScene,
  ...evidenceScenes,
  ...interviewScenes,
  ...endingScenes,
};
