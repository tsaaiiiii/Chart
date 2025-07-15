<template>
  <div class="home">
    <template v-for="chart in chartData" :key="chart.key">
      <RouterLink :to="{ name: chart.key }">
        <p class="home__button-title">{{ chart.title }}</p>
      </RouterLink>
    </template>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'

const chartData = [
  {
    key: 'BarChart',
    title: '長條圖',
  },
  {
    key: 'PieChart',
    title: '圓餅圖',
  },
  {
    key: 'LineChart',
    title: '折線圖',
  },
]
</script>
<style lang="scss">
.home {
  display: flex;
  justify-content: center;
  gap: 16px;

  &__button-title {
    font-weight: bold;
    font-size: 16px;
    border: solid 1px #1b4965;
    padding: 12px;
    border-radius: 4px;

    &:hover {
      border-radius: 4px;
      background-color: #74abc7;
      color: white;
      transition-duration: 0.8s;
    }
  }
}
</style>
