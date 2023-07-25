import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Event() {
    const { id } = useParams();

    const [event, setEvent] = useState()

    useEffect(() => {

        const getDataById =  async () =>{
            // axios.defaults.withCredentials = true;
            const url = `https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event/${id}`
            console.log(url)
            const res = await axios.get(url,  {
                method: 'HEAD',
                mode: 'no-cors',
            });
            console.log(res.data)
            setEvent(res.data)
          
            
        }
        getDataById()

    }, [])

    const markUp = (description) => {
        return {__html: description}
      }

  return (
    <div className="m-10 p-16 bg-background text-white ">
      
    
            <h3 className="mb-2 text-2xl font-bold tracking-tight  ">
                
                { event?.title }
                    
             </h3>
            
               {event?.description && <div dangerouslySetInnerHTML={markUp(event?.description)} className='mb-3 font-normal text-gray'>

            </div>}

            <div className='my-8'>
                <strong className='mr-10'> Event Date:</strong> <span> {event?.date}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Venue:</strong> <span> {event?.venue}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Url: </strong> <span> {event?.url}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Region:</strong> <span> {event?.region}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> category: </strong> <span> {event?.category}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Age:</strong> <span> {event?.age}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Venue Address: </strong> <span> {event?.venue_address}</span>
            </div>

            <div className='my-8'>
                <strong className='mr-10'> Google Address: </strong> <span> {event?.google_address}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Tags:</strong> <span> {event?.web_tag_groups}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Max Price: </strong> <span> {event?.max_price}</span>
            </div>
            <div className='my-8'>
                <strong className='mr-10'> Min Price: </strong> <span> {event?.min_price}</span>
            </div>
    </div>
  );
}

export default Event;
