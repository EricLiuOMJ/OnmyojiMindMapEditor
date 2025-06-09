<template>
  <div class="shikigami-group-container" :class="`theme-${theme}`">
    <div class="group-header">
      <div class="group-title">{{ title }}</div>
    </div>

    <div class="slots-container">
      <template v-for="(slotGroup, index) in slots" :key="index">
        <!-- 数组（竖直排列）或单个式神 -->
        <div
          :class="
            Array.isArray(slotGroup) && slotGroup.length > 1
              ? 'array-slot'
              : 'single-slot'
          "
        >
          <div
            v-for="(subSlot, subIndex) in slotGroup"
            :key="subIndex"
            :class="
              Array.isArray(slotGroup) && slotGroup.length > 1
                ? 'sub-slot'
                : 'single-slot'
            "
          >
            <div v-if="!!subSlot.computeTarget" class="parameter-target">
              {{ subSlot.computeTarget || "伤害输出" }}
            </div>
            <img
              :src="
                subSlot.avatar ||
                '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
              "
              :alt="subSlot.name || '未选择式神'"
              class="avatar"
            />
            <div class="shikigami-info">
              <i class="pintext">{{ subSlot.pintext }}</i>
              <span class="name">{{ subSlot.name || "" }}</span>
            </div>
            <!-- 新增的参数div -->
            <div v-if="subSlot.yuhun || subSlot.skill" class="parameter">
              <div v-if="subSlot.yuhun" class="parameter-item">
                <div class="parameter-tag">御魂</div>
                <div class="parameter-info">{{ subSlot.yuhun }}</div>
              </div>
              <div v-if="subSlot.skill" class="parameter-item">
                <div class="parameter-tag">技能</div>
                <div class="parameter-info">{{ subSlot.skill }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom-left-module">
          <div class="onmyoji-tag">阴阳师</div>
          <span class="onmyoji-name">{{ oname }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 移动shikigamiList到setup中
const shikigamiList = ref([]);

// 加载式神数据
async function loadShikigamiData() {
  try {
    // 使用 import 方式加载数据，Vite 会处理路径
    const data = await import("../public/data/Shikigami.json");
    shikigamiList.value = data.default;
  } catch (error) {
    console.error("加载式神数据失败:", error);
  }
}

// 立即加载式神数据
loadShikigamiData();

const props = defineProps({
  args: {
    type: [Array, String],
    default: () => [],
  },
  title: {
    type: String,
    required: true,
    default: "式神组",
  },
  theme: {
    type: String,
    required: true,
    default: "A",
    validator: (value) => ["A", "B"].includes(value),
  },
  oname: {
    type: String,
    default: "源赖光",
  },
});

// 优化findShikigami函数，现在它只负责查找式神信息，不处理括号内容
function findShikigamiInfo(name) {
  if (!name || typeof name !== "string") {
    return null;
  }
  const found = shikigamiList.value.find((s) => s.name === name);
  return found || null;
}

// 修改 parseSimplifiedFormat 函数，使其返回一个扁平的式神对象数组
function parseSimplifiedFormat(input) {
  if (typeof input === "string") {
    // 将字符串按 | 分割为一级数组，再按 , 分割为二级数组，并扁平化处理
    const parts = input.split("|").flatMap((part) =>
      part
        .trim()
        .split(",")
        .map((subPart) => subPart.trim())
    );
    // 解析每个子项并返回扁平数组
    return parts.map((item) => parseSingleItem(item));
  } else if (Array.isArray(input)) {
    // 如果输入是数组，则递归处理每个元素并扁平化结果
    return input.flatMap((item) => {
      if (typeof item === "string") {
        return parseSingleItem(item);
      } else if (Array.isArray(item)) {
        // 递归处理嵌套数组并扁平化
        return parseSimplifiedFormat(item);
      } else {
        // 如果是其他类型，直接返回
        return item;
      }
    });
  } else {
    // 如果输入不是字符串或数组，则直接返回一个包含该项的数组
    return [input];
  }
}
function parseSingleItem(item) {
  if (!item) return null;

  // 提取各部分内容
  const patterns = [
    { regex: /{([^}]+)}/, key: "computeTarget" },
    { regex: /（([^）]+)）/, key: "pintext" },
    { regex: /<([^>]+)>/, key: "yuhun" },
    {
      regex: /([^/]+)\/(\d+)/,
      key: "skill",
      transform: (v) => parseInt(v, 10),
    },
  ];

  const result = { name: item };

  patterns.forEach(({ regex, key, transform }) => {
    const match = item.match(regex);
    if (match) {
      result[key] = transform
        ? transform(match[2] || match[1])
        : match[1].trim();
      result.name = result.name.replace(match[0], "").trim();
    }
  });

  // 清理名称中的特殊字符
  result.name = result.name.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, "").trim();

  return result;
}

const slots = computed(() => {
  try {
    let groupedArgs = [];

    if (typeof props.args === "string") {
      // 对于字符串输入，按 | 分割并按 , 分割，形成二维数组
      groupedArgs = props.args.split("|").map((part) =>
        part
          .trim()
          .split(",")
          .map((subPart) => subPart.trim())
      );
    } else if (Array.isArray(props.args)) {
      // 对于数组输入，直接使用原始数组结构作为分组基础
      groupedArgs = props.args.map((item) =>
        Array.isArray(item) ? item : [item]
      );
    } else {
      // 对于其他类型，包装在二维数组中
      groupedArgs = [[props.args]];
    }

    // 遍历分组后的二维数组，解析每个式神项并查找信息
    return groupedArgs.map((slotGroup) => {
      // 确保 slotGroup 是一个数组
      const currentSlotGroup = Array.isArray(slotGroup)
        ? slotGroup
        : [slotGroup];

      return currentSlotGroup.map((item) => {
        // 使用 parseSingleItem 解析单个项
        const parsedItem = parseSingleItem(item);
        // 查找式神信息
        const shikigamiInfo = findShikigamiInfo(parsedItem.name);
        // 构建最终的式神对象
        const displayName = shikigamiInfo
          ? shikigamiInfo.name
          : parsedItem.name;

        return {
          ...shikigamiInfo,
          name: displayName,
          pintext: parsedItem.pintext,
          skill: parsedItem.skill,
          yuhun: parsedItem.yuhun,
          computeTarget: parsedItem.computeTarget,
        };
      });
    });
  } catch (e) {
    console.error("解析失败:", e);
    return [
      [
        {
          name: "",
          avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
        },
      ],
    ];
  }
});
</script>

<style scoped>
/* 基础样式 */
.shikigami-group-container {
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--theme-bg);
  border-color: var(--theme-border);
  color: var(--theme-text);
}

/* 主题A - 浅色系 */
.shikigami-group-container.theme-A {
  --theme-bg: #f0f4f8;
  --theme-border: #e2e8f0;
  --theme-text: #2d3748;
  --theme-text-slight: rgba(59, 55, 55, 0.733);
  --array-bg: rgba(226, 232, 240, 0.5);
  --array-border: rgba(203, 213, 224, 0.8);
  --condition-bg: rgba(226, 232, 240, 0.3);
  --condition-border: rgba(203, 213, 224, 0.5);
  --parameter-bg: rgba(156, 159, 163, 0.3);
  --parameter-border: rgba(203, 213, 224, 0.5);
}

/* 主题B - 深色系 */
.shikigami-group-container.theme-B {
  --theme-bg: #2d3748;
  --theme-border: #4a5568;
  --theme-text: #e2e8f0;
  --theme-text-slight: rgba(203, 213, 224, 0.7);
  --array-bg: rgba(74, 85, 104, 0.4);
  --array-border: rgba(113, 128, 150, 0.6);
  --condition-bg: rgba(74, 85, 104, 0.2);
  --condition-border: rgba(113, 128, 150, 0.4);
  --parameter-bg: rgba(156, 159, 163, 0.3);
  --parameter-border: rgba(203, 213, 224, 0.5);
}

.parameter {
  margin-top: 4px;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  justify-items: center;
  border: 2px dotted var(--parameter-border); /* 边框颜色，使用主题色 */
  background-color: var(--parameter-bg); /* 背景色，使用主题色 */
  color: var(--theme-text); /* 文字颜色，确保在主题色背景下可见 */
}

/* 暗色模式覆盖 */
:root.dark .shikigami-group-container.theme-A {
  --theme-bg: #1a202c;
  --theme-border: #2d3748;
  --theme-text: #e2e8f0;
  --theme-text-slight: rgba(203, 213, 224, 0.7);
  --array-bg: rgba(45, 55, 72, 0.4);
  --array-border: rgba(74, 85, 104, 0.6);
  --condition-bg: rgba(45, 55, 72, 0.2);
  --condition-border: rgba(74, 85, 104, 0.4);
  --parameter-bg: rgba(156, 159, 163, 0.3);
  --parameter-border: rgba(203, 213, 224, 0.5);
}

:root.dark .shikigami-group-container.theme-B {
  --theme-bg: #171923;
  --theme-border: #2d3748;
  --theme-text: #e2e8f0;
  --theme-text-slight: rgba(203, 213, 224, 0.7);
  --array-bg: rgba(45, 55, 72, 0.5);
  --array-border: rgba(74, 85, 104, 0.7);
  --condition-bg: rgba(45, 55, 72, 0.3);
  --condition-border: rgba(74, 85, 104, 0.5);
  --parameter-bg: rgba(156, 159, 163, 0.3);
  --parameter-border: rgba(203, 213, 224, 0.5);
}

.group-header {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  margin-bottom: 0;
}

.group-title {
  font-size: 18px;
  color: inherit;
  padding-bottom: 8px;
  border-bottom: 2px solid;
  margin-bottom: 0;
  white-space: nowrap;
}

.bottom-left-module {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background-color: var(--theme-bg);
}

.onmyoji-tag {
  font-size: 16px;
  font-size: 400;
  color: var(--theme-text-slight);
}

.onmyoji-name {
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
  font-family: "Source Han Serif SC", serif;
  color: var(--theme-text);
}

/* 槽位容器 - 水平排列所有主要元素 */
.slots-container {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  justify-content: center;
  padding-top: 48px; /* 为固定的标题留出空间 */
  width: 100%;
}

/* 数组槽位 - 竖直排列 */
.array-slot {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px dashed var(--array-border);
  border-radius: 8px;
  background-color: var(--array-bg);
  justify-content: center;
}

/* 子槽位样式 */
.sub-slot,
.single-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.single-slot {
  align-content: center;
}

.avatar {
  width: 72px;
  min-width: 72px;
  height: 72px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 3px solid;
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.shikigami-info,
.parameter-item {
  display: flex;
  flex-direction: row;
  gap: 2px;
}

.parameter-target {
  margin-bottom: 6px;
  font-size: 18px;
  font-weight: 700;
  font-family: "Source Han Serif SC", serif;
  color: var(--theme-text-slight);
}

.pintext {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  color: var(--theme-text-slight);
}

.name {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: var(--theme-text);
}

.parameter-tag {
  font-size: 12px;
  color: var(--theme-text);
  font-weight: 700;
  margin-top: 2px;
}

.parameter-info {
  font-size: 12px;
  color: var(--theme-text-slight);
  font-weight: 400;
  margin-top: 2px;
}

@media (max-width: 600px) {
  .shikigami-group-container {
    padding: 8px;
  }
  .slots-container,
  .array-slot {
    gap: 2px;
  }
  .array-slot {
    padding: 1px;
  }
  .name {
    display: none;
  }
}
</style>
