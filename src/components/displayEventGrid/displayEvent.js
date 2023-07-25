import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CityCard from '../city/cityCard';
import "./event.css"
import { priceData } from "./priceData"


function City({ url}) {
    const [events, setEvent] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [dateFilter, setDateFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [userPrice, setUserPrice] = useState({
        from: null,
        to: null
    });


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    let paginatedItems = events.slice(indexOfFirstItem, indexOfLastItem);
    let disableButton = userPrice.from > 0 && userPrice.to > 0
   

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
        const filteredResults = filteredData.filter(events => {
            const eventsDate = new Date(events.date)
           return isSameDay(selectedDate, eventsDate)
        });
        setEvent(filteredResults);
    };
    
    const getAllTags = async () => {
        const tagUrl = 'https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event/all/tags';
        const res = await axios.get(tagUrl,  {
            method: 'HEAD',
            mode: 'no-cors',
        });
        const unique = [...new Set(res.data.map(item => item.name))]
        setTags(unique)
    }

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
       getAllTags()

    }, [])

    const handleTagChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedTag(selectedOption);
        const filteredResults = filteredData.filter((item) => {
            return item.web_tag_groups === selectedOption
        })
        setEvent(filteredResults);

      };

    const handleSelectedPrice = (event) => {
        const price = event.target.value;
        setSelectedPrice(price);
        if(price === 'all') return setEvent(filteredData)
        const priceFromData = priceData.find((item) => item.min === parseInt(price))
        const filteredResults = filteredData.filter((item) => {
            
            return parseInt(item.min_price) >= parseInt(priceFromData.min) 
            && parseInt(item.min_price) <= parseInt(priceFromData.max) 
        })
        setEvent(filteredResults);
    }

    const searchUserPrice = () => {
        if(userPrice.to <= userPrice.from) return alert('Invalid selection!')
        if(userPrice.to < 1) return alert('Invalid figures!')
        
        const filteredResults = filteredData.filter((item) => {
            
            return parseInt(item.min_price) >= userPrice.from
            && parseInt(item.min_price) <= userPrice.to
        })
        console.log(filteredResults)
        setEvent(filteredResults);

    }

    const handleUserPrice = (event) => {
        setUserPrice({...userPrice, [event.target.name]: event.target.value})
    }

    const clearFilter = ( ) => { 
        setSelectedTag("");
        setDateFilter("");
        setSelectedPrice("all");
        setUserPrice({
            from: 0,
            to: 0
        });
        setEvent(filteredData)
    }


  return (
    <div className=' m-20 '>
        <div className='text-center mb-10 font-bold'>
            <h2 className='my-10 '> Filter Events </h2>
            <div className='flex justify-center'>
             <input type="date" value={dateFilter} onChange={handleDateFilterChange} 
             className='px-4 py-2 text-xl cursor-pointer ' />
             
             <select
                className="inline w-2/4 mx-6   p-2 border border-background rounded-md
                  focus:ring-background focus:border-background selectTags"
                value={selectedTag}
                onChange={handleTagChange}
            >   
             <option  value="select tags">Select Tags</option>
                {tags?.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            <button onClick={clearFilter} className='bg-primary  py-2 px-4 font-bold text-white'>
                Clear filter
            </button>
        </div>
 
        <fieldset className='mt-4  '>
                <legend>Filter Events by Price  Range</legend>
                 <div>
                <input type="radio" id="allEvents" name="price" value="all" 
                onChange={handleSelectedPrice} 
                checked={selectedPrice === "all"}
                />
                <label for="contactChoice1"  className='ml-2'>all price</label>
                {priceData.map((item) => (
                    <>
                    <input type="radio" id={`${item.min}`} name="price" 
                    value={item.min} checked={selectedPrice === `${item.min}`}
                    onChange={handleSelectedPrice} className='ml-10'
                     />
                   { item.min < 5000 && <label for={`${item.min}`} className='ml-2'>{item.min} - {item.max}</label>}
                   { item.min > 5000 && <label for={`${item.min}`} className='ml-2'>   {item.min} + </label>}
                    </>
                ))}

                </div> 
        </fieldset>
        <div class="flex justify-center mt-10">
            <div className='inline'>
                <label for="start" className="block mb-2 text-sm font-medium text-gray-900 
                dark:text-white">FROM</label>
                <input type="number" id="start" className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                 name="from"
                 value={userPrice.from}
                 onChange={handleUserPrice}
                 placeholder="200" required/>
            </div>
            <div className='mx-10 inline'>
                <label for="end" className="block mb-2 text-sm font-medium text-gray-900 
                dark:text-white">TO</label>
                <input type="number" id="end" className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                name="to"
                value={userPrice.to}
                onChange={handleUserPrice}
                placeholder="600" required/>
            </div>
            <button onClick={searchUserPrice} className={`bg-background  py-2 px-4 h-10 mt-auto
            ${!disableButton ? 'bg-gray cursor-disable' : 'bg-background'}
            font-bold text-white`} disabled={!disableButton}>
                filter
            </button>
        </div>
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
