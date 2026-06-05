/**
 * Show data registry.
 * PREDEFINED_LOCATIONS is defined in locations.js (loaded before this file).
 */
const SHOWS_DATA = {
  'big-bang-theory': {
    id: 'big-bang-theory',
    title: '生活大爆炸',
    titleEn: 'The Big Bang Theory',
    year: '2007-2019',
    seasons: 12,
    episodes: 279,
    logo: '🎭',
    poster: 'assets/shows/big-bang-theory/poster.png',
    defaultLocationId: 'shangqiu-yizhong',
    tagline: 'Geek is the new cool.',
    rating: '9.1',
    genre: '情景喜剧 / 科学 / 友情',
    network: 'CBS',
    description: '讲述了四位高智商但社交能力堪忧的科学家——Sheldon、Leonard、Howard、Raj，以及他们的邻居Penny之间的故事。从量子物理到漫画书，从星际迷航到外卖披萨，这部剧用笑声解构了天才与普通人之间的距离。12季279集，它是有史以来最成功的情景喜剧之一。',

    cast: [
      {
        name: 'Jim Parsons',
        nameCn: '吉姆·帕森斯',
        role: 'Sheldon Cooper',
        roleCn: '谢尔顿·库珀',
        avatar: '🧑‍🔬',
        image: 'assets/shows/big-bang-theory/cast-sheldon.jpg',
        imageColor: '4a7fb5',
        bio: '德克萨斯州休斯顿人，4座艾美奖、1座金球奖得主。Jim Parsons为Sheldon这个角色注入了灵魂——那种对规则的病态执着、对社交的彻底无感、以及隐藏在高智商外壳下的纯真善良。他在试镜时即兴表演了一段"Sheldon解释为什么要坐固定座位"直接拿下了这个角色。现实中他拥有戏剧硕士学位，2017年公开出柜，与男友Todd Spiewak于2017年结婚。',
        awards: ['艾美奖喜剧类最佳男主角 x4 (2010,2011,2013,2014)', '金球奖音乐/喜剧类最佳男主角 (2011)', '美国演员工会奖喜剧类最佳男演员 (2011)'],
        funFact: 'Jim Parsons在拍摄期间每天都要花45分钟整理Sheldon的标志性发型。',
        isMain: true
      },
      {
        name: 'Johnny Galecki',
        nameCn: '约翰尼·盖尔克奇',
        role: 'Leonard Hofstadter',
        roleCn: '莱纳德·霍夫斯塔德',
        avatar: '🤓',
        image: 'assets/shows/big-bang-theory/cast-leonard.jpg',
        imageColor: '5a8a6a',
        bio: '比利时裔美国人，8岁就开始演艺生涯。Leonard是剧中"最正常"的角色——一个戴着眼镜、暗恋邻居、忍受室友怪癖的实验物理学家。Galecki把这个"普通好人"演绎得温暖而真实。他与Kaley Cuoco在现实中秘密交往了两年（2007-2009），分手后依然在剧中饰演情侣，专业程度令人佩服。',
        awards: ['艾美奖喜剧类最佳男主角提名 (2011)'],
        funFact: 'Johnny Galecki身高只有1.70米，是主角团中最矮的。',
        isMain: true
      },
      {
        name: 'Kaley Cuoco',
        nameCn: '卡蕾·措科',
        role: 'Penny',
        roleCn: '佩妮',
        avatar: '👱‍♀️',
        image: 'assets/shows/big-bang-theory/cast-penny.jpg',
        imageColor: 'b57a4a',
        bio: '加州卡马里奥人，6岁开始拍广告，是剧组中最早成名的演员。Penny是从内布拉斯加州来洛杉矶追梦的女孩——没有大学学历，靠在Cheesecake Factory当服务员维生，却用她的社交智慧和人格魅力征服了整群天才。Cuoco在12季中见证了Penny从懵懂少女到自信女性的蜕变。她后来成为《哈雷·奎因》动画的执行制片人。',
        awards: ['人民选择奖最受欢迎喜剧类TV女演员 x2', '青少年选择奖最佳喜剧类TV女演员 x2'],
        funFact: 'Kaley Cuoco在第11季拍摄期间骑马摔断了腿，编剧不得不把Penny的戏份做了调整。',
        isMain: true
      },
      {
        name: 'Simon Helberg',
        nameCn: '西蒙·赫尔伯格',
        role: 'Howard Wolowitz',
        roleCn: '霍华德·沃洛维茨',
        avatar: '👨‍🚀',
        image: 'assets/shows/big-bang-theory/cast-howard.jpg',
        imageColor: '8a5a8a',
        bio: '洛杉矶人，毕业于纽约大学Tisch艺术学院。Howard是MIT工程师，后来成为真正的宇航员。他是四人组中最"接地气"的——花哨的铆钉腰带、紧身裤、妈妈地下室里的住所，以及不遗余力的搭讪技巧。Helberg把Howard从一个猥琐妈宝男演绎成了一个深情丈夫和宇航员，角色成长弧度是全剧最大的之一。',
        awards: ['美国演员工会奖喜剧类最佳团体表演提名 x3'],
        funFact: 'Simon Helberg钢琴弹得极好，剧中Howard弹琴的镜头都是他亲自演奏。',
        isMain: true
      },
      {
        name: 'Kunal Nayyar',
        nameCn: '库纳尔·纳亚尔',
        role: 'Rajesh Koothrappali',
        roleCn: '拉杰什·库斯拉帕里',
        avatar: '🪐',
        image: 'assets/shows/big-bang-theory/cast-raj.jpg',
        imageColor: 'a07840',
        bio: '印度新德里人，曾就读于波特兰大学戏剧专业。Raj是来自印度的天体物理学家，患有选择性缄默症——在女性面前完全无法说话（直到第6季才治愈）。他是四人组中最浪漫、最感性、也最孤独的人。Nayyar为这个角色注入了独特的印度式幽默和细腻的情感。他在2018年出版了自传《Yes, My Accent Is Real》。',
        awards: ['美国演员工会奖喜剧类最佳团体表演提名 x3'],
        funFact: 'Kunal Nayyar在现实中并不害羞，他和Raj的性格完全相反。',
        isMain: true
      },
      {
        name: 'Mayim Bialik',
        nameCn: '马伊姆·拜力克',
        role: 'Amy Farrah Fowler',
        roleCn: '艾米·法拉·福勒',
        avatar: '🧠',
        image: 'assets/shows/big-bang-theory/cast-amy.jpg',
        imageColor: '6a5a8a',
        bio: '加州圣迭戈人，现实中拥有加州大学洛杉矶分校神经科学博士学位。Amy从第3季末加入，是Sheldon通过交友网站匹配到的"完美对象"——一个同样高智商、低社交的神经科学家。Bialik在现实中真的是神经科学家，她把专业背景融入了角色。Amy从一个木讷的"女版Sheldon"逐渐成长为渴望友情和爱情的可爱女性。',
        awards: ['艾美奖喜剧类最佳女配角提名 x4 (2012,2013,2014,2015)'],
        funFact: 'Mayim Bialik在《生活大爆炸》之前最著名的角色是90年代情景喜剧《Blossom》的主角。',
        isMain: true
      }
    ],

    scenes: [
      {
        name: '4A 公寓',
        description: 'Sheldon和Leonard的公寓，全剧最核心的场景。走廊上的白板写满公式，沙发上永远有Sheldon的专属座位。公寓门口的走廊是无数经典敲门梗的发生地——"Knock knock knock, Penny"三连敲已成为美剧史上最经典的台词之一。',
        icon: '🏠',
        image: '',
        imageColor: 'd4c4a0',
        showVsReal: '公寓内部在华纳兄弟摄影棚搭建，走廊和电梯布景使用了真实的建筑结构。那个"坏了12年"的电梯是真电梯，只是被剧组故意停用。'
      },
      {
        name: '加州理工学院食堂',
        description: '四位男主角午餐时间的固定据点。在这个普通的大学食堂里，他们讨论弦理论、争论漫画书排名、吐槽彼此的感情生活。食堂的圆形餐桌是全剧第二重要的场景。',
        icon: '🍽️',
        image: '',
        imageColor: 'a0c4d4',
        showVsReal: '食堂场景在摄影棚拍摄，但外景使用了加州理工学院的真实校园。'
      },
      {
        name: 'Stuart的漫画店',
        description: 'Stuart Bloom经营的漫画书店，宅男们的天堂。从DC到漫威，从手办到Cosplay，这里是流行文化的圣殿。漫画店在第6季被大火烧毁，后来重建但变得更加破败。',
        icon: '📚',
        image: '',
        imageColor: 'c4a0d4',
        showVsReal: '漫画店的布景里摆满了真实的漫画书和手办，很多是剧组从收藏家那里借来的珍贵藏品。'
      },
      {
        name: 'Penny的公寓 (4B)',
        description: 'Penny的家，就在Sheldon和Leonard对面。从第一季Penny搬来的那天起，这扇门就成为了连接"天才世界"和"普通人世界"的桥梁。',
        icon: '🚪',
        image: '',
        imageColor: 'd4a0b0',
        showVsReal: '4A和4B公寓的门在摄影棚走廊的两侧，那个走廊是全剧使用最频繁的布景之一。'
      },
      {
        name: 'NASA / 国际空间站',
        description: 'Howard在NASA喷气推进实验室的工作场景，以及他在国际空间站的太空之旅。Howard从一个只会搭讪的工程师成长为真正的宇航员，是全剧最励志的角色弧线。',
        icon: '🚀',
        image: '',
        imageColor: '4a6a8a',
        showVsReal: 'Howard的太空场景使用了大量特效和绿幕，但NASA的标志和设备细节都经过了官方授权和审核。'
      },
      {
        name: 'Cheesecake Factory',
        description: 'Penny工作的餐厅，也是朋友们经常聚会的地方。Penny从第一季到第七季都在这里当服务员。Howard在这里认识了Bernadette——她当时也在Cheesecake Factory打工。',
        icon: '🍰',
        image: '',
        imageColor: 'd4b8a0',
        showVsReal: 'Cheesecake Factory是真实存在的连锁餐厅，剧中使用了真实的品牌授权。'
      }
    ],

    timeline: [
      {
        season: '第1季 (2007)',
        desc: 'Penny搬入4B公寓，Leonard一见钟情。Sheldon的室友协议首次登场，"That\'s my spot"成为经典。四位天才的日常生活被一个金发美女彻底打乱。',
        highlight: 'Penny第一次敲开4A的门'
      },
      {
        season: '第2季 (2008)',
        desc: 'Howard的火星探测器项目，Raj在酒精帮助下首次与Penny对话。Sheldon的双胞胎姐姐Missy登场。Leonard和Penny的暧昧关系开始升温。',
        highlight: 'Raj第一次和Penny说话'
      },
      {
        season: '第3季 (2009)',
        desc: 'Leonard和Penny正式开始约会，但很快分手。Sheldon首次在电梯里发脾气。Howard的母亲首次以声音形式出场。Amy Farrah Fowler在季末登场，Sheldon的人生从此改变。',
        highlight: 'Amy首次登场'
      },
      {
        season: '第4季 (2010)',
        desc: 'Amy和Bernadette正式加入主角团，女性力量崛起。Howard向Bernadette求婚。Sheldon和Amy开始"正式约会"。Penny和Raj的"一夜情"尴尬事件。',
        highlight: 'Howard求婚'
      },
      {
        season: '第5季 (2011)',
        desc: 'Sheldon和Amy的关系逐渐深入，Howard准备太空之旅。Leonard和Penny复合又分手。Raj开始能够和女性说话。Howard的太空之旅是本季高潮。',
        highlight: 'Howard登上太空'
      },
      {
        season: '第6季 (2012)',
        desc: 'Howard从太空归来，Bernadette怀孕。Stuart的漫画店被大火烧毁。Sheldon和Amy的"关系协议"签署。Raj的选择性缄默症被治愈。',
        highlight: 'Sheldon和Amy签署关系协议'
      },
      {
        season: '第7季 (2013)',
        desc: 'Sheldon和Amy的五年纪念，Penny向Leonard求婚（颠覆传统）。Howard和Bernadette迎来第一个孩子。这一季情感戏份加重，喜剧与温情并重。',
        highlight: 'Penny向Leonard求婚'
      },
      {
        season: '第8季 (2015)',
        desc: 'Sheldon和Amy分手又复合，Howard母亲去世（剧中处理得非常感人）。Stuart搬去和Howard、Bernadette同住。Leonard和Penny终于结婚。',
        highlight: 'Leonard和Penny婚礼'
      },
      {
        season: '第9季 (2015)',
        desc: 'Sheldon和Amy复合后关系更加稳固。Howard和Bernadette迎来第二个孩子。Raj开始和Emily约会。Penny的事业从演艺转向医药销售。',
        highlight: 'Sheldon和Amy复合'
      },
      {
        season: '第10季 (2016)',
        desc: 'Raj开始独立约会（不再需要酒精）。Howard和Bernadette的第二个孩子出生。Sheldon和Amy同居试住。Stuart终于找到了女朋友。',
        highlight: 'Sheldon和Amy同居'
      },
      {
        season: '第11季 (2017)',
        desc: 'Sheldon和Amy结婚，全剧最重要的婚礼。Howard的父亲终于出现。Raj和Anu的订婚又取消。Penny决定不要孩子。Sheldon从一个恐婚的宅男变成了一个深情的丈夫。',
        highlight: 'Sheldon和Amy婚礼'
      },
      {
        season: '第12季 (2018-2019)',
        desc: 'Sheldon和Amy获得诺贝尔物理学奖，电梯终于修好。Leonard和Penny怀孕。全剧在温馨感人的氛围中完美落幕。最后一集，所有人坐在4A公寓里吃外卖，像12年前一样。',
        highlight: 'Sheldon获诺贝尔奖 + 电梯修好'
      }
    ],

    trivia: [
      { text: 'Sheldon的专属座位是全剧最重要的道具之一。Jim Parsons在试镜时，即兴表演了一段"Sheldon解释为什么要坐固定座位"的戏，直接拿下了这个角色。', category: '选角' },
      { text: '电梯从第1季第1集就坏了（因为Leonard的火箭燃料爆炸），直到第12季最后一集才修好。整整12年，这个坏电梯是全剧最长的伏笔。', category: '剧情' },
      { text: '剧中的科学公式大多来自真实的物理学论文。UCLA物理学教授David Saltzberg担任全剧的科学顾问，确保白板上的公式100%正确。', category: '制作' },
      { text: 'Kaley Cuoco和Johnny Galecki在现实中曾秘密交往两年（2007-2009）。分手后他们在剧中依然饰演情侣，两人都表示分手是"友好的"。', category: '演员' },
      { text: 'Howard的妈妈（Carol Ann Susi配音）从未在镜头中露面，但她标志性的大嗓门是剧中经典元素。Carol Ann Susi于2014年去世，剧中Howard母亲也随之去世。', category: '演员' },
      { text: 'Sheldon的"Bazinga!"口头禅最初只出现在第2季第11集，后来成为标志性台词。这个词是编剧Bill Prady小时候在一家果酱店看到的广告语。', category: '编剧' },
      { text: 'Raj的选择性缄默症在第6季被治愈。编剧表示这是因为Raj需要作为一个角色成长，不能永远靠酒精才能和女性说话。', category: '剧情' },
      { text: '剧中所有主角在第12季的片酬都达到了每集100万美元。Jim Parsons、Johnny Galecki和Kaley Cuoco是好莱坞收入最高的电视演员之一。', category: '制作' },
      { text: 'Stephen Hawking本人客串了多集。他是Sheldon最崇拜的科学家。Hawking在片场对Jim Parsons说："你的Sheldon演得太自大了。"', category: '客串' },
      { text: 'Penny的姓氏从未在剧中被提及，这是编剧刻意保持的悬念。直到最后一季，Penny的姓氏仍然是个谜。', category: '编剧' },
      { text: 'Sheldon在剧中最喜欢的数字是73。编剧Chuck Lorre解释说，73是第21个质数，而21 = 7 × 3，镜像也是73。这个数学彩蛋让数学爱好者疯狂。', category: '彩蛋' },
      { text: '《星际迷航》演员Wil Wheaton在剧中饰演他自己——一个Sheldon又爱又恨的"死对头"。现实中Wil Wheaton是《生活大爆炸》的超级粉丝。', category: '客串' },
      { text: 'Howard的标志性铆钉腰带和花哨领结是服装设计师Mary T. Quigley的作品。她说Howard的穿搭灵感来自"80年代的意大利移民"。', category: '制作' },
      { text: '第12季最后一集的拍摄让所有演员都哭了。Jim Parsons在拍摄最后一天的告别演讲时，现场所有人都起立鼓掌。', category: '制作' },
      { text: '剧中四位男主角的星座都是按照演员的真实星座设定的：Sheldon是水瓶座、Leonard是天蝎座、Howard是处女座、Raj是天秤座。', category: '彩蛋' }
    ],

    fashion: [
      {
        name: 'Sheldon的超级英雄T恤',
        desc: 'Flash、Green Lantern、Batman……Sheldon的衣柜里有超过50件不同的超级英雄T恤。这些T恤不仅是他的日常穿搭，更是他身份认同的一部分。剧组服装设计师透露，每件T恤都是根据剧本内容精心挑选的。',
        icon: '⚡',
        image: '',
        imageColor: 'd44040'
      },
      {
        name: 'Howard的铆钉腰带和紧身裤',
        desc: 'Howard的穿搭风格是整部剧最独特的存在——铆钉腰带、花哨领结、紧身裤、太空主题夹克。这种"80年代迪斯科风"是他对母亲控制的反抗，也是他宇航员身份的另类表达。',
        icon: '💎',
        image: '',
        imageColor: '4080d4'
      },
      {
        name: 'Raj的开衫毛衣和围巾',
        desc: 'Raj的穿搭体现了他的印度背景和内敛性格——优雅的开衫毛衣、考究的围巾、偶尔的印度传统服饰。他是四人组中最注重外表的，也是唯一会在约会前花两小时选衣服的人。',
        icon: '🧶',
        image: '',
        imageColor: '8a6040'
      },
      {
        name: 'Penny的从服务员到职场精英',
        desc: 'Penny的穿搭是全剧最直观的角色成长标志。从第1季的Cheesecake Factory制服和热裤，到第7季的职业套装和高跟鞋，Penny的衣橱见证了她从追梦女孩到职场女性的蜕变。',
        icon: '👗',
        image: '',
        imageColor: 'd47090'
      }
    ],

    locations: [
      { name: '加州理工学院 (Caltech)', desc: '剧中四位男主角的工作地点，位于加利福尼亚州帕萨迪纳市。现实中Caltech是世界顶级的理工科大学，培养了38位诺贝尔奖得主。', icon: '🏫', image: '' },
      { name: '帕萨迪纳市 (Pasadena)', desc: '全剧主要发生地，位于洛杉矶东北部。帕萨迪纳以其老城区、玫瑰花车游行和加州理工学院闻名。', icon: '🏙️', image: '' },
      { name: 'Comic-Con国际动漫展', desc: '宅男们每年必去的圣地，剧中多次出现他们参加漫展的情节。现实中Comic-Con在圣迭戈举办，每年吸引超过13万参与者。', icon: '🎪', image: '' },
      { name: 'NASA喷气推进实验室 (JPL)', desc: 'Howard在NASA的工作地点，位于帕萨迪纳市。JPL是NASA的主要研究中心，负责无人太空探测任务。', icon: '🛰️', image: '' },
      { name: 'Cheesecake Factory', desc: 'Penny工作的餐厅，现实中是美国连锁餐厅。剧中使用的Cheesecake Factory位于帕萨迪纳老城区，是真实的餐厅。', icon: '🍰', image: '' },
      { name: 'Stuart的漫画书店', desc: '以加州真实的漫画书店为原型。剧中漫画店的货架上摆满了真实的DC和漫威漫画。很多漫画书是剧组从收藏家那里借来的珍贵藏品。', icon: '📚', image: '' }
    ]
  }
};

function getShowData(showId) {
  return SHOWS_DATA[showId] || null;
}

function getAvailableShows() {
  return Object.keys(SHOWS_DATA);
}
