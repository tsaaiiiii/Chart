<template>
  <div class="chart-pie">
    <RouterLink :to="{ name: 'Home' }" class="chart-pie__back-home"> 🔙 </RouterLink>
    <div class="chart-pie__page-header">
      <h1 class="chart-pie__title">圓餅圖</h1>
      <div class="chart-pie__download-button" @click="downloadExcel">下載 Excel</div>
    </div>
    <div ref="chartContainer" class="chart-pie__container" />
    <Chart :data="chartData" :chart-type="CHART_TYPES.BAR"/>
    <div>
      <p class="chart-bar__data-title">Example 圓餅圖格式：</p>
      <pre>
        // 看會不會需要特定顏色，如果需要的話，圓餅圖可以個別帶顏色，不然就用套件預設～

        const chartData =  [
          {
            key: 1,
            label: 'Chrome',
            value: 65.2
          },
          {
            key: 2,
            label: 'Safari',
            value: 18.8
          },
          {
            key: 3,
            label: 'Edge',
            value: 4.3,
          },
          {
            key: 4,
            label: 'Firefox',
            value: 3.4
          },
          {
            key: 5,
            label: 'Opera',
            value: 2.2
          },
          {
            key: 6,
            label: '其他',
            value: 6.1
          },
        ]
      </pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import { CHART_TYPES } from '@/const';
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import Chart from '@/components/Chart/index.vue'
import { tableDownload,transformChartDataToTable } from '@/utils/tableExcel'

// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const chartContainer = ref<HTMLElement | null>(null)
let root: am5.Root | null = null

  const chartData = [
      { key: 1, label: 'Chrome', value: 65.2, color: '#4285f4' },
      { key: 2, label: 'Safari', value: 18.8, color: '#34a853' },
      { key: 3, label: 'Edge', value: 4.3, color: '#0078d4' },
      { key: 4, label: 'Firefox', value: 3.4, color: '#ff9500' },
      { key: 5, label: 'Opera', value: 2.2, color: '#ff6d01' },
      { key: 6, label: '其他', value: 6.1, color: '#9aa0a6' },
    ]


const createPieChart = () => {
  try {
    root = am5.Root.new(chartContainer.value!)

    // root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    )

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'label',
        alignLabels: false,
      }),
    )



    series.set(
      'colors',
      am5.ColorSet.new(root, {
        colors: chartData.map((item) => am5.color(item.color)),
      }),
    )

    series.data.setAll(chartData)

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }),
    )

    legend.data.setAll(series.dataItems)

    // series.appear(1000, 100)
  } catch (error) {
    console.error('Error creating pie chart:', error)
  }
}

  const downloadExcel = () =>{
  const tableData = transformChartDataToTable(chartData)
    tableDownload(tableData.columns, tableData.rows, '圓餅圖')
  }

  onMounted(async () => {
  await nextTick()

  if (chartContainer.value) {
    createPieChart()
  }
})

onUnmounted(() => {
  if (root) {
    root.dispose()
    root = null
  }
})

</script>
<style lang="scss">
.chart-pie {
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
    cursor: pointer;
  }

  &__container {
    min-width: 1000px;
    height: 500px;
    margin-bottom: 100px;
  }

  &__data-title {
    font-size: 16px;
    padding-bottom: 16px;
    font-weight: bold;
  }
}
</style>
