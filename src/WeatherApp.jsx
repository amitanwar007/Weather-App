import React, { useState, useEffect } from "react";
import './WeatherApp.css'

const WeatherApp = () => {
  const [data, setData] = useState("");
  const [cityname, setCityname] = useState("");
  const [error, setError] = useState();
  const [sendCity, setSendCity] = useState();

  function search() {
    console.log(cityname);
    // ${cityname}
   setSendCity(cityname)
       
  }
  useEffect(() => {
   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=adc94e73ed15beda7a3a75faf02fd394`, (res) => {})
    .then((res) => {
      return res.json();
    })
    .then((Data) => {
        if(Data.cod  !== "400" && Data.cod  !== "404"){

            setData(Data);
            setError("")
        }else{
            setError(Data.message)
            setData("")
        }
     
    })
    .catch((err) => {
        setError(err)
      console.log(err);
    });

     },[sendCity]);

     console.log(data);
 
  return (
    <div>
      <div className="main-container">
        <div className="subcontainer">

          <h1>Weather App</h1>
          <input type="text"  id="search-bar" value={cityname} placeholder="Enter the city Name"  onChange={(event) => {setCityname(event.target.value) }}  />
          <button onClick={search}>Search</button>

          
          
            {data && !error ? (
           <div>
          <p >City: {data.name}</p>
          <p >Current Temp:{data.main.temp}</p>
          <p >
            Temperature Range: {data.main.temp_min}~{data.main.temp_max}°C</p>
          <p>Ground Level: {data.coord.lat}</p>
          <p >Visibility : {data.visibility}mtr</p>
          <p >Humidity: {data.main.humidity}</p>
        </div>
      ) : (
        ""
      )}
      {error && <p>{error}</p>}
         

        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
