/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Card from './Card';
import Filter from './Filter';

function Table({ url }) {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        topics: '',
        sectors: '',
        regions: '',
        pests: '',
        sources: '',
        countries: '',
        insights: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`${url}/api/table`);
                response = await response.json();
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (name, value) => {
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filteredData = data.filter(item => {
        return (
            (!filters.topics || item.topic?.includes(filters.topics)) &&
            (!filters.sectors || item.sector?.includes(filters.sectors)) &&
            (!filters.regions || item.region?.includes(filters.regions)) &&
            (!filters.pests || item.pestle?.includes(filters.pests)) &&
            (!filters.sources || item.source?.includes(filters.sources)) &&
            (!filters.countries || item.country?.includes(filters.countries)) &&
            (!filters.insights || item.insight?.includes(filters.insights))
        );
    });

    if (!data.length) return (
        <div className='text-gray-100 p-5 font-bold'>
            Loading...
        </div>
    );

    return (
        <Card className='md:min-w-full overflow-x-auto'>
            <div className='flex justify-between items-center mb-2 flex-wrap'>
                <h1 className='text-gray-200 text-xl font-bold'>
                    Overall Data ({filteredData.length} results found)
                </h1>
                <div className='flex gap-2 flex-wrap'>
                    <Filter
                        name={'topics'}
                        defaultOption={'All Topics'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.topic).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'sources'}
                        defaultOption={'All Sources'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.source).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'sectors'}
                        defaultOption={'All Sectors'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.sector).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'regions'}
                        defaultOption={'All Regions'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.region).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'pests'}
                        defaultOption={'All Pests'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.pestle).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'insights'}
                        defaultOption={'All Insights'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.insight).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                    <Filter
                        name={'countries'}
                        defaultOption={'All Countries'}
                        setFilter={handleFilterChange}
                        options={data.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index)}
                    />
                </div>
            </div>

            <div className="relative overflow-x-auto max-h-screen hide-scrollbar">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Sector</th>
                            <th scope="col" className="px-6 py-3">Topic</th>
                            <th scope="col" className="px-6 py-3">Region</th>
                            <th scope="col" className="px-6 py-3">Country</th>
                            <th scope="col" className="px-6 py-3">Relevance</th>
                            <th scope="col" className="px-6 py-3">Intensity</th>
                            <th scope="col" className="px-6 py-3">Likelihood</th>
                            <th scope="col" className="px-6 py-3">Insight</th>
                            <th scope="col" className="px-6 py-3">Source</th>
                            <th scope="col" className="px-6 py-3">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap min-w-96 dark:text-white">{item.title || 'N/A'}</th>
                                <td className="px-6 py-4">{item.sector || 'N/A'}</td>
                                <td className="px-6 py-4">{item.topic || 'N/A'}</td>
                                <td className="px-6 py-4">{item.region || 'N/A'}</td>
                                <td className="px-6 py-4">{item.country || 'N/A'}</td>
                                <td className="px-6 py-4">{item.relevance || 'N/A'}</td>
                                <td className="px-6 py-4">{item.intensity || 'N/A'}</td>
                                <td className="px-6 py-4">{item.likelihood || 'N/A'}</td>
                                <td className="px-6 py-4">{item.insight || 'N/A'}</td>
                                <td className="px-6 py-4">{item.source || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                        Link
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default Table;
