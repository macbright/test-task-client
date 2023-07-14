import React from 'react';


import DisplayEvent from "../displayEventGrid/displayEvent"

function Home() { 
    const url = 'https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event'
  return (
    <div className="Home">
       <DisplayEvent url={url} />
    </div>
  );
}

export default Home;
