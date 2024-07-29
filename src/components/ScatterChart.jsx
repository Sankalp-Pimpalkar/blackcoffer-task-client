/* eslint-disable react/prop-types */
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
import Card from './Card';

Chart.register(...registerables);

function ScatterChart({ url }) {
    const ref = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        (async () => {
            let response = await fetch(`${url}/api/scatterchart`);
            response = await response.json();

            const ctx = ref.current.getContext('2d');

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
            <div style={{ position: 'relative', maxHeight: '300px' }}>
                <canvas ref={ref}></canvas>
            </div>
        </Card>
    );
}

export default ScatterChart;
