import { Canvas } from './style'
import ChartJS from 'chart.js/auto'
import { useEffect, useCallback, useRef, FC } from 'react'

interface ChartPieProps {
  labels: string[]
  data: number[]
  backgroundColor: string[]
}

const ChartPie: FC<ChartPieProps> = ({ data, backgroundColor, labels }) => {
  const chartInstance = useRef<ChartJS<'doughnut'>>()

  const instanciateChart = useCallback(
    (chartContainerElement: HTMLCanvasElement | null) => {
      if (chartContainerElement && !chartInstance.current) {
        const context = chartContainerElement.getContext('2d')
        chartInstance.current = new ChartJS(context, {
          type: 'doughnut',
          data: {
            labels,
            datasets: [{ data, backgroundColor }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            locale: 'pt-BR',
            cutout: 100,
          },
        })
      }
    },
    []
  )

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data.labels = labels
      chartInstance.current.data.datasets = [{ data, backgroundColor }]
      chartInstance.current.update()
    }
  }, [chartInstance.current, data, backgroundColor, labels])

  return <Canvas ref={(elementRef) => instanciateChart(elementRef)} />
}

export default ChartPie
