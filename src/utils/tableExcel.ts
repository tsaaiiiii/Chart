import ExcelJs from "exceljs";
import { downloadExcel } from '@/utils/downloadFiles'
import type { ChartData } from '@/components/Chart/types'

const tableDownload = (columns: Partial<ExcelJs.Column>[],rows:(string | number)[][], fileName?:string)=>{

  const workbook = new ExcelJs.Workbook();
  const sheet = workbook.addWorksheet('工作表1');

  sheet.columns = columns
  sheet.addRows(rows);

  workbook.xlsx.writeBuffer().then((content) => {
    downloadExcel(content,fileName)
  });
}

const transformChartDataToTable = (chartData:ChartData[]) =>{
  const columns =  chartData.map((chart)=>({
      header:chart.label,
      width: 20
    }))

  const rows = [chartData.map((chart)=>chart.value)]

  return { columns, rows }

}

export { tableDownload, transformChartDataToTable }
