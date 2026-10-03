import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// 站点元信息 —— 改成你的小说名
const siteTitle = 'JOTC 设定集'
const siteDescription = '小说世界观 · 设定集可视化档案库'

export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  description: siteDescription,
  cleanUrls: true,

  // 允许存在指向已删除/尚未创建词条的链接（本地创作整理过程中常见），避免构建被死链中断
  ignoreDeadLinks: true,

  // 内联 SVG favicon（多元宇宙星球图标，无需外部资源）
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `data:image/svg+xml,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b6cf0"/><stop offset="1" stop-color="#5a3bbf"/></linearGradient></defs><circle cx="32" cy="32" r="28" fill="url(#g)"/><circle cx="23" cy="23" r="3.2" fill="#fff" opacity="0.85"/><circle cx="42" cy="19" r="2" fill="#fff" opacity="0.6"/><circle cx="39" cy="38" r="2.6" fill="#fff" opacity="0.7"/><circle cx="19" cy="40" r="1.6" fill="#fff" opacity="0.5"/><ellipse cx="32" cy="54" rx="19" ry="6" fill="#141220" opacity="0.3"/></svg>',
        )}`,
      },
    ],
  ],

  // 让 VitePress 可以直接 import 项目根目录 src-data/ 下的数据文件（时间线、界域等）
  vite: {
    resolve: {
      alias: {
        '@data': fileURLToPath(new URL('../../src-data', import.meta.url)),
      },
    },
  },

  themeConfig: {
    logo: '📖',
    siteTitle,

    nav: [
      { text: '首页', link: '/' },
      { text: '角色', link: '/characters/' },
      { text: '势力', link: '/factions/' },
      { text: '地点', link: '/locations/' },
      { text: '物品', link: '/items/' },
      { text: '事件', link: '/events/' },
      { text: '时间线', link: '/timeline/' },
      { text: '术语表', link: '/glossary/' },
    ],

    sidebar: {
      '/characters/': [
        {
          text: '角色',
          items: [
            { text: '角色总览', link: '/characters/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/characters/general/' },
                { text: '织序者', link: '/characters/general/chronicler' },
                { text: '至纯之光', link: '/characters/general/pure-light' },
                { text: '熵寂之声', link: '/characters/general/entropy-sound' },
                { text: '无界之融', link: '/characters/general/boundless-merge' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/characters/anima/' },
                { text: '苏琳', link: '/characters/anima/sulin' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/characters/mundus/' },
                { text: '艾琳·星语', link: '/characters/mundus/erin-starwhisper' },
                { text: '凯尔·铁炉', link: '/characters/mundus/kyle-ironforge' },
                { text: '零', link: '/characters/mundus/zero' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/characters/caelum/' },
                { text: '曦光·艾莉雅', link: '/characters/caelum/elia' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/characters/finis/' },
                { text: '末', link: '/characters/finis/the-end' },
              ],
            },
          ],
        },
      ],
      '/factions/': [
        {
          text: '势力',
          items: [
            { text: '势力总览', link: '/factions/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/factions/general/' },
                { text: '界域议会', link: '/factions/general/council-of-realms' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/factions/anima/' },
                { text: '安息圣所', link: '/factions/anima/sanctuary-of-rest' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/factions/mundus/' },
                { text: '银辉王国', link: '/factions/mundus/silverlight-kingdom' },
                { text: '星语教团', link: '/factions/mundus/starwhisper-order' },
                { text: '灰烬之手', link: '/factions/mundus/ashen-hand' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/factions/caelum/' },
                { text: '天穹圣廷', link: '/factions/caelum/celestial-court' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/factions/finis/' },
                { text: '归墟教团', link: '/factions/finis/ruin-cult' },
              ],
            },
          ],
        },
      ],
      '/locations/': [
        {
          text: '地点',
          items: [
            { text: '地点总览', link: '/locations/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/locations/general/' },
                { text: '界海', link: '/locations/general/the-sea-between' },
                { text: '始源之树', link: '/locations/general/origin-tree' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/locations/anima/' },
                { text: '魂河', link: '/locations/anima/river-of-souls' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/locations/mundus/' },
                { text: '银辉城', link: '/locations/mundus/silverlight-city' },
                { text: '铁炉堡', link: '/locations/mundus/ironforge-hold' },
                { text: '灰烬荒原', link: '/locations/mundus/ashen-wastes' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/locations/caelum/' },
                { text: '云端圣殿', link: '/locations/caelum/celestial-temple' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/locations/finis/' },
                { text: '终末废墟', link: '/locations/finis/ruins-of-finis' },
              ],
            },
          ],
        },
      ],
      '/items/': [
        {
          text: '物品',
          items: [
            { text: '物品总览', link: '/items/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/items/general/' },
                { text: '世界之书', link: '/items/general/book-of-worlds' },
                { text: '圣物', link: '/items/general/holy-relics' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/items/anima/' },
                { text: '魂灯', link: '/items/anima/soul-lantern' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/items/mundus/' },
                { text: '寻星之镜', link: '/items/mundus/starseeker-mirror' },
                { text: '陨星之刃', link: '/items/mundus/meteor-blade' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/items/caelum/' },
                { text: '日冕之冠', link: '/items/caelum/solar-crown' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/items/finis/' },
                { text: '灭世残页', link: '/items/finis/final-page' },
              ],
            },
          ],
        },
      ],
      '/events/': [
        {
          text: '事件',
          items: [
            { text: '事件总览', link: '/events/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/events/general/' },
                { text: '万界之裂', link: '/events/general/sundering' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/events/anima/' },
                { text: '魂河决溢', link: '/events/anima/river-surge' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/events/mundus/' },
                { text: '星陨之夜', link: '/events/mundus/starfall-night' },
                { text: '铁炉堡事变', link: '/events/mundus/ironforge-incident' },
                { text: '灰烬之战', link: '/events/mundus/ashen-war' },
                { text: '王都之变', link: '/events/mundus/kingdom-coup' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/events/caelum/' },
                { text: '神陨之日', link: '/events/caelum/day-of-godsfall' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/events/finis/' },
                { text: '归墟之门', link: '/events/finis/ruin-gate' },
              ],
            },
          ],
        },
      ],
      '/timeline/': [
        {
          text: '时间线',
          items: [
            { text: '时间线总览', link: '/timeline/' },
            { text: '多元宇宙', items: [{ text: '一览', link: '/timeline/general/' }] },
            { text: 'Anima', items: [{ text: '一览', link: '/timeline/anima/' }] },
            { text: 'Mundus', items: [{ text: '一览', link: '/timeline/mundus/' }] },
            { text: 'Caelum', items: [{ text: '一览', link: '/timeline/caelum/' }] },
            { text: 'Finis', items: [{ text: '一览', link: '/timeline/finis/' }] },
          ],
        },
      ],
      '/glossary/': [
        {
          text: '术语',
          items: [
            { text: '术语总览', link: '/glossary/' },
            {
              text: '多元宇宙',
              items: [
                { text: '一览', link: '/glossary/general/' },
                { text: '宏宇宙 Metalogsis', link: '/glossary/general/metalogsis' },
                { text: '侵蚀力量', link: '/glossary/general/erosion-forces' },
                { text: '造物主', link: '/glossary/general/creator' },
                { text: '六大基本要素', link: '/glossary/general/six-elements' },
                { text: '存在之海', link: '/glossary/general/sea-of-existence' },
                { text: '苍穹（Firma）', link: '/glossary/general/firmament' },
                { text: '世界', link: '/glossary/general/world' },
                { text: '界域', link: '/glossary/general/realm' },
                { text: '界海', link: '/glossary/general/sea-between' },
                { text: '万界之裂', link: '/glossary/general/sundering' },
                { text: '界域议会', link: '/glossary/general/council' },
              ],
            },
            {
              text: 'Anima',
              items: [
                { text: '一览', link: '/glossary/anima/' },
                { text: '梦牧', link: '/glossary/anima/dream-herder' },
                { text: '转生', link: '/glossary/anima/rebirth' },
              ],
            },
            {
              text: 'Mundus',
              items: [
                { text: '一览', link: '/glossary/mundus/' },
                { text: '星辉', link: '/glossary/mundus/starlight' },
                { text: '星语者', link: '/glossary/mundus/starwhisperer' },
                { text: '铁炉工匠会', link: '/glossary/mundus/ironforge-guild' },
                { text: '灰烬教义', link: '/glossary/mundus/ashen-doctrine' },
                { text: '星历', link: '/glossary/mundus/starcalendar' },
                { text: '陨星之刃', link: '/glossary/mundus/meteor-blade' },
                { text: '寻星之镜', link: '/glossary/mundus/starseeker-mirror' },
              ],
            },
            {
              text: 'Caelum',
              items: [
                { text: '一览', link: '/glossary/caelum/' },
                { text: '曦光', link: '/glossary/caelum/dawnlight' },
                { text: '辉光之井', link: '/glossary/caelum/well-of-light' },
              ],
            },
            {
              text: 'Finis',
              items: [
                { text: '一览', link: '/glossary/finis/' },
                { text: '归墟', link: '/glossary/finis/ruination' },
                { text: '终末钟声', link: '/glossary/finis/bell-of-the-end' },
              ],
            },
          ],
        },
      ],
    },

    // 本地全文搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索设定', buttonAriaLabel: '搜索设定' },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },

    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    footer: {
      message: '基于 VitePress 构建 · 仅本地运行',
      copyright: 'JOTC 设定集 — 小说创作档案',
    },
  },
})
