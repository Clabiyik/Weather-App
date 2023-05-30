import React,{useState} from 'react';
import Wheather from './Wheathertheresult';
import './App.css';

function App() {
  const APP_KEY="67c43177cb6a49ca804105715232905";
  let cityinput=""
  const [wheatherdata,setwheatherdata]=useState([])
  function citytext(){
    document.querySelector("input").addEventListener("input",(e)=>{
      e.preventDefault();
      cityinput=e.target.value;
      console.log(cityinput)
    })
  }
  async function getData(value){
    if (value==="") return;
    const data=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${APP_KEY}&q=${value}&days=3&aqi=no&alerts=no`)
    const result= await data.json();
    setwheatherdata(result.forecast.forecastday)

  }
  return (
    <div>
      <div className="search">
        <input type="text" placeholder='Search a City...' onChange={citytext} />
        <button onClick={()=>getData(cityinput)}>Search</button>
      </div>
     {wheatherdata.map(item=>(<Wheather key={item.date} date={item.date} mintemp={item.day.mintemp_c} maxtemp={item.day.maxtemp_c} condition={item.day.condition.text} icon={item.day.condition.icon}/>))}
    </div>
  );
}

export default App;
