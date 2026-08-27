# JOTC 设定集

基于 **VitePress** 的小说世界观设定集可视化项目。舞台是一个**多元宇宙**：所有内容按界域（general / anima / mundus / caelum / finis）组织，**每个界域拥有独立的角色、势力、地点、物品、事件页面**，支持交叉引用、全文搜索与跨宇宙事件时间线，**仅需本地运行**。

## 快速开始

```bash
# 1. 安装依赖（首次）
npm install

# 2. 启动本地预览
npm run docs:dev
```

浏览器打开 **http://localhost:5173** 即可。修改任何 Markdown 或数据文件，页面会**热更新**，无需重启。

| 命令 | 作用 |
| --- | --- |
| `npm run docs:dev` | 本地开发预览（热更新） |
| `npm run docs:build` | 构建静态站点 |
| `npm run docs:preview` | 预览构建产物 |

## 目录结构与页面层级

```
JOTC_archive/
├─ docs/
│  ├─ index.md                 # 首页
│  ├─ timeline/                # 时间线（按界域分层，各界域时间独立）
│  │  ├─ index.md              # 时间线总览：界域入口卡片
│  │  └─ general/ anima/ mundus/ caelum/ finis/   # 各界域时间线页
│  ├─ characters.data.ts ...   # 各分类数据加载器（读 Frontmatter 自动分组）
│  ├─ glossary.data.ts         # 术语数据加载器
│  ├─ entry-utils.ts           # 词条转换共享工具（universe 分组逻辑）
│  ├─ characters/  factions/  locations/  items/  events/
│  │  ├─ index.md              # ★ 分类总览页：各界域入口卡片（UniversePortal）
│  │  ├─ general/
│  │  │  ├─ index.md           # ★ 多元宇宙 · 本分类列表页（EntryGrid）
│  │  │  └─ xxx.md             #    具体词条
│  │  ├─ anima/                # Anima —— 灵魂之界（同样含 index.md）
│  │  ├─ mundus/               # Mundus —— 尘世（故事主舞台）
│  │  ├─ caelum/               # Caelum —— 天穹之界
│  │  └─ finis/                # Finis —— 终末之界
│  ├─ glossary/                # 术语表（与上述分类同构）
│  │  ├─ index.md              # 术语总览：各界域入口卡片
│  │  └─ general/ anima/ mundus/ caelum/ finis/   # 各界域术语页 + 术语词条
│  └─ .vitepress/
│     ├─ config.mts            # 站点配置（标题/导航/侧边栏/搜索）
│     └─ theme/
│        ├─ index.ts           # 主题入口（注册组件）
│        ├─ style.css          # 全局样式
│        └─ components/
│           ├─ TimelineView.vue        # 时间线组件（界域徽章）
│           ├─ EntryGrid.vue           # 单界域卡片网格（界域列表页用）
│           └─ UniversePortal.vue      # 界域入口卡片（分类总览页用）
└─ src-data/
   ├─ universes.json            # 界域元数据（id/名称/颜色/描述）
   └─ timeline.json             # 时间线数据（跨宇宙事件列表）
```

页面层级：**分类总览（/characters/）→ 界域列表（/characters/mundus/）→ 具体词条（/characters/mundus/erin-starwhisper）**；术语表同理（/glossary/ → /glossary/mundus/ → /glossary/mundus/starlight）；时间线同理（/timeline/ → /timeline/mundus/）。

## 如何新增内容

### 新增一个词条

在对应分类的**界域子目录**下新建 `.md` 文件（例如角色放到 `characters/mundus/`），参考已有词条：

```markdown
---
universe: mundus            # ★ 所属界域：general / anima / mundus / caelum / finis
title: 角色名
name: 角色名                # 卡片显示名
role: 身份
faction: 所属势力
status: 定稿                # 定稿 / 草稿（草稿会显示标记）
tags:
  - 标签1
---

## 概述
……正文，提及他人时加链接，例如 [艾琳·星语](/characters/mundus/erin-starwhisper)
```

要点：

- `universe` 字段决定词条归属，**必须填写**；
- 新增后，**界域列表页（如 `/characters/mundus/`）自动更新**，分类总览页的界域入口条数也随之变化；
- 在 `docs/.vitepress/config.mts` 的对应 sidebar 里补一条链接（导航更顺手）。

### 新增时间线事件

编辑 `src-data/timeline.json`——顶层按界域组织（`universes.<界域>.events`），**各界域时间线相互独立，不使用统一纪年**（由于设定原因，跨界域时间无法对应）。

| 字段 | 说明 |
| --- | --- |
| `seq` | 本界域内的排序序号（越小越早） |
| `date` | 时间标注（使用本界域自己的纪年，如 Mundus 的「星历」；无法确认的写「时间不可考」） |
| `type` | 事件类型（决定颜色，可在 `TimelineView.vue` 的 `TYPE_COLORS` 中扩展） |
| `universe` | 所属界域（显示界域徽章） |
| `title` / `summary` | 标题与摘要 |
| `characters` / `locations` | 关联角色、地点名 |
| `link` | 跳转到事件词条的路径（可选） |

### 新增 / 调整界域

编辑 `src-data/universes.json`（id、名称、颜色、描述），各界域列表页、总览入口页、时间线徽章会随之调整。新增界域时，还需要在 `docs/<分类>/<id>/` 下创建该界域的 `index.md` 列表页，并在 `config.mts` 的 sidebar 中补上分组。

### 更换站点标题

编辑 `docs/.vitepress/config.mts` 顶部的 `siteTitle` / `siteDescription`，以及 `docs/index.md` 的 hero 部分。

## 说明

- 当前所有词条均为**示例内容**（多元宇宙框架示例），请用自己的小说素材替换；
- 本项目仅用于本地浏览，无需（也不建议）部署公网；
- 想扩展功能（如势力关系图、地图标注），在 `theme/components/` 新增组件并在 `theme/index.ts` 注册即可。
