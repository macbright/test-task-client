import { Routes, Router, Route, Link } from "react-router-dom";

import City from "./components/city/city";
import Home from "./components/home/home";
import Event from "./components/event/event";
import CityEvent from "./components/home/cityEvents";
import Site from "./components/site/site";


function App() {
  return (
    <div className="App">
     
      <nav className=" my-20 mx-40 text-center bg-background p-4  md:w-4/6 text-white  font-bold"> 
        <Link to="/home" className="mx-10 hover:text-primary"> Home</Link>
        <Link to="/city" className="mx-10 hover:text-primary"> City</Link>
        <Link to="/site" className="mx-10 hover:text-primary"> Site</Link>
        {/* <Link to="/event" className="mx-10 hover:text-primary"> Even </Link> */}
      </nav>
     <Routes path="/" element="Home">
        {/* <Route index element={<Home />} /> */}
        <Route path="/event/:id" element={<Event />} />
        <Route path="/city" element={<City />} />
        <Route path="/home" element={<Home />} />
        <Route path="/site" element={<Site />} />
        <Route path="/home/:city" element={<CityEvent />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* <Route path="*" element={<NoMatch />} /> */}
      
      </Routes>

    </div>
  );
}

export default App;
