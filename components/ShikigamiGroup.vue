<template>
  <div class="shikigami-group-container" :class="`theme-${theme}`">
    <div class="group-header">
      <div class="group-title">{{ title }}</div>
    </div>

    <div class="slots-container">
      <template v-for="(slot, index) in slots" :key="index">
        <!-- 单个式神 -->
        <div
          v-if="
            !Array.isArray(slot) &&
            typeof slot === 'object' &&
            !hasBranches(slot)
          "
          class="single-slot"
        >
          <img
            :src="
              slot.avatar || '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
            "
            :alt="slot.name || '未选择式神'"
            class="avatar"
          />
          <span class="name">{{ slot.name || "" }}</span>
        </div>

        <!-- 数组（竖直排列） -->
        <div v-else-if="Array.isArray(slot)" class="array-slot">
          <div
            v-for="(subSlot, subIndex) in slot"
            :key="subIndex"
            class="sub-slot"
          >
            <img
              :src="
                findShikigami(subSlot).avatar ||
                '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
              "
              :alt="findShikigami(subSlot).name || '未选择式神'"
              class="avatar"
            />
            <span class="name">{{ findShikigami(subSlot).name || "" }}</span>
          </div>
        </div>

        <!-- 条件分支（竖直排列分支，内部数组竖直排列） -->
        <div v-else class="condition-container">
          <div
            v-for="(content, key) in slot"
            :key="key"
            class="condition-group"
          >
            <!-- 分支内容是数组 -->
            <div v-if="Array.isArray(content)" class="array-slot">
              <div
                v-for="(item, itemIndex) in content"
                :key="itemIndex"
                class="sub-slot"
              >
                <img
                  :src="
                    findShikigami(item).avatar ||
                    '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                  "
                  :alt="findShikigami(item).name || '未选择式神'"
                  class="avatar"
                />
                <span class="name">{{ findShikigami(item).name || "" }}</span>
              </div>
            </div>
            <!-- 分支内容是嵌套的condition -->
            <div
              v-else-if="
                typeof content === 'object' && content !== null && !content.name
              "
              class="nested-condition-container"
            >
              <div
                v-for="(nestedContent, nestedKey) in content"
                :key="nestedKey"
                class="condition-group"
              >
                <!-- 嵌套分支内容是数组 -->
                <div v-if="Array.isArray(nestedContent)" class="array-slot">
                  <div
                    v-for="(item, itemIndex) in nestedContent"
                    :key="itemIndex"
                    class="sub-slot"
                  >
                    <img
                      :src="
                        findShikigami(item).avatar ||
                        '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                      "
                      :alt="findShikigami(item).name || '未选择式神'"
                      class="avatar"
                    />
                    <span class="name">{{
                      findShikigami(item).name || ""
                    }}</span>
                  </div>
                </div>
                <!-- 嵌套分支内容是单个式神 -->
                <div v-else class="sub-slot">
                  <img
                    :src="
                      findShikigami(nestedContent).avatar ||
                      '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                    "
                    :alt="findShikigami(nestedContent).name || '未选择式神'"
                    class="avatar"
                  />
                  <span class="name">{{
                    findShikigami(nestedContent).name || ""
                  }}</span>
                </div>
              </div>
            </div>
            <!-- 分支内容是单个式神 -->
            <div v-else class="sub-slot">
              <img
                :src="
                  findShikigami(content).avatar ||
                  '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                "
                :alt="findShikigami(content).name || '未选择式神'"
                class="avatar"
              />
              <span class="name">{{ findShikigami(content).name || "" }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

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
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

/* 主题A - 浅色系 */
.shikigami-group-container.theme-A {
  --theme-bg: #f0f4f8;
  --theme-border: #e2e8f0;
  --theme-text: #2d3748;
  --array-bg: rgba(226, 232, 240, 0.5);
  --array-border: rgba(203, 213, 224, 0.8);
  --condition-bg: rgba(226, 232, 240, 0.3);
  --condition-border: rgba(203, 213, 224, 0.5);
  background: var(--theme-bg);
  border-color: var(--theme-border);
  color: var(--theme-text);
}

/* 主题B - 深色系 */
.shikigami-group-container.theme-B {
  --theme-bg: #2d3748;
  --theme-border: #4a5568;
  --theme-text: #e2e8f0;
  --array-bg: rgba(74, 85, 104, 0.4);
  --array-border: rgba(113, 128, 150, 0.6);
  --condition-bg: rgba(74, 85, 104, 0.2);
  --condition-border: rgba(113, 128, 150, 0.4);
  background: var(--theme-bg);
  border-color: var(--theme-border);
  color: var(--theme-text);
}

/* 暗色模式覆盖 */
:root.dark .shikigami-group-container.theme-A {
  --theme-bg: #1a202c;
  --theme-border: #2d3748;
  --theme-text: #e2e8f0;
  --array-bg: rgba(45, 55, 72, 0.4);
  --array-border: rgba(74, 85, 104, 0.6);
  --condition-bg: rgba(45, 55, 72, 0.2);
  --condition-border: rgba(74, 85, 104, 0.4);
}

:root.dark .shikigami-group-container.theme-B {
  --theme-bg: #171923;
  --theme-border: #2d3748;
  --theme-text: #e2e8f0;
  --array-bg: rgba(45, 55, 72, 0.5);
  --array-border: rgba(74, 85, 104, 0.7);
  --condition-bg: rgba(45, 55, 72, 0.3);
  --condition-border: rgba(74, 85, 104, 0.5);
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

/* 条件组 - 为每个条件添加边框 */
.condition-group {
  border: 1px solid var(--condition-border);
  border-radius: 8px;
  padding: 10px;
  background-color: var(--condition-bg);
  width: 100%;
}

/* 条件容器 - 竖直排列所有条件 */
.condition-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center; /* 添加此属性实现内部元素垂直居中 */
}

/* 嵌套条件容器 - 竖直排列 */
.nested-condition-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  justify-content: center; /* 添加此属性实现内部元素垂直居中 */
}

/* 条件组 - 为每个条件添加边框 */
.condition-group {
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  padding: 10px;
  background-color: rgba(128, 128, 128, 0.05);
  width: 100%;
}

/* 子槽位样式 */
.sub-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

/* 单个式神槽位 */
.single-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.avatar {
  width: 72px;
  height: 72px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 3px solid;
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: inherit;
}

/* 嵌套分支容器 */
.nested-branch-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

/* 分支组样式加强 */
.branch-group {
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  padding: 10px;
  background-color: rgba(128, 128, 128, 0.05);
}

/* 分支内容布局 */
.branch-content {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

@media (max-width: 600px) {
  .name {
    display: none;
  }
  .shikigami-group-container {
    padding: 8px;
  }
  .slots-container {
    gap: 2px;
  }
  .array-slot {
    gap: 2px;
    padding: 1px;
  }
}
</style>

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
});

// 检查对象是否包含分支结构
function hasBranches(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).length > 0 &&
    !obj.name &&
    !obj.avatar
  );
}

// 优化findShikigami函数
function findShikigami(item) {
  // 如果已经是一个有效的式神对象，直接返回
  if (typeof item === "object" && item !== null && item.name && item.avatar) {
    return item;
  }

  // 获取式神名称
  const name = typeof item === "string" ? item : "";
  if (!name)
    return {
      name: "",
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
    };

  // 在式神列表中查找
  const found = shikigamiList.value.find((s) => s.name === name);
  return (
    found || {
      name,
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
    }
  );
}

// 修改processBranchContent函数
function processBranchContent(content) {
  if (Array.isArray(content)) {
    return content.map((item) => findShikigami(item));
  } else if (typeof content === "object" && content !== null) {
    // 如果是嵌套的分支对象，递归处理
    const processedBranch = {};
    for (const [key, value] of Object.entries(content)) {
      processedBranch[key] = processBranchContent(value);
    }
    return processedBranch;
  } else {
    // 处理单个式神字符串
    return findShikigami(content);
  }
}

// 新增：解析简化格式的字符串输入
function parseSimplifiedFormat(input) {
  if (!input || typeof input !== "string") return [];

  // 按|分割顶层元素
  return input
    .split("|")
    .map((item) => {
      item = item.trim();
      if (!item) return null;

      // 处理条件分支（以@开头）
      if (item.startsWith("@")) {
        const conditions = item.split(" ");
        const result = {};

        conditions.forEach((cond) => {
          if (!cond.startsWith("@")) return;
          cond = cond.slice(1); // 移除@

          // 处理嵌套条件（包含>）
          if (cond.includes(">")) {
            const parts = cond.split(">");
            let current = result;

            for (let i = 0; i < parts.length; i++) {
              const [key, value] = parts[i].split("=");

              if (i === parts.length - 1) {
                // 最后一层，设置实际值
                current[key] = value
                  ? value.includes(",")
                    ? value.split(",").map((v) => v.trim())
                    : value.trim()
                  : {};
              } else {
                // 中间层级
                current[key] = current[key] || {};
                current = current[key];
              }
            }
          } else {
            // 处理普通条件
            const [key, value] = cond.split("=");
            result[key] = value
              ? value.includes(",")
                ? value.split(",").map((v) => v.trim())
                : value.trim()
              : {};
          }
        });

        return result;
      }

      // 处理数组（包含逗号）
      if (item.includes(",")) {
        return item.split(",").map((s) => s.trim());
      }

      // 处理单个式神
      return item.trim();
    })
    .filter(Boolean); // 移除空值
}

const slots = computed(() => {
  // 如果是字符串，优先使用新的解析方式
  if (typeof props.args === "string") {
    try {
      const parsedSimple = parseSimplifiedFormat(props.args);
      if (parsedSimple.length > 0) {
        return parsedSimple.map((item) => {
          if (Array.isArray(item)) {
            return item.map((name) => findShikigami(name));
          } else if (typeof item === "object" && item !== null) {
            return processBranchContent(item);
          }
          return findShikigami(item);
        });
      }
    } catch (e) {
      console.error("解析简化格式失败:", e);
      return [
        {
          name: "",
          avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
        },
      ];
    }
  }

  // 如果是数组直接使用
  if (Array.isArray(props.args)) {
    return props.args.map((item) => {
      if (Array.isArray(item)) {
        return item.map((name) => findShikigami(name));
      } else if (typeof item === "object" && item !== null) {
        return processBranchContent(item);
      }
      return findShikigami(item);
    });
  }

  // 如果都失败了，返回默认值
  return [
    { name: "", avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png" },
  ];
});

const showSelector = ref(false);
const currentSlotIndex = ref(0);
const currentSubSlotIndex = ref(null);
const currentSlot = ref({ name: "", avatar: "" });

function addSingleSlot() {
  slots.value.push({ name: "", avatar: "" });
}

function addArraySlot() {
  slots.value.push([{ name: "", avatar: "" }]);
}

function addSubSlot(index) {
  slots.value[index].push({ name: "", avatar: "" });
}

function removeSlot(index) {
  slots.value.splice(index, 1);
}

function openSelector(index, subIndex = null) {
  currentSlotIndex.value = index;
  currentSubSlotIndex.value = subIndex;
  currentSlot.value =
    subIndex !== null
      ? slots.value[index][subIndex] || { name: "", avatar: "" }
      : slots.value[index] || { name: "", avatar: "" };
  showSelector.value = true;
}

function handleSelect(shikigami) {
  if (currentSubSlotIndex.value !== null) {
    slots.value[currentSlotIndex.value][currentSubSlotIndex.value] = shikigami;
  } else {
    slots.value[currentSlotIndex.value] = shikigami;
  }
  showSelector.value = false;
}
</script>

<script>
import { ref, computed } from "vue";
import shikigamiList from "../public/data/Shikigami.json";

// const shikigamiList = ref([]);

// 优化findShikigami函数
function findShikigami(item) {
  // 如果已经是一个有效的式神对象，直接返回
  if (typeof item === "object" && item !== null && item.name && item.avatar) {
    return item;
  }

  // 获取式神名称
  const name = typeof item === "string" ? item : "";
  if (!name)
    return {
      name: "",
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
    };

  // 在式神列表中查找
  const found = shikigamiList.value.find((s) => s.name === name);
  return (
    found || {
      name,
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
    }
  );
}
</script>
