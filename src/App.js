import React, {useState, useEffect} from 'react'
import "./App.css"

const api = {
  key: "1449899dd8f0daa2add312cccd60f861",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if(!searchCity) return;
      setLoading(true);
      // Process
      try{
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok) {
          // setWeatherInfo(JSON.stringify(data));
          setWeatherInfo(`${data.name}, ${data.sys.country},
          ${data.weather[0].description}, ${data.main.temp}*C`)
        } else {
          setErrorMessage(data.message);
        }
        
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    }
    fetchWeatherData();
  }, [searchCity])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  }

  return (
    
    <div id="container">
      <div id="main">
        <>
        <div id="form-search">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='City' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}></input>
            <button class='btn-search'>Search</button>
          </form>
        </div>
        
        <div class="form-result">
          {loading ? (<div>Loading...</div>) : (
            <>
              {errorMessage ? (<div style={{color: "red"}}>{errorMessage}</div>) : 
              (<div class="weather-info">{weatherInfo}</div>)}
            </>
          )}
        </div>
        
        </>

      </div>
    </div>
      
  )
}

export default App