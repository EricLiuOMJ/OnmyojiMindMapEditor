import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Onmyoji Mindmap Editor",
  description: "用Markdown的方式去制作阴阳师斗技思维导图",
  base: '/',
  outDir: 'BuildDocs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/docs/introduction' },
      { text: 'Example',
        items: [
          { text: 'Mindmap', link: '/docs/mindmap' },
          { text: 'Config', link: '/docs/config' }
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
