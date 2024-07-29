import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import Card from './Card';

Chart.register(...registerables);

function LineChart() {
    const ref = useRef(null);
    const chartRef = useRef(null);
    const [toYear, setToYear] = useState(2022);
    const [years, setYears] = useState([]);

    useEffect(() => {
        // Fetch available years from the API
        const fetchYears = async () => {
            try {
                const response = await fetch(`/api/filter?type=end_year`); // Adjust endpoint as necessary
                const data = await response.json();
                setYears(data.data);
            } catch (error) {
                console.error('Failed to fetch years', error.message);
            }
        };

        fetchYears();
    }, []);

    useEffect(() => {
        (async () => {
            let response = await fetch(`/api/linechart?to=${toYear}`);
            response = await response.json();

            const ctx = ref.current.getContext('2d');

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create chart instance
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: response.data.map(row => row.start_year),
                    datasets: [{
                        label: 'Year by likelihood',
                        data: response.data.map(col => col.likelihood),
                        fill: true,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.6
                    }]
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
    }, [toYear]);

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
            <div style={{ position: 'relative', minHeight: '300px' }}>
                <canvas ref={ref}></canvas>
            </div>

            <div className="p-4 text-gray-400 rounded-lg mt-6">
                <div className="flex space-x-4">
                    <div className='w-full'>
                        <label htmlFor="toYear" className="block text-sm font-medium text-gray-400">
                            To Year
                        </label>
                        <select
                            id="toYear"
                            value={toYear}
                            onChange={(e) => setToYear(parseInt(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default LineChart;