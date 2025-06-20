import DefaultTheme from "vitepress/theme";
import ShikigamiSelector from "../../components/ShikigamiSelector.vue";
import ShikigamiGroup from "../../components/ShikigamiGroup.vue";
import ShikigamiGroupRow from "../../components/ShikigamiGroupRow.vue";
import ShikigamiDisplay from "../../components/ShikigamiDisplay.vue";
import YuhunSchemeDisplay from "../../components/YuhunSchemeDisplay.vue";
import "./custom.css";

import backtotop from "./backtotop.vue";
import { createPinia } from "pinia";
import { h } from "vue";

export default {
  extends: DefaultTheme,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  enhanceApp({ app }) {
    app.component("ShikigamiSelector", ShikigamiSelector);
    app.component("ShikigamiGroup", ShikigamiGroup);
    app.component("ShikigamiGroupRow", ShikigamiGroupRow);
    app.component("ShikigamiDisplay", ShikigamiDisplay);
    app.component("YuhunSchemeDisplay", YuhunSchemeDisplay);
    app.use(createPinia());
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-footer-before": () => h(backtotop), // 使用doc-footer-before插槽
    });
  },
};
