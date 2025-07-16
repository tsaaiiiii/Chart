<template>
  <div class="chart">
    <div ref="chartContainer" class="chart__container" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick} from 'vue'
import { CHART_TYPES } from '@/const';
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5percent from '@amcharts/amcharts5/percent'
import type { ChartData  } from './types';
import type { ChartType } from '@/const/types'


 const props = defineProps<{
  data:ChartData[]
  chartType:ChartType
}>()



const chartContainer = ref<HTMLElement | null>(null)
let root: am5.Root | null = null


const createChart = () => {
  try {
    root = am5.Root.new(chartContainer.value!)

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        pinchZoomX: true,
      }),
    )

    // x 軸
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'label',
        renderer: am5xy.AxisRendererX.new(root, {
          cellStartLocation: 0.1, // Question
          cellEndLocation: 0.9, // Question
        }),
      }),
    )

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      }),
    )



// 圓餅圖
//  const pieSeriesOptions = {
//   valueField: "value",
//   categoryField: "label",
//   tooltip: am5.Tooltip.new(root, {
//     labelText: '{label}: {value}',
//   }),
// };

const xySeriesOptions = {
  xAxis,
  yAxis,
  valueYField: 'value',
  categoryXField: 'label',
  tooltip: am5.Tooltip.new(root, {
    labelText: '{categoryX}: {valueY}',
  }),
};

const chartMap = {
  [CHART_TYPES.BAR]: am5xy.ColumnSeries,
  [CHART_TYPES.LINE]: am5xy.LineSeries,
  [CHART_TYPES.PIE]: am5percent.PieSeries
}


let series;
if(props.chartType === CHART_TYPES.PIE){

}else{
  series = chart.series.push(
    chartMap[props.chartType].new(root,xySeriesOptions),
  )

}

  xAxis.data.setAll(props.data)
  series!.data.setAll(props.data)

  // 長條圖的樣式
  if(series instanceof am5xy.ColumnSeries){
      series!.set('fill', am5.color('#74ABC7'))
  }
  // 折線圖的樣式
  else if (props.chartType === CHART_TYPES.LINE && series instanceof am5xy.LineSeries) {
    series.strokes.template.setAll({
      strokeWidth: 3,
      stroke: am5.color('#74ABC7'),
    })

      series.bullets.push(function(root) {
      return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        strokeWidth: 2,
        fill: am5.color('#AE0000'),
        radius: 5,
      }),
    });
  });
  }



  //  series.appear(1000)
  // chart.appear(1000, 100)
  } catch (error) {
    console.error('Error creating chart:', error)
  }
}

onMounted(async () => {
  await nextTick()

  if (chartContainer.value) {
    createChart()
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
.chart{
  &__container {
    min-width: 1000px;
    height: 600px;
    margin-bottom: 100px;
  }
}

</style>
