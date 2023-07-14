import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CityCard from './cityCard';
import DisplayEventGrid from "../displayEventGrid/displayEvent"

function City() {

    const url = 'https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event'
    
  return (
    <div>
        <DisplayEventGrid url={url} />
    </div>
  )
}

export default City;
