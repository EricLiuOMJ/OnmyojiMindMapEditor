<template>
  <h3 :id="`${shikigamiData.name}`" tabindex="-1">
    [{{ displayOrder }}] {{ shikigamiData.name }}
    <a class="header-anchor" :href="`#${shikigamiData.name}`" :aria-label="`'Permalink to '${shikigamiData.name}''`">
      ​
    </a>
  </h3>
  <div class="shikigami-display">
    <div class="content-wrapper">
      <!-- 新增的序号展示模块 -->
      <div class="order-display">
        <span class="order-number">{{ displayOrder }}</span>
      </div>

      <!-- 其他内容保持不变 -->
      <div class="content-panel">
        <div class="content-container">
          <div class="show">
            <!-- 式神展示 -->
            <div class="avatar-slot">
              <div class="shikigami">
                <img :src="shikigamiData.avatar ||
                  '/OnmyojiMindMapEditor/pics/Shikigami/default.png'
                  " :alt="shikigami || '未选择式神'" class="avatar" />
                <span class="name">{{ shikigamiData.name || "" }}</span>
                <span class="description">技能 {{ description || "555" }}</span>
              </div>
            </div>

            <!-- 御魂展示 -->
            <div class="yuhun-display">
              <div v-for="(yuhun, index) in yuhunDataList" :key="index" class="yuhun-wrapper">
                <div class="yuhun">
                  <img :src="yuhun.avatar ||
                    '/OnmyojiMindMapEditor/pics/Yuhun/default.png'
                    " class="avatar" />
                  <span class="yuhun-name">{{ yuhun.name || "" }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 位置和指标信息 -->
          <div class="stats-container">
            <div class="position-stats">
              <div class="target-item">
                <span class="target-label">御魂指标</span>
                <span class="target-value">{{ target || "伤害输出" }}</span>
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
              <div class="para-items-title">指标要求</div>
              <div v-if="hasParameters" class="para-items-container">
                <div v-for="(value, key) in parameters" :key="key" class="para-item"
                  :class="{ hidden: value === '-' || value === '' }">
                  <span class="para-label">{{ getLabel(key) }}</span>
                  <span class="para-value">{{ value }}</span>
                </div>
              </div>
              <div v-else class="no-parameters">没有指标要求</div>
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
  display: inline-block;
  min-width: 600px;
}

.content-wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
  /* Changed to align items to the center */
}

.order-display {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--vp-c-white);
  /* Example color */
  font-size: 20px;
  font-weight: bold;
}

.order-number {
  min-width: 24px;
  text-align: center;
}

.content-panel {
  display: flex;
  gap: 10px;
  flex-grow: 1;
  height: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.content-container {
  display: flex;
  align-content: center;
  justify-content: start;
}

.show {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 40%;
  margin-right: 10px;
}

.avatar-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: auto;
  gap: 2px;
  min-width: 90px;
}

.yuhun-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  align-content: center;
  margin: auto;
}

.yuhun-wrapper {
  display: flex;
  flex-direction: columns;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  gap: 10px;
  /* Adjusted gap */
}

/* 合并相似的样式 */
.avatar,
.shikigami .avatar,
.yuhun .avatar {
  border-radius: 50%;
  border: 3px solid var(--vp-c-divider);
  transition: transform 0.2s;
}

.avatar:hover,
.shikigami .avatar:hover,
.yuhun .avatar:hover {
  transform: scale(1.05);
}

.shikigami {
  display: flex;
  padding: auto;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.yuhun {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.yuhun-name,
.name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  /* Use CSS variable */
}

.yuhun-name {
  margin-bottom: 2px;
}

.description {
  font-size: 16px;
  font-weight: 800;
  color: var(--vp-c-text-1);
  /* Use CSS variable */
}

.shikigami .avatar {
  width: 84px;
  height: 84px;
}

.yuhun .avatar {
  width: 56px;
  height: 56px;
}

.stats-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

.position-stats {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 12px;
  align-items: center;
  min-width: 216px;
}

.indicator-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.stat-item {
  display: contents;
  align-items: center;
  justify-items: center;
}

.para-item {
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  align-items: center;
  margin: 4px;
  padding: 2px 4px;
}

.para-label,
.stat-label {
  font-weight: 500;
  min-width: 48px;
  color: var(--vp-c-text-2);
  text-align: right;
}

.stat-label {
  min-width: 64px;
}

.para-value,
.stat-value {
  padding: 4px 8px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 4px;
  min-width: 90px;
  color: var(--vp-c-text-1);
}

.para-value {
  min-width: 64px;
}

.target-item {
  display: contents;
  justify-content: center;
  align-content: center;
}

.target-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
  min-width: 60px;
  text-align: right;
  font-style: italic;
  font-weight: 600;
  font-size: 20px;
}

.target-value {
  padding: 4px;
  border-radius: 4px;
  min-width: 80px;
  color: var(--vp-c-text-1);
  font-family: "Source Han Serif SC", serif;
  font-size: 20px;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 18px;
  text-decoration-color: rgba(255, 228, 0, 0.4);
  text-underline-offset: -12px;
  text-decoration-skip-ink: none;
}

.info-card {
  flex-grow: 1;
  width: 100%;
  margin: 16px 0 16px 16px;
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
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.info-panel {
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  overflow: auto;
  margin-top: 10px;
}

.info-content {
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--vp-c-bg-soft);
}

.para-items-title {
  font-weight: 600;
  margin: 8px;
  color: var(--vp-c-text-2);
  text-align: center;
}

.no-parameters {
  padding: 8px;
  min-width: 136px;
  color: var(--vp-c-text-2);
  font-style: italic;
  text-align: center;
}
</style>
<script setup>
import { useCounterStore } from "./counterStore.js";
import { ref, computed } from "vue";
import shikigamiList from "../public/data/Shikigami.json";
import yuhunList from "../public/data/Yuhun.json";

const counterStore = useCounterStore();

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
    default: "-",
  },
});

const counterName =
  import.meta.env.VITE_CURRENT_FILE_NAME || "default";

const displayOrder = ref(counterStore.getCounter(counterName));

counterStore.incrementCounter(counterName);


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

const getLabel = (key) => {
  const labels = {
    speed: "速度",
    strike: "暴击",
    attack: "攻击",
    defense: "防御",
    hit: "命中",
    resist: "抵抗",
  };
  return labels[key] || key;
};

const hasParameters = computed(() =>
  Object.values(props.parameters).some((v) => v && v !== "-")
);
</script>

<style scoped>
@media screen and (max-width: 1440px) {
  .content-panel {
    flex-direction: column;
    gap: 0px;
  }

  .content-container {
    justify-content: space-between;
    width: 100%;
  }

  .info-card {
    margin: 0;
    margin-right: 16px;
  }
}

@media screen and (max-width: 1440px) and (min-width: 985px) {
  .yuhun-display {
    flex-direction: row;
    gap: 5px;
  }
}

@media screen and (max-width: 1280px) and (min-width: 985px) {
  .stats-container {
    justify-content: space-around;
    width: 60%;
  }
}

@media (max-width: 800px) {
  .indicator-stats {
    flex-direction: column;
  }
}
</style>
