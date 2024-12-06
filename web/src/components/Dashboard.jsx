import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [chartData, setChartData] = useState({
        labels: ['Pequeños', 'Medianos', 'Grandes', 'No hay fruto'],
        datasets: [
            {
                label: 'Cantidad de Frutos',
                data: [0, 0, 0, 0],
                backgroundColor: ['#FF5733', '#FFBD33', '#33FF57', '#33A1FF'],
                borderColor: ['#FF5733', '#FFBD33', '#33FF57', '#33A1FF'],
                borderWidth: 1,
            },
        ],
    });

    const [fundoInfo, setFundoInfo] = useState({ codigo: '', nombre: '' });

    const fetchCosechaData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/cosecha/fundo/cantidad/F00001');
            const data = await response.json();
            console.log('Datos recibidos:', data);

            if (data && data.length > 0) {
                const fundo = data[0];
                setFundoInfo({
                    codigo: fundo.codigo_fundo,
                    nombre: fundo.nombre_fundo
                });

                const updatedData = {
                    ...chartData,
                    datasets: [{
                        ...chartData.datasets[0],
                        data: [
                            fundo.cantidad_pequeños,
                            fundo.cantidad_medianos,
                            fundo.cantidad_grandes,
                            fundo.cantidad_sin_frutos
                        ],
                    }],
                };

                console.log('Datos actualizados:', updatedData);
                setChartData(updatedData);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        fetchCosechaData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Distribución de Frutos - ${fundoInfo.nombre}`,
            },
        },
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            {chartData.datasets[0].data.some(value => value > 0) ? (
                <Doughnut data={chartData} options={options} />
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default Dashboard;

