# TV Encyclopedia — Design Spec

> 一个精美的纯前端电视剧/动画百科项目，以商丘市区地图为探索版图，从《生活大爆炸》开始。

## 1. 项目定位

- **类型**: 个人收藏/兴趣项目
- **优先级**: 视觉效果 > 性能 > 可扩展性
- **技术栈**: 纯前端（HTML + CSS + JS），无后端依赖
- **数据存储**: localStorage 持久化用户数据（添加的剧集、探索进度）

## 2. 视觉设计语言

### 2.1 整体风格：杂志编排

- 高端杂志的排版质感
- 大量留白，信息层次靠排版和字重区分
- 卡片式内容组织，每个板块独立且完整

### 2.2 配色方案：水晶玻璃

| 角色 | 色值 | 用途 |
|------|------|------|
| 背景 | `linear-gradient(160deg, #f7f7f9, #ededf0)` | 微灰渐变底色 |
| 文字主色 | `#1d1d1f` | 标题、正文 |
| 文字辅色 | `#86868b` | 标签、描述 |
| 文字弱色 | `#aaa` | 辅助信息 |
| 玻璃卡片 | `rgba(255,255,255,0.25)` + `backdrop-filter: blur(60px) saturate(1.3)` | 内容承载 |
| 玻璃边框 | `border: 1px solid rgba(255,255,255,0.45)` + `border-top-color: rgba(255,255,255,0.7)` | 光线折射感 |
| 玻璃高光 | `inset 0 1px 0 rgba(255,255,255,0.8)` | 内阴影高光 |
| 竖线深 | `#1d1d1f` | 当前板块指示 |
| 竖线浅 | `#d4d4d2` | 非活跃板块 |

### 2.3 玻璃卡片规范

```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%);
  backdrop-filter: blur(60px) saturate(1.3);
  -webkit-backdrop-filter: blur(60px) saturate(1.3);
  border: 1px solid rgba(255,255,255,0.45);
  border-top-color: rgba(255,255,255,0.7);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02), 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8);
}
```

### 2.4 背景装饰

- 柔光光斑：`radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)`，随机散布
- 为玻璃卡片提供折射的「光源」感

## 3. 页面结构

### 3.1 首页 — 3D 卡片轮盘

- 中间卡片突出（scale 1.05 + 边框高亮），两侧卡片带透视旋转（rotateY ±8deg, scale 0.9, opacity 0.6）
- 左右切换时 3D 旋转动画，电影镜头感（600-800ms，缩放 + 模糊渐清）
- 每张卡片展示：剧集中文名、英文名、年份、圆形 Logo
- 轮盘下方：小圆点进度指示器

### 3.2 地图探索页 — 商丘市区地图

- 以河南省商丘市市区地图为底图
- 地图划分为若干区域（对应行政区划或自定义分区）
- 未探索区域：灰色/模糊，显示「？」
- 已探索区域：点亮，显示该剧集的 Logo/缩略图
- 点击已探索区域 → 进入该剧集详情页
- 探索动画：区域从暗到亮，伴随光晕扩散效果
- 地图支持缩放和拖拽

### 3.3 剧集详情页 — 侧边导航 + 全屏分段

**布局：**
- 左侧：段落式竖线导航（2px 宽，当前板块加长加粗 + 标签文字变深色）
- 右侧：全屏分段内容区，每段占满视口高度
- 滚动时整段切换，侧边栏同步高亮

**板块列表：**
1. **主演介绍** — Hero 卡片（大头像+名字+角色+简介+奖项）+ 配角条（底部一排小卡）
2. **经典场景** — 场景图片 + 描述 + 剧中地点 vs 现实地点对比
3. **剧情概览** — 按季/关键节点时间线展示
4. **开发内幕** — 幕后故事、选角趣闻、编剧灵感
5. **冷知识** — 卡片式罗列，每条一个知识点
6. **经典服饰** — 角色标志性穿搭，图片 + 描述
7. **地理位置** — 剧中涉及的真实地点在地图上标注

### 3.4 全局导航

- 顶部：极简导航栏（毛玻璃背景），左侧 Logo/标题，右侧搜索 + FAB 添加按钮
- FAB 按钮：右下角固定圆形「+」，点击弹出添加面板

## 4. 动画系统

### 4.1 动画风格：电影镜头感

- 所有过渡动画：缩放 + 模糊渐清，像镜头对焦
- 时长：600-800ms
- 缓动：`cubic-bezier(0.16, 1, 0.3, 1)`（ease-out-expo）

### 4.2 关键动画

| 场景 | 动画描述 |
|------|----------|
| 首页 → 详情页 | 卡片从小到大缩放铺满全屏，背景模糊→清晰 |
| 板块切换 | 当前板块向上滑出，新板块从下方滑入 + 淡入 |
| 侧边栏高亮 | 竖线长度变化 + 标签颜色渐变 |
| 地图探索 | 区域从灰暗到点亮，光晕从中心扩散 |
| 卡片展开 | Hero 卡片从缩略状态扩展到全尺寸，内容渐入 |
| 聚光灯切换 | 当前主角卡片放大 + 周围卡片缩小淡化 |

### 4.3 微交互

- 卡片 hover：微抬升（translateY -2px）+ 阴影加深
- 按钮 hover：背景色微变 + 光泽流动
- 滚动：视差效果（背景层与内容层不同速度）

## 5. 数据结构

### 5.1 剧集数据

```javascript
{
  id: "big-bang-theory",
  title: "生活大爆炸",
  titleEn: "The Big Bang Theory",
  year: "2007-2019",
  seasons: 12,
  episodes: 279,
  logo: "🎭", // 或图片路径
  mapRegion: "liangyuan", // 对应商丘地图区域
  cast: [
    {
      name: "Jim Parsons",
      role: "Sheldon Cooper",
      avatar: "", // 图片路径
      bio: "4座艾美奖得主...",
      awards: ["艾美奖 x4", "金球奖 x1"],
      isMain: true
    }
    // ...
  ],
  scenes: [
    {
      name: "4A 公寓",
      description: "Sheldon 和 Leonard 的公寓...",
      showImage: "",
      realImage: "",
      location: "..."
    }
  ],
  timeline: [...],
  trivia: [...],
  fashion: [...],
  locations: [...]
}
```

### 5.2 用户数据（localStorage）

```javascript
{
  exploredRegions: ["liangyuan", "suiyang"],
  shows: ["big-bang-theory"],
  currentShow: "big-bang-theory",
  mapZoom: 1,
  mapCenter: { x: 0.5, y: 0.5 }
}
```

## 6. 添加新剧集流程

1. 用户点击 FAB「+」按钮
2. 弹出毛玻璃模态框，包含：
   - 搜索框（搜索已有模板或从零创建）
   - 剧集名称输入
   - 选择地图区域（商丘地图上选择一个未探索区域）
3. 确认后：
   - 新剧集卡片加入轮盘
   - 地图上对应区域点亮，播放探索动画
   - 跳转到该剧集的空详情页，引导用户填充内容

## 7. 首批数据：生活大爆炸

首批填充的完整数据：
- 6 位主演完整档案（Jim Parsons, Johnny Galecki, Kaley Cuoco, Simon Helberg, Kunal Nayyar, Mayim Bialik）
- 5+ 经典场景（4A 公寓、大学食堂、漫画店、Penny 公寓、太空等）
- 12 季剧情概览
- 10+ 冷知识
- 标志性服饰（Sheldon 的 Flash T恤、Howard 的铆钉腰带等）
- 剧中涉及的真实地理位置

## 8. 技术方案

### 8.1 项目结构

```
zyc百科/
├── index.html          # 入口
├── css/
│   ├── variables.css   # CSS 变量（颜色、字体、间距）
│   ├── glass.css       # 玻璃卡片样式
│   ├── animations.css  # 动画定义
│   ├── layout.css      # 布局系统
│   └── pages/
│       ├── home.css    # 首页
│       ├── map.css     # 地图页
│       └── detail.css  # 详情页
├── js/
│   ├── app.js          # 主入口、路由
│   ├── data/
│   │   └── big-bang.js # 生活大爆炸数据
│   ├── components/
│   │   ├── carousel.js # 3D 轮盘
│   │   ├── map.js      # 地图交互
│   │   ├── sidebar.js  # 侧边导航
│   │   └── modal.js    # 模态框
│   ├── animations.js   # 动画控制
│   └── storage.js      # localStorage 封装
├── assets/
│   ├── map/            # 商丘地图素材
│   └── shows/          # 剧集图片资源
└── docs/
    └── superpowers/
        └── specs/
            └── *.md    # 设计文档
```

### 8.2 关键技术选型

- **路由**: 基于 hash 的简单路由（#/home, #/map, #/show/:id）
- **动画**: CSS Transitions + Web Animations API
- **地图**: SVG 商丘地图 + JS 交互层
- **3D 轮盘**: CSS 3D transforms（perspective, rotateY, scale）
- **玻璃效果**: backdrop-filter（需注意兼容性）
- **数据持久化**: localStorage
- **构建**: 无构建工具，原生 HTML/CSS/JS

### 8.3 浏览器兼容

- 主要目标：Chrome/Edge 最新版
- backdrop-filter 需要 `-webkit-` 前缀
- 降级方案：不支持 backdrop-filter 时使用半透明背景色
