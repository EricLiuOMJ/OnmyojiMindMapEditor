<template>
  <div class="yuhun-scheme-display">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <div class="badge">{{ displayTotalAmount }}种</div>
    </div>

    <div class="content">
      <p class="description">{{ description }}</p>

      <div class="numbers" v-if="numbers && numbers.length > 0">
        <span class="number-label">适用位置：</span>
        <span class="number-item" v-for="(num, index) in numbers" :key="index">
          {{ num }}号位
        </span>
      </div>

      <div class="yuhuns" v-if="parsedYuhuns && parsedYuhuns.length > 0">
        <div
          v-for="(yuhunsByType, typeName) in updatedGroupedYuhuns"
          :key="typeName"
          class="yuhun-type-group"
        >
          <h4 class="type-header">{{ typeName }}</h4>
          <div
            v-if="yuhunsByType.length === 1 && yuhunsByType[0] === '全部'"
            class="all-yuhuns-in-type"
          >
            全部御魂
          </div>
          <div v-else class="yuhun-grid">
            <div
              class="yuhun-item"
              v-for="(yuhun, index) in yuhunsByType"
              :key="index"
            >
              <img :src="getYuhunIcon(yuhun)" :alt="yuhun" class="yuhun-icon" />
              <span class="yuhun-name">{{ yuhun }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="all-yuhuns-placeholder" v-else>
        <p>包含所有御魂</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import yuhunList from "../public/data/Yuhun.json";

const typeMap = {
  攻击: "attack",
  暴击: "Crit",
  生命: "Health",
  防御: "Defense",
  命中: "ControlHit",
  抵抗: "ControlMiss",
  爆伤: "CritDamage",
  首领: "PVE",
  星痕: "PVP",
};

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  numbers: {
    type: Array,
    default: () => [],
  },
  total_amount: {
    type: Number,
    default: 0,
  },
  yuhuns: {
    type: Array,
    default: () => [],
  },
  description: {
    type: String,
    default: "",
  },
});

const getYuhunIcon = (name) => {
  const found = yuhunList.find((y) => y.name === name);
  return found?.avatar || "/OnmyojiMindMapEditor/pics/Yuhun/default.png";
};

const parseYuhunGroups = (yuhunStr) => {
  if (yuhunStr.includes(" → ")) {
    const [startName, endName] = yuhunStr.split(" → ").map((s) => s.trim());
    const startIndex = yuhunList.findIndex(
      (y) => y.name === startName || y.shortName === startName
    );
    const endIndex = yuhunList.findIndex(
      (y) => y.name === endName || y.shortName === endName
    );

    if (startIndex !== -1 && endIndex !== -1) {
      if (startIndex <= endIndex) {
        return yuhunList.slice(startIndex, endIndex + 1).map((y) => y.name);
      } else {
        return yuhunList
          .slice(endIndex, startIndex + 1)
          .reverse()
          .map((y) => y.name);
      }
    }
  }

  if (yuhunStr.includes("全部")) {
    const [type, count] = yuhunStr.split(" ");
    const targetType = typeMap[type.replace("全部", "")];
    return yuhunList
      .filter((y) => y.type === targetType)
      .slice(0, parseInt(count))
      .map((y) => y.name);
  }

  if (yuhunStr.includes("首领")) {
    const count = parseInt(yuhunStr.split(" ")[0]);
    return yuhunList
      .filter((y) => y.type === "PVE")
      .slice(0, count)
      .map((y) => y.name);
  }

  return [yuhunStr];
};

const parsedYuhuns = computed(() => {
  if (props.yuhuns.length === 0) {
    return [];
  } else {
    return props.yuhuns.flatMap((yuhunStr) => parseYuhunGroups(yuhunStr));
  }
});

const displayTotalAmount = computed(() => {
  return parsedYuhuns.value.length > 0
    ? parsedYuhuns.value.length
    : props.yuhuns.length === 0
    ? 58
    : props.total_amount;
});

const groupedYuhuns = computed(() => {
  return parsedYuhuns.value.reduce((groups, yuhun) => {
    const found = yuhunList.find((y) => y.name === yuhun);
    const type = found?.type || "其他";
    const chineseType =
      Object.keys(typeMap).find((key) => typeMap[key] === type) || type;

    if (!groups[chineseType]) {
      groups[chineseType] = [];
    }

    groups[chineseType].push(yuhun);
    return groups;
  }, {});
});
const yuhunTypeCounts = computed(() => {
  const counts = {};
  yuhunList.forEach((yuhun) => {
    const type = yuhun.type || "其他";
    counts[type] = (counts[type] || 0) + 1;
  });
  return counts;
});

const updatedGroupedYuhuns = computed(() => {
  return Object.entries(groupedYuhuns.value).reduce(
    (result, [chineseType, group]) => {
      const originalType = typeMap[chineseType] || chineseType; // 获取原始英文类型
      const totalCountForType = yuhunTypeCounts.value[originalType];

      if (group.length === totalCountForType) {
        result[chineseType] = ["全部"];
      } else {
        result[chineseType] = group;
      }
      return result;
    },
    {}
  );
});
</script>

<style scoped>
.yuhun-scheme-display {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.title {
  margin: 0;
  font-size: 18px;
  color: var(--vp-c-brand-1);
  flex-grow: 1;
}

.badge {
  background: var(--vp-c-brand-2); /* 使用更柔和的品牌色 */
  color: var(--vp-c-bg); /* 确保文字颜色与背景对比鲜明 */
  padding: 6px 12px; /* 增加内边距 */
  border-radius: 20px; /* 更大的圆角，使其看起来像胶囊 */
  font-size: 13px; /* 稍微调整字体大小 */
  font-weight: 600; /* 增加字体粗细 */
  letter-spacing: 0.5px; /* 增加字母间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加细微阴影 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.badge:hover {
  transform: translateY(-1px); /* 鼠标悬停时轻微上浮 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 鼠标悬停时阴影更明显 */
}

.description {
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  line-height: 1.6;
}

.numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.number-label {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.number-item {
  background: var(--vp-c-bg-alt);
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.yuhun-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 4px;
}

.yuhun-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
}

.yuhun-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.yuhun-name {
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
}

.yuhun-icon:hover {
  transform: scale(1.05);
}

.all-yuhuns-placeholder {
  background: var(--vp-c-bg-alt);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  color: var(--vp-c-text-2);
  font-style: italic;
  font-weight: bold;
}

.all-yuhuns-in-type {
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 8px 0;
}

.yuhuns {
  display: flex;
  flex-wrap: wrap;
  gap: 8px; /* 调整分组之间的间距 */
}

.yuhun-type-group {
  flex: 0 0 auto; /* 不拉伸，不收缩，根据内容决定宽度 */
  margin-bottom: 0; /* 移除底部外边距，因为父容器已经有gap */
  padding: 8px;
  border-radius: 4px;
}

.type-header {
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
}
</style>
