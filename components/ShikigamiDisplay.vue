<template>
  <div class="shikigami-display">
    <div class="content-wrapper">
      <!-- 新增的序号展示模块 -->
      <div class="order-display">
        <span class="order-number">{{ order }}</span>
      </div>

      <!-- 新增的包裹序号右边内容的 div -->
      <div class="content-panel">
        <!-- 式神展示 -->
        <div class="single-slot shikigami">
          <img
            :src="
              shikigamiData.avatar ||
              '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
            "
            :alt="shikigami || '未选择式神'"
            class="avatar"
          />
          <span class="name">{{ shikigamiData.name || "" }}</span>
          <span class="description">技能 {{ description || "555" }}</span>
        </div>

        <!-- 御魂展示 -->
        <div
          v-for="(yuhun, index) in yuhunDataList"
          :key="index"
          class="single-slot yuhun"
        >
          <img
            :src="
              yuhun.avatar || '/OnmyojiMindMapEditor/pics/Yuhun/default.png'
            "
            class="avatar"
          />
          <span class="name">{{ yuhun.name || "" }}</span>
        </div>

        <!-- 位置和指标信息 -->
        <div class="stats-container">
          <div class="position-stats">
            <div class="target-item">
              <span class="stat-label">御魂指标</span>
              <span class="stat-value">{{ target || "伤害输出" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">二号位</span>
              <span class="stat-value">{{ positions.second || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">四号位</span>
              <span class="stat-value">{{ positions.fourth || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">六号位</span>
              <span class="stat-value">{{ positions.sixth || "-" }}</span>
            </div>
          </div>
          <div class="indicator-stats">
            <div class="stat-item">
              <span class="stat-label">速度</span>
              <span class="stat-value">{{ parameters.speed || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">暴击</span>
              <span class="stat-value">{{ parameters.strike || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">攻击</span>
              <span class="stat-value">{{ parameters.attack || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">防御</span>
              <span class="stat-value">{{ parameters.defense || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">命中</span>
              <span class="stat-value">{{ parameters.hit || "-" }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">抵抗</span>
              <span class="stat-value">{{ parameters.resist || "-" }}</span>
            </div>
          </div>
        </div>
        <div class="info-card">
          <div class="info-title">说明文本</div>
          <div class="info-panel">
            <div class="info-content">
              {{ infoText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shikigami-display {
  margin: 16px 0 0 0;
  padding: 0 0 0 16px;
  border-radius: 12px;
  box-shadow: 0 0 15px 2px var(--vp-c-brand-1);
  transition: all 0.3s ease;
  width: 100%;
  background: var(--vp-c-brand-1);
  display: inline-block; /* Added to prevent full width */
}

.content-wrapper {
  display: flex;
  gap: 20px;
  align-items: center; /* Changed to align items to the center */
}

.order-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--vp-c-white); /* Example color */
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0; /*Prevent shrinking */
}

.content-panel {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-grow: 1;
  height: 100%; /* Ensure it takes full height of content-wrapper */
  border: 1px solid var(--vp-c-divider); /* Add border */
  border-radius: 12px; /* Match parent border-radius */
  padding: 16px; /* Add padding */
  /* Modified: background color */
  background: var(--vp-c-bg);
}

.single-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.yuhun-wrapper {
  display: flex;
  flex-direction: row; /* Changed to column for vertical stacking */
  gap: 10px; /* Adjusted gap */
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-divider); /* Use CSS variable */
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.name {
  margin-top: 4px; /* Adjusted margin */
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1); /* Use CSS variable */
}
.description {
  font-size: 16px;
  font-weight: 800;
  color: var(--vp-c-text-1); /* Use CSS variable */
}
.shikigami .avatar {
  width: 84px;
  height: 84px;
}

.yuhun .avatar {
  width: 64px;
  height: 64px;
}

.stats-container {
  display: flex; /* Changed to flex */
  flex-direction: row; /* Changed to row to place items side-by-side */
  gap: 20px; /* Adjusted gap between position-stats and indicator-stats */
  align-items: center; /* Align items to the top */
}

.position-stats {
  display: grid; /* Changed to grid for better alignment */
  grid-template-columns: auto 1fr; /* Two columns */
  gap: 6px 12px; /* Row and column gap */
  align-items: center;
}

.indicator-stats {
  display: grid; /* Changed to grid for better alignment */
  grid-template-columns: auto 1fr auto 1fr; /* Four columns for two pairs of label-value */
  gap: 6px 12px; /* Row and column gap */
  align-items: center;
}

.stat-item {
  display: contents; /* Allows children to be placed directly in the grid */
}

.stat-label {
  font-weight: 500;
  color: var(--vp-c-text-2); /* Use CSS variable */
  min-width: 60px; /* Adjusted min-width for better alignment */
  text-align: right; /* Align labels to the right */
}

.stat-value {
  padding: 4px 8px;
  background-color: var(--vp-c-bg-alt); /* Use CSS variable */
  border-radius: 4px;
  min-width: 80px; /* Adjusted min-width */
  color: var(--vp-c-text-1); /* Use CSS variable */
}

.target-item {
  display: contents; /* Allows children to be placed directly in the grid */
}

.target-label {
  font-weight: 500;
  color: var(--vp-c-text-2); /* Use CSS variable */
  min-width: 60px; /* Adjusted min-width */
  text-align: right; /* Align labels to the right */
}

.target-value {
  padding: 4px 8px;
  background-color: var(--vp-c-bg-alt); /* Use CSS variable */
  border-radius: 4px;
  min-width: 80px; /* Adjusted min-width */
  color: var(--vp-c-text-1); /* Use CSS variable */
}

.info-card {
  flex-grow: 1; /* Allow info-card to grow and fill available space */
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.info-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 10px;
  padding-bottom: 10px; /* Add padding below title */
  border-bottom: 1px solid var(--vp-c-divider); /* Add a border to separate title and content */
}

.info-panel {
  flex-grow: 1; /* Allow info-panel to grow */
  background: var(--vp-c-bg-alt); /* Changed background color */
  border-radius: 8px; /* Slightly smaller border-radius for inner panel */
  padding: 12px; /* Adjusted padding */
  overflow: auto; /* Add scroll if content overflows */
  margin-top: 10px; /* Add margin to separate from title */
}

.info-content {
  line-height: 1.6;
  color: inherit; /* Inherit color from parent */
  white-space: pre-wrap;
  word-break: break-word; /* Added for long text */
}
</style>

<script setup>
import { computed } from "vue";
import shikigamiList from "../public/data/Shikigami.json";
import yuhunList from "../public/data/Yuhun.json";

const props = defineProps({
  shikigami: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  yuhun: {
    type: Array,
    default: () => [],
  },
  target: {
    type: String,
    default: () => "伤害输出",
    required: true,
  },
  positions: {
    type: Object,
    default: () => ({
      second: "",
      fourth: "",
      sixth: "",
    }),
  },
  parameters: {
    type: Object,
    default: () => ({
      speed: "",
      strike: "",
      attack: "",
      defense: "",
      hit: "",
      resist: "",
    }),
  },
  infoText: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    default: 1,
  },
});

const shikigamiData = computed(() => {
  const found = shikigamiList.find((s) => s.name === props.shikigami);
  return (
    found || {
      name: props.shikigami,
      avatar: "/OnmyojiMindMapEditor/pics/Shikigami/default.png",
    }
  );
});

const yuhunDataList = computed(() => {
  return props.yuhun.map((name) => {
    const found = yuhunList.find((y) => y.name === name);
    return (
      found || {
        name: name,
        avatar: "/OnmyojiMindMapEditor/pics/Yuhun/default.png",
        type: "unknown",
      }
    );
  });
});
</script>
