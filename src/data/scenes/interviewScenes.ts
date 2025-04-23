
import { GameScene } from '../../context/GameContext';

export const interviewScenes: Record<string, GameScene> = {
  'interview_selection': {
    id: 'interview_selection',
    title: '选择询问对象',
    description: '几位与梁教授有关的人正等待接受询问。你想先和谁谈谈？',
    choices: [
      {
        text: '陈副教授 - 学术竞争对手',
        nextScene: 'interview_chen'
      },
      {
        text: '刘同学 - 博士生',
        nextScene: 'interview_liu'
      },
      {
        text: '林女士 - 前妻和医药专家',
        nextScene: 'interview_lin'
      },
      {
        text: '吴医生 - 大学好友兼医生',
        nextScene: 'interview_wu'
      },
      {
        text: '赵编辑 - 出版人',
        nextScene: 'interview_zhao'
      },
      {
        text: '梁小姐 - 教授的妹妹',
        nextScene: 'interview_meiMei'
      },
      {
        text: '返回图书馆大厅',
        nextScene: 'library_scene'
      }
    ]
  },
  'interview_chen': {
    id: 'interview_chen',
    title: '询问陈副教授',
    description: '陈副教授看起来很紧张。"我知道我们有学术分歧，但我绝对不会伤害梁教授。我们最近争论的是中国古代文学研究方法，但这只是学术讨论，没有私人恩怨。"',
    choices: [
      {
        text: '询问他最近一次与梁教授的互动',
        nextScene: 'chen_last_interaction'
      },
      {
        text: '询问他与林女士的关系',
        nextScene: 'chen_relationship'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'chen_last_interaction': {
    id: 'chen_last_interaction',
    title: '最后的互动',
    description: '"我们上周在教授会议上争论了研究方法。他指责我的研究缺乏创新，我可能说了一些过激的话...但我绝不会做出如此极端的事情！"',
    choices: [
      {
        text: '在嫌疑人名单中记下陈副教授',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'chen', amount: 15 }
      }
    ]
  },
  'chen_relationship': {
    id: 'chen_relationship',
    title: '与林女士的关系',
    description: '"是的，我现在与林女士结婚了。这让我与梁教授的关系更加复杂。但我们都是成年人，能够处理这些个人问题而不诉诸暴力。"',
    choices: [
      {
        text: '返回询问陈副教授',
        nextScene: 'interview_chen'
      }
    ]
  },
  'interview_liu': {
    id: 'interview_liu',
    title: '询问刘同学',
    description: '刘同学是梁教授的博士生，看起来很难过。"梁教授是一位严格但公正的导师。我不敢相信他就这样离开了..."',
    choices: [
      {
        text: '询问书里的纸条',
        nextScene: 'liu_note',
        requiresEvidence: 'book'
      },
      {
        text: '询问她的论文',
        nextScene: 'liu_thesis'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'liu_note': {
    id: 'liu_note',
    title: '关于纸条',
    description: '刘同学脸色突然变得苍白。"是的，梁教授发现了我论文中的一些...问题。我引用了一些未经许可的资料。他威胁要举报我，这会毁了我的学术生涯..."',
    choices: [
      {
        text: '在嫌疑人名单中记下刘同学',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'liu', amount: 25 }
      }
    ]
  },
  'liu_thesis': {
    id: 'liu_thesis',
    title: '关于论文',
    description: '"我的论文研究中国古典文学中的隐喻表达。梁教授最近对我的进度不太满意，要求我重写几个章节..."刘同学似乎有所隐瞒。',
    choices: [
      {
        text: '追问论文问题',
        nextScene: 'liu_thesis_problem'
      },
      {
        text: '返回询问刘同学',
        nextScene: 'interview_liu'
      }
    ]
  },
  'liu_thesis_problem': {
    id: 'liu_thesis_problem',
    title: '论文的问题',
    description: '在你的坚持下，刘同学最终承认："好吧，梁教授发现我引用了一些未经许可的资料。他威胁要举报我的学术不端行为..."',
    choices: [
      {
        text: '在嫌疑人名单中记下刘同学',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'liu', amount: 20 }
      }
    ]
  },
  'interview_lin': {
    id: 'interview_lin',
    title: '询问林女士',
    description: '林女士是梁教授的前妻，一位著名的传统医药专家。她看起来很平静。"虽然我们离婚了，但我不恨他。我们已经各自有了新生活。"',
    choices: [
      {
        text: '询问她对传统医药的了解',
        nextScene: 'lin_medicine'
      },
      {
        text: '询问她的新婚姻',
        nextScene: 'lin_marriage'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'lin_medicine': {
    id: 'lin_medicine',
    title: '传统医药',
    description: '"是的，我研究传统中药已有20年。我对草药和其毒性非常了解。但这并不意味着我会用这些知识来伤害别人，特别是梁教授。"',
    choices: [
      {
        text: '在嫌疑人名单中记下林女士',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'lin', amount: 15 }
      }
    ]
  },
  'lin_marriage': {
    id: 'lin_marriage',
    title: '新婚姻',
    description: '"是的，我现在与陈副教授结婚了。这确实使情况变得复杂，因为他和梁教授有学术分歧。但我们都是文明人，能够处理这种情况。"',
    choices: [
      {
        text: '返回询问林女士',
        nextScene: 'interview_lin'
      }
    ]
  },
  'interview_wu': {
    id: 'interview_wu',
    title: '询问吴医生',
    description: '吴医生看起来非常悲伤。"我尽力抢救他了，但毒素扩散得太快。如果我早些注意到症状，也许能救他..."',
    choices: [
      {
        text: '询问死因细节',
        nextScene: 'wu_cause_of_death'
      },
      {
        text: '询问他与梁教授的关系',
        nextScene: 'wu_relationship'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'wu_cause_of_death': {
    id: 'wu_cause_of_death',
    title: '死因',
    description: '"初步来看，梁教授死于一种罕见毒素，它触发了严重的过敏反应，导致呼吸衰竭。这种毒素在某些传统草药中有，但需要专业知识才能提取和使用。"',
    choices: [
      {
        text: '询问谁可能拥有这种知识',
        nextScene: 'wu_who_has_knowledge'
      },
      {
        text: '返回询问吴医生',
        nextScene: 'interview_wu'
      }
    ]
  },
  'wu_who_has_knowledge': {
    id: 'wu_who_has_knowledge',
    title: '谁有这种知识',
    description: '"林女士肯定有这种知识，她研究传统医药多年。但我也了解这些草药，作为一名医生。梁教授的妹妹梁小姐也对古代药方有研究。"',
    choices: [
      {
        text: '记下这些信息',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'lin', amount: 10 },
        revealsEvidence: ['medical']
      }
    ]
  },
  'wu_relationship': {
    id: 'wu_relationship',
    title: '与梁教授的关系',
    description: '"我们是大学同学，多年的朋友。不过...我必须承认，我一直对林女士有好感，甚至在她嫁给梁教授之前。但我绝不会因此伤害梁教授。"',
    choices: [
      {
        text: '在嫌疑人名单中记下吴医生',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'wu', amount: 15 }
      }
    ]
  },
  'interview_zhao': {
    id: 'interview_zhao',
    title: '询问赵编辑',
    description: '赵编辑看起来很不安。"是的，我为梁教授端了茶，但我绝对没有在里面放任何东西！我只是加了蜂蜜，因为我知道他喜欢。"',
    choices: [
      {
        text: '询问出版合同',
        nextScene: 'zhao_contract'
      },
      {
        text: '询问蜂蜜',
        nextScene: 'zhao_honey',
        requiresEvidence: 'honey'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'zhao_contract': {
    id: 'zhao_contract',
    title: '出版合同',
    description: '"好吧，是的，我们确实有一些合同纠纷。梁教授威胁要取消我们的合同，转投其他出版社。这会让我损失大笔投资。但我不会为了钱杀人！"',
    choices: [
      {
        text: '在嫌疑人名单中记下赵编辑',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'zhao', amount: 20 }
      }
    ]
  },
  'zhao_honey': {
    id: 'zhao_honey',
    title: '关于蜂蜜',
    description: '当你向赵编辑出示"蜂蜜"样本时，他变得非常紧张。"我...我不知道那是什么。我只用了组织者提供的蜂蜜。也许是别人篡改了它！"',
    choices: [
      {
        text: '继续施压',
        nextScene: 'zhao_pressure'
      },
      {
        text: '返回询问赵编辑',
        nextScene: 'interview_zhao'
      }
    ]
  },
  'zhao_pressure': {
    id: 'zhao_pressure',
    title: '施压赵编辑',
    description: '在强烈的压力下，赵编辑崩溃了。"好吧！我确实在蜂蜜中加了一些东西，但那只是为了让梁教授感到不舒服，不是杀死他！那应该只是轻度泻药，让他难堪一下..."',
    choices: [
      {
        text: '在嫌疑人名单中记下赵编辑',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'zhao', amount: 30 }
      }
    ]
  },
  'interview_meiMei': {
    id: 'interview_meiMei',
    title: '询问梁小姐',
    description: '梁小姐是梁教授的妹妹，看起来悲痛欲绝。"我哥哥虽然在学术上很严厉，但他是个好人。我不敢相信有人会杀他..."',
    choices: [
      {
        text: '询问她与哥哥的关系',
        nextScene: 'meiMei_relationship'
      },
      {
        text: '询问她对传统医药的了解',
        nextScene: 'meiMei_medicine'
      },
      {
        text: '返回询问选择',
        nextScene: 'interview_selection'
      }
    ]
  },
  'meiMei_relationship': {
    id: 'meiMei_relationship',
    title: '兄妹关系',
    description: '"我们关系一直很好，虽然最近因为家族财产分配有些争执...父母留下的古医书应该由我保管，因为我是家族医药传统的继承者，但哥哥坚持要保留它们用于他的研究。"',
    choices: [
      {
        text: '在嫌疑人名单中记下梁小姐',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'meiMei', amount: 10 }
      }
    ]
  },
  'meiMei_medicine': {
    id: 'meiMei_medicine',
    title: '传统医药知识',
    description: '"是的，我确实学习了家族传承的医药知识。我们家有几代人都是中医。我也教授中医课程。我知道某些草药是有毒的，但我永远不会用这些知识来伤害人，特别是我的亲人！"',
    choices: [
      {
        text: '在嫌疑人名单中记下梁小姐',
        nextScene: 'interview_selection',
        increaseSuspicion: { character: 'meiMei', amount: 15 }
      }
    ]
  }
};
