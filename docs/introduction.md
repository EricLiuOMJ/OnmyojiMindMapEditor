# 如何使用

## 1. VitePress 部分

本项目使用 [VitePress](https://vitepress.dev/) 作为文档站点生成器。主要功能包括：

- **快速启动**：

  ```bash
  pnpm install
  pnpm run docs:dev
  ```

- **构建发布**：

  ```bash
  pnpm run docs:build
  ```

- **配置参考** ：
  - 站点配置： .vitepress/config.mts
  - 主题配置： .vitepress/theme/index.ts

## 2. 组件使用指南

### 2.1 可用组件

| 组件名称          | 用途         |
| ----------------- | ------------ |
| ShikigamiDisplay  | 单个式神展示 |
| ShikigamiGroup    | 式神组合展示 |
| ShikigamiGroupRow | 式神组合行   |
| ShikigamiSelector | 式神选择器   |

### 2.2 使用方法

#### 2.2.1 ShikigamiDisplay 组件

::: code-group

```js [基本用法]
<ShikigamiDisplay
  shikigami=""       // 必填，式神名称
  order=1            // 显示序号
  description=''     // 技能描述（如'155'）
  :yuhun="[]"        // 御魂配置数组
  target=""          // 目标属性（速度/攻击等）
  :positions="{
    second: '',      // 二号位主属性
    fourth: '',      // 四号位主属性
    sixth: ''        // 六号位主属性
  }"
  :parameters="{
    speed: '',       // 速度要求
    strike: '',      // 暴击要求
    attack: '',      // 攻击要求
    defense: '',     // 防御要求
    hit: '',         // 命中要求
    resist: ''       // 抵抗要求
  }"
  infoText=""        // 额外说明文本
/>
```

```js [使用实例]
<ShikigamiDisplay
  shikigami="大夜摩天阎魔"
  order=1
  description='151'
  :yuhun="['散件', '火灵']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '效果命中',
    sixth: '生命加成'
  }"
  :parameters="{ speed: '155+' }"
  infoText="速度必须达标，否则替换为普通阎魔"
/>
```

:::

<ShikigamiDisplay
  shikigami="大夜摩天阎魔"
  order=1
  description='151'
  :yuhun="['散件', '火灵']"
  target="速度"
  :positions="{
    second: '速度',
    fourth: '效果命中',
    sixth: '生命加成'
  }"
  :parameters="{ speed: '155+' }"
  infoText="速度必须达标，否则替换为普通阎魔"
/>

#### 2.2.2 ShikigamiGroupRow 组件

::: code-group

```js [完整属性说明]
<ShikigamiGroupRow
  :args1="[
    '核心式神',
    ['可选式神1', '可选式神2'],
    ['A', 'B'],
    ['C', 'D'],
    '任意',
  ]"
  :args2="[
    '应对方案1',
    ['可选方案1', '可选方案2'],
    ['F', 'G'],
    ['H', 'I'],
    'J',
  ]"
  oname1="源赖光"
  oname2="源赖光"
/>
```

```js [简化用法]
<ShikigamiGroupRow
  :args1="'核心式神 | 可选式神1,可选式神2 | A,B  | C,D | 任意'"
  :args2="'应对方案1 | 可选方案1,可选方案2 | F,G | H,I | J'"
  oname1="源赖光"
  oname2="源赖光"
/>
```

```js [实际示例]
<ShikigamiGroupRow
  :args1="'晨晖惠比寿|晨晖惠比寿|云外镜,大夜摩天阎魔,阎魔|神酿星熊童子,龙珏,须佐之男|任意'"
  :args2="'鬼金羊|不知火|纺愿缘结神|麓铭大岳丸,遥念烟烟罗,祸津神|坂田银时,阎魔,神酿星熊童子,荒川之主,猫川'"
  oname1="源赖光"
  oname2="源博雅"
/>
```

:::
<ShikigamiGroupRow
  :args1="'晨晖惠比寿|晨晖惠比寿|云外镜,大夜摩天阎魔,阎魔|神酿星熊童子,龙珏,须佐之男|任意'"
  :args2="'鬼金羊|不知火|纺愿缘结神|麓铭大岳丸,遥念烟烟罗,祸津神|坂田银时,阎魔,神酿星熊童子,荒川之主,猫川'"
  oname1="源赖光"
  oname2="源博雅"
/>

## 3. 数据文件说明

- 式神数据： public/data/Shikigami.json
- 御魂数据： public/data/Yuhun.json
- 图片资源： public/pics/ 目录下

## 4. 开发建议

1. 添加新组件时需在 .vitepress/theme/index.ts 中注册
2. 修改样式可编辑 .vitepress/theme/custom.css
3. 新增文档请在 docs 目录创建 .md 文件

## 5. 示例参考

完整示例请参考：

- [思维导图](/docs/mindmap)
- [配置表](/docs/config)
