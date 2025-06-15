// counterStore.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return {
      counters: new Map()
    };
  },
  actions: {
    incrementCounter(counterName) {
      if (!this.counters.has(counterName)) {
        this.counters.set(counterName, 1);
      }
      this.counters.set(counterName, this.counters.get(counterName) + 1);
      return this.counters.get(counterName);
    },
    getCounter(counterName) {
      return this.counters.get(counterName) || 1;
    }
  }
});