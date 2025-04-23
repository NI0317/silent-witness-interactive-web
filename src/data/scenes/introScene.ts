
import { GameScene } from '../../context/GameContext';

export const introScene: Record<string, GameScene> = {
  'intro': {
    id: 'intro',
    title: '沉默的证人',
    description: '这原本应该是大学图书馆的一场普通签售会。然而，著名文学学者梁教授在签书时突然倒下身亡。作为张警官的你被指派调查这起精心策划的谋杀案。六名嫌疑人，每个人都有各自的动机，现场散布着各种证据，你必须揭开真相。',
    choices: [
      {
        text: '开始调查',
        nextScene: 'library_scene',
      }
    ]
  },
  'library_scene': {
    id: 'library_scene',
    title: '大学图书馆',
    description: '你到达案发现场的大学图书馆。现场已经被封锁，但一切都保持原状。梁教授的遗体已被送往法医鉴定，但他的随身物品仍在签售桌上。几位目击者和嫌疑人仍在现场，看起来都很震惊。',
    choices: [
      {
        text: '检查签售桌',
        nextScene: 'examine_table',
        revealsEvidence: ['pen']
      },
      {
        text: '与活动组织者交谈',
        nextScene: 'talk_organizer'
      },
      {
        text: '询问目击者',
        nextScene: 'interview_selection'
      }
    ]
  }
};
