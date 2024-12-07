import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  useEffect(() => {
    const handleSidebarChange = (e) => {
      if (e.detail.expanded !== undefined) {
        setIsSidebarExpanded(e.detail.expanded);
      }
    };

    window.addEventListener('sidebarChange', handleSidebarChange);
    return () => {
      window.removeEventListener('sidebarChange', handleSidebarChange);
    };
  }, []);

  const chartsData = [
    { id: 'chartA', label: 'Sector A', data: [50, 20, 30, 0] },
    { id: 'chartB', label: 'Sector B', data: [20, 50, 30, 0] },
    { id: 'chartC', label: 'Sector C', data: [20, 10, 30, 0] },
    { id: 'chartD', label: 'Sector D', data: [0, 3, 5, 50] },
  ]

  const combinedData = chartsData.reduce((totals, chart) => {
    chart.data.forEach((value, index) => {
      totals[index] = (totals[index] || 0) + value
    })
    return totals
  }, [])

  const pieLabels = ['Grande', 'Mediano', 'Pequeño', 'No hay']

  const doughnutData = {
    labels: pieLabels,
    datasets: [{
      data: combinedData,
      backgroundColor: ['#52d32c', '#ff8001', '#f40606', '#c4c4c4'],
      borderColor: ['#ffffff'],
      borderWidth: 2,
    }]
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        beginAtZero: true,
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  }

  const horizontalBarChartOptions = {
    ...barChartOptions,
    indexAxis: 'y',
    scales: {
      x: {
        type: 'linear',
        beginAtZero: true,
      },
      y: {
        type: 'category',
      }
    },
  }

  return (
    <div className={`transition-all duration-300 ease-in-out overflow-y-auto flex ${
      isSidebarExpanded ? 'ml-64' : 'ml-20'
    }`}>
      <div className="container mx-auto p-5 flex flex-col gap-4">
        <div className="flex justify-between mb-4">
          <h4 className="text-xl font-bold">SCORPIUS 1</h4>
          <h4 id="realtime-clock" className="text-xl font-bold"></h4>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="w-full md:w-1/2 h-96 bg-white rounded-lg shadow p-4 flex">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {chartsData.map((chart) => (
              <div key={chart.id} className="h-44 bg-white rounded-lg shadow p-4">
                <Bar
                  data={{
                    labels: pieLabels,
                    datasets: [{
                      label: chart.label,
                      data: chart.data,
                      backgroundColor: ['#52d32c', '#ff8001', '#f40606', '#c4c4c4'],
                      borderColor: ['#3fda12', '#ff8001', '#e30808', '#c1baba'],
                      borderWidth: 2,
                    }]
                  }}
                  options={barChartOptions}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chartsData.map((chart) => (
            <div key={`ranking-${chart.id}`} className="h-56 bg-gray-100 rounded-lg shadow p-4">
              <Bar
                data={{
                  labels: pieLabels,
                  datasets: [{
                    label: chart.label,
                    data: chart.data,
                    backgroundColor: chart.id === 'chartA' ? '#52d32c' : 
                                     chart.id === 'chartB' ? '#ff8001' : 
                                     chart.id === 'chartC' ? '#f40606' : '#c4c4c4',
                    borderColor: chart.id === 'chartA' ? '#3fda12' : 
                                 chart.id === 'chartB' ? '#ff8001' : 
                                 chart.id === 'chartC' ? '#e30808' : '#c1baba',
                    borderWidth: 2,
                  }]
                }}
                options={horizontalBarChartOptions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
