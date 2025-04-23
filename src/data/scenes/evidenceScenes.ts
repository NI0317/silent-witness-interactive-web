
import { GameScene } from '../../context/GameContext';

export const evidenceScenes: Record<string, GameScene> = {
  'examine_table': {
    id: 'examine_table',
    title: '签售桌',
    description: '桌子上摆满了书，有些已经签名，有些还没有。梁教授的钢笔倒在他放下的地方。桌上有一杯喝了一半的茶，还有一盘传统点心。你注意到一本与其他书不同的书——一本旧版《红楼梦》，里面夹着书签。',
    choices: [
      {
        text: '检查钢笔',
        nextScene: 'examine_pen',
        revealsEvidence: ['pen']
      },
      {
        text: '查看茶杯',
        nextScene: 'examine_tea',
        revealsEvidence: ['honey']
      },
      {
        text: '查看旧书',
        nextScene: 'examine_book',
        revealsEvidence: ['book']
      },
      {
        text: '返回图书馆大厅',
        nextScene: 'library_scene'
      }
    ]
  },
  'examine_pen': {
    id: 'examine_pen',
    title: '钢笔',
    description: '一支刻有梁教授名字的昂贵钢笔。它看起来工作状态良好。法医小组已经检查过是否有毒，没有发现异常。',
    choices: [
      {
        text: '返回检查桌子',
        nextScene: 'examine_table'
      }
    ]
  },
  'examine_tea': {
    id: 'examine_tea',
    title: '茶杯',
    description: '一杯半满的茶，看起来是普通的绿茶。你注意到杯子边缘有一点奇怪的黄色残留物。可能是蜂蜜？茶几乎没有被动过，只有一小口的痕迹。',
    choices: [
      {
        text: '仔细检查黄色物质',
        nextScene: 'examine_honey',
        revealsEvidence: ['honey']
      },
      {
        text: '返回检查桌子',
        nextScene: 'examine_table'
      }
    ]
  },
  'examine_honey': {
    id: 'examine_honey',
    title: '可疑"蜂蜜"',
    description: '你发现这不是普通的蜂蜜。根据你的经验，这种黄色物质可能含有某种药物或毒素。你从杯子中取了一个样本进行进一步分析。',
    choices: [
      {
        text: '询问谁准备了这杯茶',
        nextScene: 'ask_about_tea'
      },
      {
        text: '返回检查桌子',
        nextScene: 'examine_table'
      }
    ]
  },
  'ask_about_tea': {
    id: 'ask_about_tea',
    title: '谁准备了茶？',
    description: '组织者告诉你，茶是由出版社的赵编辑特意为梁教授准备的。据说赵编辑坚持要亲自为梁教授服务，因为他们有重要的事情要谈。',
    choices: [
      {
        text: '在嫌疑人名单中记下赵编辑',
        nextScene: 'examine_table',
        increaseSuspicion: { character: 'zhao', amount: 20 }
      }
    ]
  },
  'examine_book': {
    id: 'examine_book',
    title: '古老的书',
    description: '这是一本旧版的《红楼梦》，看起来已有数十年历史。书中夹着一张纸条，上面写着："刘同学，我们需要谈谈你论文中的抄袭问题。签售会后在我办公室见。——梁"',
    choices: [
      {
        text: '在嫌疑人名单中记下刘同学',
        nextScene: 'examine_table',
        increaseSuspicion: { character: 'liu', amount: 15 },
        revealsEvidence: ['book']
      }
    ]
  },
  'talk_organizer': {
    id: 'talk_organizer',
    title: '活动组织者',
    description: '组织者是一位年轻的女士，看起来非常不安。"这太可怕了，"她说，"梁教授刚刚签完几本书，喝了一小口茶，然后就突然倒下了。赵编辑给他端的茶。 吴医生尝试急救但没有成功。"',
    choices: [
      {
        text: '询问更多关于赵编辑的事',
        nextScene: 'ask_about_zhao'
      },
      {
        text: '询问更多关于吴医生的事',
        nextScene: 'ask_about_wu'
      },
      {
        text: '返回图书馆大厅',
        nextScene: 'library_scene'
      }
    ]
  },
  'ask_about_zhao': {
    id: 'ask_about_zhao',
    title: '关于赵编辑',
    description: '"赵编辑是梁教授最近作品的出版人。据我所知，他们有一些合同纠纷。梁教授威胁要换出版社，这会让赵编辑损失很多钱。"',
    choices: [
      {
        text: '在嫌疑人名单中记下赵编辑',
        nextScene: 'talk_organizer',
        increaseSuspicion: { character: 'zhao', amount: 10 }
      }
    ]
  },
  'ask_about_wu': {
    id: 'ask_about_wu',
    title: '关于吴医生',
    description: '"吴医生是梁教授的老朋友，他们在大学时代就认识了。他碰巧也在签售会上，尝试急救梁教授但无济于事。他看起来很难过。"',
    choices: [
      {
        text: '返回与组织者交谈',
        nextScene: 'talk_organizer'
      }
    ]
  }
};
