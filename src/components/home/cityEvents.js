import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayEvent from "../displayEventGrid/displayEvent"


function CityEvent() {
    const { city } = useParams()
    console.log(city)
    const url = `https://stormy-spire-78674-d6e2da41181f.herokuapp.com/event/city/${city}`
    return (
        <div>
            <DisplayEvent url={url} />
        </div>
    )
}

export default CityEvent;
