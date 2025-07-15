import { defineConfig } from "vitepress";
import vitepressProtectPlugin from "vitepress-protect-plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Onmyoji Mindmap Editor",
  description: "用Markdown的方式去制作阴阳师斗技思维导图",
  base: "/OnmyojiMindMapEditor/",
  outDir: "BuildDocs",
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: false,
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "说明文件", link: "/docs/introduction" },
      {
        text: "示例",
        items: [
          {
            text: "V0715",
            items: [
              { text: "思维导图", link: "/docs/mindmap0715" },
              { text: "配置文档", link: "/docs/config0715" },
            ],
          },
          {
            text: "V0625",
            items: [
              { text: "思维导图", link: "/docs/mindmap" },
              { text: "配置文档(高配)", link: "/docs/config" },
              { text: "配置文档(低配)", link: "/docs/config2" },
            ],
          },
        ],
      },
      { text: "御魂弃置方案", link: "/docs/scheme" },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/EricLiuOMJ/OnmyojiMindMapEditor",
      },
    ],
    outline: {
      level: [2, 4],
      label: "大纲",
    },
  },
  vite: {
    plugins: [
      vitepressProtectPlugin({
        disableF12: true, // 禁用F12开发者模式
        disableCopy: true, // 禁用文本复制
        disableSelect: true, // 禁用文本选择
      }),
    ],
  },
});
