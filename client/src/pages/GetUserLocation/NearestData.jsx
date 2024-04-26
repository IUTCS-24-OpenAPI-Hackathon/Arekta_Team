/* eslint-disable react/prop-types */

const NearestData = ({nearestArea}) => {
  return (
    <div className="relative flex items-center justify-center w-full p-5 mt-2 border shadow">
       {nearestArea.tags.place &&  <div className="absolute flex items-center justify-center px-2 bg-gray-300 rounded-full top-1 right-1"><p>
       { nearestArea.tags.place }</p></div>}
       {/* {nearestArea.tags?.name ? <h3 className="text-2xl font-bold">{nearestArea.tags?.name}</h3>: <h3 className="text-2xl font-bold">{nearestArea.tags.name:en}</h3>} */}
       <h3 className="text-2xl font-bold">{nearestArea.tags?.name}</h3>
        
    </div>
  )
}

export default NearestData