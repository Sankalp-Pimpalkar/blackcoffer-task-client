/* eslint-disable react/prop-types */
const Filter = ({ name, setFilter, defaultOption, options }) => {
    const handleChange = (e) => {
        setFilter(name, e.target.value);
    };

    return (
        <div className='w-full max-w-40'>
            <select name={name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="">{defaultOption}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filter;
