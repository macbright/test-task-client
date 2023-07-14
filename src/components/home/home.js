import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {

    const [cities, setCities] = useState([]);
    

    useEffect(() => {
        const getData =  async () =>{
            // axios.defaults.withCredentials = true;
            const res = await axios.get('https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event/all/cities',  {
                method: 'HEAD',
                mode: 'no-cors',
            });
            setCities(res.data)    
            
        }
       getData()

    }, [])

  return (
    <div className="Home">
        
        <div className=" lg:grid-cols-3 md:grid-cols-2 grid gap-10 m-16">
        <h4> List of Cities </h4>
       { cities.length> 0 && cities.map((city) =>  (
            <div className="max-w-sm bg-darkBackgroud rounded-lg shadow  sm:mb-6 " key={city.id}>
                <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight  hover:text-primary text-white">
                    <Link to={`/home/${city.name}`}>
                    { city.name }
                    </Link>s
                </h5>
            </div>
            </div>
       ))
       }
    </div>


    </div>
  );
}

export default Home;
