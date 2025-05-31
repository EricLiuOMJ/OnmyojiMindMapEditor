import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Onmyoji Mindmap Editor",
  description: "用Markdown的方式去制作阴阳师斗技思维导图",
  base: '/OnmyojiMindMapEditor/',
  outDir: 'BuildDocs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '说明文件', link: '/docs/introduction' },
      { text: '示例',
        items: [
          { text: '思维导图', link: '/docs/mindmap' },
          { text: '配置文档', link: '/docs/config' }
        ]
       }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/EricLiuOMJ/OnmyojiMindMapEditor' }
    ],
    outline:{
      level: [2,4],
      label: "大纲"
    }
  },
})
