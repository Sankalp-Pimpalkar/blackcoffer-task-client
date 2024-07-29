import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import Card from './Card';

Chart.register(...registerables);

function ScatterChart() {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            let response = await fetch('/api/scatterchart');
            response = await response.json();

            const ctx = ref.current.getContext('2d');

            // Create chart instance
            chartRef.current = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Relevance by Intensity',
                            data: response.data.map(row => ({ x: row.intensity, y: row.relevance })),

                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
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
            <div style={{ position: 'relative', maxHeight: '300px' }}>
                <canvas ref={ref}></canvas>
            </div>
        </Card>
    );
}

export default ScatterChart;
