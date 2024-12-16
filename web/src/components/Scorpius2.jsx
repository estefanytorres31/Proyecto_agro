import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
    { id: 'chartA', label: 'Sector A', data: [70, 20, 10, 0] },
    { id: 'chartB', label: 'Sector B', data: [20, 30, 50, 0] },
    { id: 'chartC', label: 'Sector C', data: [20, 15, 20, 0] },
    { id: 'chartD', label: 'Sector D', data: [0, 3, 5, 50] },
  ];

  const combinedData = chartsData.reduce((totals, chart) => {
    chart.data.forEach((value, index) => {
      totals[index] = (totals[index] || 0) + value;
    });
    return totals;
  }, []);

  const pieLabels = ['Grande', 'Mediano', 'Pequeño', 'No hay'];

  const doughnutData = {
    labels: pieLabels,
    datasets: [
      {
        data: combinedData,
        backgroundColor: ['#52d32c', '#ff8001', '#f40606', '#c4c4c4'],
        borderColor: ['#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const horizontalBarChartOptions = {
    ...barChartOptions,
    indexAxis: 'y',
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out flex ${
        isSidebarExpanded ? 'ml-64' : 'ml-20'
      }`}
      style={{ backgroundColor: '#ededee', minHeight: '100vh' }}
    >
      <div className="container mx-auto p-6 flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-2xl font-bold text-gray-800">SCORPIUS 2</h4>
          <h4 id="realtime-clock" className="text-xl font-semibold text-gray-500"></h4>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doughnut Chart */}
          <div className="bg-white rounded-lg shadow p-4 h-96 flex">
            <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>

          {/* Bar Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {chartsData.map((chart) => (
              <div key={chart.id} className="bg-white rounded-lg shadow p-4 h-44">
                <Bar
                  data={{
                    labels: pieLabels,
                    datasets: [
                      {
                        label: chart.label,
                        data: chart.data,
                        backgroundColor: ['#52d32c', '#ff8001', '#f40606', '#c4c4c4'],
                        borderColor: ['#3fda12', '#ff8001', '#e30808', '#c1baba'],
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={barChartOptions}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rankings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chartsData.map((chart) => (
            <div key={`ranking-${chart.id}`} className="bg-white rounded-lg shadow p-4 h-56">
              <Bar
                data={{
                  labels: pieLabels,
                  datasets: [
                    {
                      label: chart.label,
                      data: chart.data,
                      backgroundColor:
                        chart.id === 'chartA'
                          ? '#52d32c'
                          : chart.id === 'chartB'
                          ? '#ff8001'
                          : chart.id === 'chartC'
                          ? '#f40606'
                          : '#c4c4c4',
                      borderColor:
                        chart.id === 'chartA'
                          ? '#3fda12'
                          : chart.id === 'chartB'
                          ? '#ff8001'
                          : chart.id === 'chartC'
                          ? '#e30808'
                          : '#c1baba',
                      borderWidth: 2,
                    },
                  ],
                }}
                options={horizontalBarChartOptions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;