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
          <!-- 新增的参数div -->
          <div v-if="slot.parameter" class="parameter">
            {{ slot.parameter }}
          </div>
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
                subSlot.avatar ||
                '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
              "
              :alt="subSlot.name || '未选择式神'"
              class="avatar"
            />
            <span class="name">{{ subSlot.name || "" }}</span>
            <!-- 新增的参数div -->
            <div v-if="subSlot.parameter" class="parameter">
              {{ subSlot.parameter }}
            </div>
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
                    item.avatar ||
                    '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                  "
                  :alt="item.name || '未选择式神'"
                  class="avatar"
                />
                <span class="name">{{ item.name || "" }}</span>
                <!-- 新增的参数div -->
                <div v-if="item.parameter" class="parameter">
                  {{ item.parameter }}
                </div>
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
                        item.avatar ||
                        '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                      "
                      :alt="item.name || '未选择式神'"
                      class="avatar"
                    />
                    <span class="name">{{ item.name || "" }}</span>
                    <!-- 新增的参数div -->
                    <div v-if="item.parameter" class="parameter">
                      {{ item.parameter }}
                    </div>
                  </div>
                </div>
                <!-- 嵌套分支内容是单个式神 -->
                <div v-else class="sub-slot">
                  <img
                    :src="
                      nestedContent.avatar ||
                      '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                    "
                    :alt="nestedContent.name || '未选择式神'"
                    class="avatar"
                  />
                  <span class="name">{{ nestedContent.name || "" }}</span>
                  <!-- 新增的参数div -->
                  <div v-if="nestedContent.parameter" class="parameter">
                    {{ nestedContent.parameter }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 分支内容是单个式神 -->
            <div v-else class="sub-slot">
              <img
                :src="
                  content.avatar ||
                  '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                "
                :alt="content.name || '未选择式神'"
                class="avatar"
              />
              <span class="name">{{ content.name || "" }}</span>
              <!-- 新增的参数div -->
              <div v-if="content.parameter" class="parameter">
                {{ content.parameter }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 新增的左下角模块 -->
    <div class="bottom-left-module">
      <div>阴阳师</div>
      <i class="onmyoji-name">{{ oname }}</i>
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

.bottom-left-module {
  position: absolute;
  bottom: 16px;
  left: 16px;
  color: var(--vp-c-text-2); /* 可以根据主题调整颜色 */
}

.onmyoji-name {
  font-size: 18px;
  font-weight: 900;
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
  margin-top: 2px;
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

/* 新增的参数样式 */
.parameter {
  font-size: 12px; /* 调整字体大小 */
  color: var(--vp-c-text-3); /* 使用一个较浅的文本颜色 */
  margin-top: 2px;
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
  /* 在小屏幕下也隐藏参数 */
  .parameter {
    display: none;
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
  oname: {
    type: String,
    default: "源赖光",
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

// 优化findShikigami函数，现在它只负责查找式神信息，不处理括号内容
function findShikigamiInfo(name) {
  if (!name || typeof name !== "string") {
    return null;
  }
  const found = shikigamiList.value.find((s) => s.name === name);
  return found || null;
}

// 修改 parseSimplifiedFormat 函数来解析 () 和 / / 内容
function parseSimplifiedFormat(input) {
  if (!input || typeof input !== "string") return [];

  // 按|分割顶层元素
  return input
    .split("|")
    .map((item) => {
      item = item.trim();
      if (!item) return null;

      let mainContent = item;
      let bracketContent = ""; // () 中的内容
      let parameterContent = ""; // / / 中的内容

      // 提取 / / 中的内容
      // 匹配 /任意非/字符/，并确保是独立的参数，而不是路径的一部分
      const parameterMatch = mainContent.match(/\/([^/]+)\/$/); // 匹配末尾的 /.../
      if (parameterMatch) {
        parameterContent = parameterMatch[1].trim();
        mainContent = mainContent.replace(parameterMatch[0], "").trim();
      }

      // 提取 () 中的内容
      const bracketMatch = mainContent.match(/（([^）]+)）/);
      if (bracketMatch) {
        bracketContent = bracketMatch[1].trim();
        mainContent = mainContent.replace(bracketMatch[0], "").trim();
      }

      // 处理条件分支（以@开头）
      if (mainContent.startsWith("@")) {
        const conditions = mainContent.split(" ");
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

        // 对于条件分支，参数和括号内容可能需要特殊处理，这里简化处理，不将它们附加到每个子项
        // 如果需要，可以修改这里的逻辑，将 parameterContent 和 bracketContent 传递下去
        return result;
      }

      // 处理数组（包含逗号）
      if (mainContent.includes(",")) {
        return mainContent.split(",").map((s) => ({
          name: s.trim(),
          bracket: bracketContent,
          parameter: parameterContent,
        }));
      }

      // 处理单个式神
      return {
        name: mainContent.trim(),
        bracket: bracketContent,
        parameter: parameterContent,
      };
    })
    .filter(Boolean); // 移除空值
}

// 修改 processBranchContent 函数以处理新的数据结构
function processBranchContent(content) {
  if (Array.isArray(content)) {
    return content.map((item) => {
      const shikigamiInfo = findShikigamiInfo(item.name); // 使用新的查找函数
      const displayName = shikigamiInfo ? shikigamiInfo.name : item.name; // 使用查找结果的名称或原始名称
      const finalName = item.bracket
        ? `${item.bracket} ${displayName}`
        : displayName; // 组合括号内容和名称
      return {
        ...shikigamiInfo, // 包含头像等信息
        name: finalName, // 使用组合后的显示名称
        parameter: item.parameter, // 传递参数内容
      };
    });
  } else if (typeof content === "object" && content !== null) {
    // 如果是嵌套的分支对象，递归处理
    const processedBranch = {};
    for (const [key, value] of Object.entries(content)) {
      processedBranch[key] = processBranchContent(value);
    }
    return processedBranch;
  } else {
    // 处理单个式神对象（来自 parseSimplifiedFormat）
    const shikigamiInfo = findShikigamiInfo(content.name); // 使用新的查找函数
    const displayName = shikigamiInfo ? shikigamiInfo.name : content.name; // 使用查找结果的名称或原始名称
    const finalName = content.bracket
      ? `${content.bracket} ${displayName}`
      : displayName; // 组合括号内容和名称
    return {
      ...shikigamiInfo, // 包含头像等信息
      name: finalName, // 使用组合后的显示名称
      parameter: content.parameter, // 传递参数内容
    };
  }
}

const slots = computed(() => {
  // 如果是字符串，优先使用新的解析方式
  if (typeof props.args === "string") {
    try {
      const parsedSimple = parseSimplifiedFormat(props.args);
      if (parsedSimple.length > 0) {
        return parsedSimple.map((item) => {
          if (Array.isArray(item)) {
            return item.map((data) => {
              // item 现在是 { name, bracket, parameter }
              const shikigamiInfo = findShikigamiInfo(data.name);
              const displayName = shikigamiInfo
                ? shikigamiInfo.name
                : data.name;
              const finalName = data.bracket
                ? `${data.bracket} ${displayName}`
                : displayName;
              return {
                ...shikigamiInfo,
                name: finalName,
                parameter: data.parameter,
              };
            });
          } else if (typeof item === "object" && item !== null && !item.name) {
            // 条件分支对象
            // 对于条件分支，parseSimplifiedFormat 返回的是处理后的结构，直接传递给 processBranchContent
            return processBranchContent(item);
          } else {
            // 单个式神对象 { name, bracket, parameter }
            const shikigamiInfo = findShikigamiInfo(item.name);
            const displayName = shikigamiInfo ? shikigamiInfo.name : item.name;
            const finalName = item.bracket
              ? `${item.bracket} ${displayName}`
              : displayName;
            return {
              ...shikigamiInfo,
              name: finalName,
              parameter: item.parameter,
            };
          }
        });
      }
    } catch (e) {
      console.error("解析简化格式失败:", e);
      return [
        {
          name: "",
          avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
          parameter: "",
        },
      ];
    }
  }

  // 如果是数组直接使用 (假设数组中的项已经是 { name, avatar, parameter } 格式或字符串)
  if (Array.isArray(props.args)) {
    return props.args.map((item) => {
      if (Array.isArray(item)) {
        return item.map((subItem) => {
          // 假设 subItem 可能是字符串或对象
          if (typeof subItem === "string") {
            // 如果是字符串，尝试解析 () 和 / /，并查找式神信息
            let mainContent = subItem.trim();
            let bracketContent = "";
            let parameterContent = "";

            const parameterMatch = mainContent.match(/\/([^/]+)\/$/);
            if (parameterMatch) {
              parameterContent = parameterMatch[1].trim();
              mainContent = mainContent.replace(parameterMatch[0], "").trim();
            }

            const bracketMatch = mainContent.match(/（([^）]+)）/);
            if (bracketMatch) {
              bracketContent = bracketMatch[1].trim();
              mainContent = mainContent.replace(bracketMatch[0], "").trim();
            }

            const shikigamiInfo = findShikigamiInfo(mainContent);
            const displayName = shikigamiInfo
              ? shikigamiInfo.name
              : mainContent;
            const finalName = bracketContent
              ? `${bracketContent} ${displayName}`
              : displayName;

            return {
              ...shikigamiInfo,
              name: finalName,
              parameter: parameterContent,
            };
          } else if (typeof subItem === "object" && subItem !== null) {
            // 如果已经是对象，确保包含 name, avatar, parameter 字段
            return {
              name: subItem.name || "",
              avatar:
                subItem.avatar ||
                "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
              parameter: subItem.parameter || "",
            };
          }
          return {
            name: "",
            avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
            parameter: "",
          };
        });
      } else if (typeof item === "object" && item !== null && !item.name) {
        // 条件分支对象
        return processBranchContent(item);
      } else {
        // 单个式神对象或字符串
        if (typeof item === "string") {
          // 如果是字符串，尝试解析 () 和 / /，并查找式神信息
          let mainContent = item.trim();
          let bracketContent = "";
          let parameterContent = "";

          const parameterMatch = mainContent.match(/\/([^/]+)\/$/);
          if (parameterMatch) {
            parameterContent = parameterMatch[1].trim();
            mainContent = mainContent.replace(parameterMatch[0], "").trim();
          }

          const bracketMatch = mainContent.match(/（([^）]+)）/);
          if (bracketMatch) {
            bracketContent = bracketMatch[1].trim();
            mainContent = mainContent.replace(bracketMatch[0], "").trim();
          }

          const shikigamiInfo = findShikigamiInfo(mainContent);
          const displayName = shikigamiInfo ? shikigamiInfo.name : mainContent;
          const finalName = bracketContent
            ? `${bracketContent} ${displayName}`
            : displayName;

          return {
            ...shikigamiInfo,
            name: finalName,
            parameter: parameterContent,
          };
        } else if (typeof item === "object" && item !== null) {
          // 如果已经是对象，确保包含 name, avatar, parameter 字段
          return {
            name: item.name || "",
            avatar:
              item.avatar || "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
            parameter: item.parameter || "",
          };
        }
        return {
          name: "",
          avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
          parameter: "",
        };
      }
    });
  }

  // 如果都失败了，返回默认值
  return [
    {
      name: "",
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
      parameter: "",
    },
  ];
});
</script>
