<template>
  <div class="shikigami-selector" v-if="show">
    <div class="modal">
      <h2>选择式神</h2>
      <div class="current-selection">当前选择: {{ current.name }}</div>

      <div class="search-box">
        <input
          type="text"
          v-model="searchText"
          placeholder="搜索式神..."
          @input="filterShikigami"
        />
      </div>

      <div class="tabs">
        <button
          v-for="rarity in rarityLevels"
          :key="rarity.name"
          :class="{ active: activeName === rarity.name }"
          @click="activeName = rarity.name"
        >
          {{ rarity.label }}
        </button>
      </div>

      <div class="shikigami-grid">
        <div
          class="shikigami-item"
          v-for="shikigami in filteredShikigami"
          :key="shikigami.name"
          @click="selectShikigami(shikigami)"
        >
          <img :src="shikigami.avatar" :alt="shikigami.name" />
          <span>{{ shikigami.name }}</span>
        </div>
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="cancel">取消</button>
        <button class="confirm-btn" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import shikigamiData from "../public/data/Shikigami.json"

const props = defineProps({
  show: Boolean,
  currentShikigami: Object
})

const emit = defineEmits(['close', 'select'])

const searchText = ref('')
const activeName = ref('ALL')
const current = ref(props.currentShikigami || { name: '' })

const rarityLevels = [
  { label: "全部", name: "ALL" },
  { label: "SP", name: "SP" },
  { label: "SSR", name: "SSR" },
  { label: "SR", name: "SR" },
  { label: "R", name: "R" },
  { label: "N", name: "N" },
  { label: "联动", name: "L" },
  { label: "呱太", name: "G" },
]

const filteredShikigami = computed(() => {
  let filtered = shikigamiData

  if (activeName.value !== 'ALL') {
    filtered = filtered.filter(s => s.rarity === activeName.value)
  }

  if (searchText.value) {
    const search = searchText.value.toLowerCase()
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(search)
    )
  }

  return filtered
})

function selectShikigami(shikigami) {
  current.value = shikigami
}

function confirm() {
  emit('select', current.value)
  cancel()
}

function cancel() {
  emit('close')
  searchText.value = ''
  activeName.value = 'ALL'
}
</script>

<style scoped>
.shikigami-selector {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  overflow: auto;
}

.search-box {
  margin: 15px 0;
}

.search-box input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

.tabs button.active {
  background: #409eff;
  color: white;
  border-color: #409eff;
}

.shikigami-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  max-height: 50vh;
  overflow-y: auto;
}

.shikigami-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.shikigami-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
}

.shikigami-item:hover img {
  border-color: #409eff;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.actions button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
}

.confirm-btn {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
</style>