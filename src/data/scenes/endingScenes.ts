
import { GameScene } from '../../context/GameContext';

export const endingScenes: Record<string, GameScene> = {
  'solve_case': {  
    id: 'solve_case',
    title: '破案时刻',
    description: '你已经收集了证据并询问了所有嫌疑人。根据你的调查，你认为谁应该对梁教授的死负责？',
    choices: [
      {
        text: '指控陈副教授',
        nextScene: 'accuse_chen'
      },
      {
        text: '指控刘同学',
        nextScene: 'accuse_liu'  
      },
      {
        text: '指控林女士',
        nextScene: 'accuse_lin'
      },
      {
        text: '指控吴医生',
        nextScene: 'accuse_wu'
      },
      {
        text: '指控赵编辑',
        nextScene: 'accuse_zhao'
      },
      {
        text: '指控梁小姐',
        nextScene: 'accuse_meiMei'
      },
      {
        text: '继续调查',
        nextScene: 'library_scene'
      }
    ]
  },
  'accuse_chen': {
    id: 'accuse_chen',
    title: '指控陈副教授',
    description: '你向陈副教授展示了你的证据，声称他因学术纠纷和个人恩怨谋杀了梁教授。然而，证据不足以证明他有机会或专业知识来实施如此复杂的毒杀。调查失败。',
    choices: [
      {
        text: '接受失败',
        nextScene: 'bad_ending'
      },
      {
        text: '重新调查',
        nextScene: 'solve_case'
      }
    ]
  },
  'accuse_liu': {
    id: 'accuse_liu',
    title: '指控刘同学',
    description: '你指控刘同学因为论文抄袭被发现而杀害了梁教授。虽然她确实有动机，但证据表明她缺乏必要的毒理学知识，也没有机会在茶中下毒。调查没有得到完全的成功。',
    choices: [
      {
        text: '接受结果',
        nextScene: 'ambiguous_ending'
      },
      {
        text: '重新调查',
        nextScene: 'solve_case'
      }
    ]
  },
  'accuse_lin': {
    id: 'accuse_lin',
    title: '指控林女士',
    description: '你指控林女士利用她的传统医药知识毒杀了前夫梁教授。但你的证据显示，她与梁教授的关系已经平和，没有明显动机。你的指控缺乏足够证据。',
    choices: [
      {
        text: '接受失败',
        nextScene: 'bad_ending'
      },
      {
        text: '重新调查',
        nextScene: 'solve_case'
      }
    ]
  },
  'accuse_wu': {
    id: 'accuse_wu',
    title: '指控吴医生',
    description: '你指控吴医生利用他的医学知识和对林女士的感情杀害了梁教授。证据显示，吴医生确实有知识、机会和潜在动机。在压力下，吴医生承认他修改了梁教授的哮喘吸入器，添加了能与茶中某些成分反应的物质，导致致命反应。',
    choices: [
      {
        text: '结案',
        nextScene: 'true_ending',
        revealsEvidence: ['inhaler', 'fan']
      }
    ]
  },
  'accuse_zhao': {
    id: 'accuse_zhao',
    title: '指控赵编辑',
    description: '你指控赵编辑在茶中投毒谋杀了梁教授。赵编辑承认在茶中加入了一些东西，但坚称那只是轻度泻药，不可能致命。法医证据支持他的说法：茶中的物质本身不足以致命。你的调查没有找出真正的凶手。',
    choices: [
      {
        text: '接受部分真相',
        nextScene: 'ambiguous_ending'
      },
      {
        text: '重新调查',
        nextScene: 'solve_case'
      }
    ]
  },
  'accuse_meiMei': {
    id: 'accuse_meiMei',
    title: '指控梁小姐',
    description: '你指控梁小姐因家族遗产纠纷毒杀了她的哥哥。虽然她确实有传统医药知识，但证据表明她在案发时间有确凿的不在场证明。你的指控被驳回。',
    choices: [
      {
        text: '接受失败',
        nextScene: 'bad_ending'
      },
      {
        text: '重新调查',
        nextScene: 'solve_case'
      }
    ]
  },
  'bad_ending': {
    id: 'bad_ending',
    title: '调查失败',
    description: '你未能找出真正的凶手。这个精心策划的谋杀案将永远是个谜。真相仍然埋藏在大学图书馆的阴影之中，而凶手逍遥法外。',
    choices: [
      {
        text: '重新开始调查',
        nextScene: 'intro'
      }
    ]
  },
  'ambiguous_ending': {
    id: 'ambiguous_ending',
    title: '部分成功',
    description: '你发现了一些真相，但完整的谜题仍未解开。虽然有些人为自己的行为付出了代价，但你感觉真正的凶手可能还逍遥法外。这个案子只能算部分破解。',
    choices: [
      {
        text: '重新开始调查',
        nextScene: 'intro'
      }
    ]
  },
  'true_ending': {
    id: 'true_ending',
    title: '真相大白',
    description: '真相终于水落石出。吴医生承认他修改了梁教授的哮喘吸入器，并在签售会上放置了一个含有特殊刺激物的风扇，这些刺激物与赵编辑茶中的物质反应，触发了致命的过敏反应。他这样做是因为多年来对林女士的暗恋，以及对梁教授如何对待她的怨恨。梁教授的死看似意外或简单投毒，实际上是一个精心策划的完美谋杀。',
    choices: [
      {
        text: '完成调查',
        nextScene: 'credits'
      }
    ]
  },
  'credits': {
    id: 'credits',
    title: '沉默的证人 - 制作人员名单',
    description: '感谢你体验这个互动侦探游戏!\n\n故事编写: Lovable AI\n游戏设计: Lovable AI\n编程: Lovable AI\n\n希望你享受这次侦探体验!',
    choices: [
      {
        text: '再玩一次',
        nextScene: 'intro'
      }
    ]
  }
};
