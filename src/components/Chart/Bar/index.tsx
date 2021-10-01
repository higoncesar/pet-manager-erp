import { Canvas } from './style'
import ChartJS, { ChartDataset } from 'chart.js/auto'
import { useEffect, useCallback, useRef, FC } from 'react'

interface ChartBarProps {
  labels: string[]
  datasets: ChartDataset<'bar', number[]>[]
}

const ChartBar: FC<ChartBarProps> = ({ labels, datasets }) => {
  const chartInstance = useRef<ChartJS<'bar'>>()

  const instanciateChart = useCallback(
    (chartContainerElement: HTMLCanvasElement | null) => {
      if (chartContainerElement && !chartInstance.current) {
        const context = chartContainerElement.getContext('2d')
        chartInstance.current = new ChartJS(context, {
          type: 'bar',
          data: {
            labels,
            datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          },
        })
      }
    },
    [labels, datasets]
  )

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.data.datasets = datasets
      chartInstance.current.update()
    }
  }, [chartInstance.current, datasets])

  return <Canvas ref={(elementRef) => instanciateChart(elementRef)} />
}

export default ChartBar
