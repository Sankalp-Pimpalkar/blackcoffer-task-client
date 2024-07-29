/* eslint-disable react/prop-types */
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import Card from './Card';

Chart.register(...registerables);

const COLORS = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(199, 199, 199)',
    'rgb(83, 102, 255)',
    'rgb(60, 179, 113)',
    'rgb(255, 69, 0)',
    'rgb(123, 104, 238)',
    'rgb(220, 20, 60)',
    'rgb(255, 215, 0)',
    'rgb(240, 128, 128)',
    'rgb(32, 178, 170)',
    'rgb(255, 105, 180)',
    'rgb(0, 191, 255)',
    'rgb(34, 139, 34)',
    'rgb(255, 20, 147)'
];

function PieChart({url}) {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            let response = await fetch(`${url}/api/piechart`);
            response = await response.json();

            const labels = response.data.map(row => row.sector || 'Unknown');
            const data = response.data.map(row => row.count);

            const ctx = ref.current.getContext('2d');

            chartRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sector Distribution',
                        data: data,
                        backgroundColor: COLORS.slice(0, data.length),
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        title: {
                            display: true,
                            text: 'Sector Distribution Pie Chart'
                        }
                    }
                }
            });
        })();

        // Cleanup chart instance on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Card>
            <div className='flex items-center justify-center relative h-full min-h-[200px] max-h-[300px]'>
                <canvas ref={ref}></canvas>
            </div>
        </Card>
    );
}

export default PieChart;
