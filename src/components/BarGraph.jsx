import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import Card from './Card';

Chart.register(...registerables);

function BarGraph() {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            let response = await fetch('/api/barchart');
            response = await response.json();

            const ctx = ref.current.getContext('2d');

            // Create chart instance
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: response.data.map(row => row.pestle),
                    datasets: [{
                        label: 'Intensity by Pestle',
                        data: response.data.map(col => col.intensity),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
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
                },
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
        // Handle window resize
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Card>
            <div className='relative h-full min-h-[300px] max-h-[400px]'>
                <canvas ref={ref}></canvas>
            </div>
        </Card>
    );
}

export default BarGraph;
