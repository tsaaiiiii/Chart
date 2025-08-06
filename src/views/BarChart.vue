<template>
  <div class="chart-bar">
    <RouterLink :to="{ name: 'Home' }" class="chart-bar__back-home"> 🔙 </RouterLink>
    <div class="chart-bar__page-header">
      <h1 class="chart-bar__title">長條圖</h1>
      <div class="chart-bar__download-button" @click="downloadExcel">下載 Excel</div>
    </div>
    <!-- <div ref="chartContainer" class="chart-bar__container" /> -->
    <Chart :data="chartData" :chart-type="CHART_TYPES.BAR" />
    <div>
      <p class="chart-bar__data-title">Example 長條圖格式：</p>
      <pre>
      {
        chartType:'bar',
        series: [
          { name: '系列 A', field: 'valueA', color: '#74ABC7' },
          { name: '系列 B', field: 'valueB', color: '#66B3FF' },
          { name: '系列 C', field: 'valueC', color: '#FFA042' },
        ],
        chartValue: [
          { label: '一月', valueA: 23000, valueB: 19000, valueC: 21000 },
          { label: '二月', valueA: 32000, valueB: 28000, valueC: 30000 },
          { label: '三月', valueA: 28000, valueB: 25000, valueC: 27000 },
          { label: '四月', valueA: 30000, valueB: 52000, valueC: 54000 },
          { label: '五月', valueA: 52300, valueB: 48000, valueC: 50000 },
          { label: '六月', valueA: 15800, valueB: 12000, valueC: 14000 },
        ],
      },
      </pre>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CHART_TYPES } from '@/const'
import Chart from '@/components/Chart/index.vue'
import { tableDownload, transformChartDataToTable } from '@/utils/tableExcel'

// import { onMounted, onUnmounted, nextTick, ref } from 'vue'
// import * as am5 from '@amcharts/amcharts5'
// import * as am5xy from '@amcharts/amcharts5/xy'
// import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

const chartData = [
  {
    key: 1,
    label: '一月',
    value: 23000,
  },
  {
    key: 2,
    label: '二月',
    value: 32000,
  },
  {
    key: 3,
    label: '三月',
    value: 28000,
  },
  {
    key: 4,
    label: '四月',
    value: 56000,
  },
  {
    key: 5,
    label: '五月',
    value: 52300,
  },
  {
    key: 6,
    label: '六月',
    value: 15800,
  },
]

const downloadExcel = () => {
  const tableData = transformChartDataToTable(chartData)
  tableDownload(tableData.columns, tableData.rows, '長條圖')
}

// const chartContainer = ref<HTMLElement | null>(null)
// let root: am5.Root | null = null
// const createColumnChart = () => {
//   try {
//     root = am5.Root.new(chartContainer.value!)

//     // root.setThemes([am5themes_Animated.new(root)])

//     const chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panX: false,
//         panY: false,
//         wheelX: 'none',
//         wheelY: 'none',
//         pinchZoomX: true,
//       }),
//     )

//     const xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         categoryField: 'label',
//         renderer: am5xy.AxisRendererX.new(root, {
//           cellStartLocation: 0.1,
//           cellEndLocation: 0.9,
//         }),
//       }),
//     )

//     const yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {}),
//       }),
//     )

//     const series = chart.series.push(
//       am5xy.ColumnSeries.new(root, {
//         name: '銷售額',
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: 'value',
//         categoryXField: 'label',
//         tooltip: am5.Tooltip.new(root, {
//           labelText: '{labelX}: {valueY}',
//         }),
//       }),
//     )

//     xAxis.data.setAll(chartData)
//     series.data.setAll(chartData)

//     series.set('fill', am5.color('#74ABC7'))

//     //  series.appear(1000)
//     // chart.appear(1000, 100)
//   } catch (error) {
//     console.error('Error creating chart:', error)
//   }
// }

// onMounted(async () => {
//   await nextTick()

//   if (chartContainer.value) {
//     createColumnChart()
//   }
// })

// onUnmounted(() => {
//   if (root) {
//     root.dispose()
//     root = null
//   }
// })
</script>
<style lang="scss">
.chart-bar {
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

  // &__container {
  //   min-width: 1000px;
  //   height: 500px;
  //   margin-bottom: 100px;
  // }

  &__data-title {
    font-size: 16px;
    padding-bottom: 16px;
    font-weight: bold;
  }
}
</style>
