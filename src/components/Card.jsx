/* eslint-disable react/prop-types */

function Card({ children, className = '' }) {
    return (
        <div className={`border border-gray-800 shadow-md bg-gray-900 w-full h-fit md:max-w-sm my-2 rounded-md p-5 ${className}`}>
            {children}
        </div>
    )
}

export default Card