import DefaultTheme from 'vitepress/theme'
import ShikigamiSelector from '../../components/ShikigamiSelector.vue'
import ShikigamiGroup from '../../components/ShikigamiGroup.vue'
import ShikigamiGroupRow from '../../components/ShikigamiGroupRow.vue'
import ShikigamiDisplay from '../../components/ShikigamiDisplay.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('-')
      }
    }
  },
  enhanceApp({ app }) {
    app.component('ShikigamiSelector', ShikigamiSelector)
    app.component('ShikigamiGroup', ShikigamiGroup)
    app.component('ShikigamiGroupRow', ShikigamiGroupRow)
    app.component('ShikigamiDisplay', ShikigamiDisplay)
  }
}