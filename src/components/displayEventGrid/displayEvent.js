import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CityCard from '../city/cityCard';


function City({ url}) {
    const [events, setEvent] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [dateFilter, setDateFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let constData = []

    let paginatedItems = events.slice(indexOfFirstItem, indexOfLastItem);
   

    const isSameDay = (date1, date2) => {
        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      }
      

    const handleDateFilterChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setDateFilter(event.target.value);
        // setFilteredData(events)
        
        console.log(constData)
        const filteredResults = filteredData.filter(events => {
            const eventsDate = new Date(events.date)
           return isSameDay(selectedDate, eventsDate)
        });
        setEvent(filteredResults);
    };
    

    useEffect(() => {

        const getData =  async () =>{
            // axios.defaults.withCredentials = true;
            const res = await axios.get(url,  {
                method: 'HEAD',
                mode: 'no-cors',
            });
            setFilteredData(res.data)
            setEvent(res.data)
          
            
        }
       getData()

    }, [])

    


  return (
    <div className=' m-20 '>
        <div className='text-center mb-20 font-bold'>
            <p> Filter by Date </p>
             <input type="date" value={dateFilter} onChange={handleDateFilterChange} 
             className='px-4 py-2 text-xl cursor-pointer ' />

        <button onClick={() => setEvent(filteredData)} className='bg-primary ml-10  py-2 px-4 font-bold text-white'>
            Clear filter
        </button>
        </div>

    <div className="grid lg:grid-cols-3 gap-10 md:m-auto md:w-11/12">
        {events.length > 0 && (
            paginatedItems.map((event) => <div key={event.id} className=''> 
            <CityCard {...event} /> </div> )
      
        )}
    </div>
        <div className='mt-20 text-center'>
        {/* Display paginated items */}
        

        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} 
        className={` ${currentPage === 1 ? 'bg-gray' : 'bg-primary'} mr-20  py-2 px-4 font-bold text-white`}>
        Previous
        </button>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= events.length}
         className={` ${indexOfLastItem >= events.length ? 'bg-gray' : 'bg-primary'} mr-20  py-2 px-4 font-bold text-white`}
        >
        Next
        </button>
    </div>
  </div>
  );
}

export default City;
