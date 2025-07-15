<template>
  <div class="chart-line">
    <RouterLink :to="{ name: 'Home' }" class="chart-line__back-home"> 🔙 </RouterLink>
    <div class="chart-line__page-header">
      <h1 class="chart-line__title">折線圖</h1>
      <div class="chart-line__download-button">下載 Excel</div>
    </div>
    <div ref="chartContainer" class="chart-line__container" />
    <div>
      <p class="chart-line__data-title">Example 折線圖格式：</p>
      <pre>
        // 由於折線圖的 x 軸未必會是時間相關，因此覺得一律使用字串處理～
        // 如果是時間，請後端轉換好給前端，不要使用 timestamp 比較好

        const chartData = [
          {
            key: 1,
            label: '2025-01-10',
            value: 23000,
          },
          {
            key: 2,
            label: '2025-02-10',
            value: 32000,
          },
          {
            key: 3,
            label: '2025-03-10',
            value: 28000,
          },
        ]
      </pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const chartContainer = ref<HTMLElement | null>(null)
let root: am5.Root | null = null

onMounted(async () => {
  await nextTick()

  if (chartContainer.value) {
    createLineChart()
  }
})

onUnmounted(() => {
  if (root) {
    root.dispose()
    root = null
  }
})

const createLineChart = () => {
  try {
    root = am5.Root.new(chartContainer.value!)
    // root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        pinchZoomX: false,
      }),
    )

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'label',
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
        }),
      }),
    )

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    )

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'label',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{categoryX}: {valueY}',
        }),
      }),
    )

    series.strokes.template.setAll({
      strokeWidth: 3,
      stroke: am5.color('#74ABC7'),
    })

    series.bullets.push(() => {
      return am5.Bullet.new(root!, {
        sprite: am5.Circle.new(root!, {
          strokeWidth: 2,
          fill: am5.color('#1b4965'),
          radius: 5,
        }),
      })
    })

    const data = [
      { label: '2025-01-10', value: 23000 },
      { label: '2025-02-10', value: 32000 },
      { label: '2025-03-10', value: 28000 },
      { label: '2025-04-10', value: 45000 },
      { label: '2025-05-10', value: 38000 },
      { label: '2025-06-10', value: 52000 },
    ]

    xAxis.data.setAll(data)
    series.data.setAll(data)
  } catch (error) {
    console.error('Error creating line chart:', error)
  }
}
</script>
<style lang="scss">
.chart-line {
  &__back-home {
    font-size: 30px;
  }

  &__title {
    font-size: 20px;
    margin: 20px;
    font-weight: bold;
  }

  &__page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__download-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background-color: #1b4965;
    color: white;
    border-radius: 4px;
  }

  &__container {
    min-width: 1000px;
    height: 600px;
    margin-bottom: 100px;
  }

  &__data-title {
    font-size: 16px;
    padding-bottom: 16px;
    font-weight: bold;
  }
}
</style>
