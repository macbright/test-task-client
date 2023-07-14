import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


function CityCard({title, description, venue, category, region, id }) {

   const markUp = (description) => {
      return {__html: description.substring(0, 150)}
    }
  return (
    <div className="">
        <div className="max-w-sm bg-darkBackgroud rounded-lg shadow  sm:mb-6 " key={id}>
            
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  hover:text-primary text-white">
                    <Link to={`/event/${id}`}>
                    { title }
                         </Link>
                    </h5>
                </a>
               {description && <div dangerouslySetInnerHTML={markUp(description)} className='mb-3 font-normal text-gray'>

                </div>}
                <div className='mb-3 font-normal text-gray'>
                    <div>
                        <strong className='text-white'> Venue:</strong> <span>{venue} </span>
                    </div>
                    <div>
                        <strong className='text-white'> Category:</strong> <span>{category} </span>
                    </div>
                    <div>
                        <strong className='text-white'> Region:</strong> <span>{region} </span>
                    </div>
                </div>

                <Link href={`/event/${id}`} className="inline-flex items-center  py-2 text-sm font-medium text-center 
                text-gray rounded-lg hover:text-primary ">
                    Read more....
                </Link>
            </div>
        </div>
    </div>
  );
}

export default CityCard;
