import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search,setSearch] = useState('');

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {setCountries(data);setFilteredCountries(data)})
      .catch((err)=> console.error("Error fetching data: ",err));
  }, []);
  useEffect(()=>{
    if(search){
     let filteredList = countries.filter((e)=> e.name.common.toLowerCase().includes(search.toLowerCase()));
     setFilteredCountries(filteredList);
    }else{
      setFilteredCountries(countries);
    }
  },[search])
  return (
    <>
    <div style={{textAlign:"center",background:"#ccc",padding:"15px"}}>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} style={{width:"600px",padding:"5px",borderRadius:"5px"}} placeholder="Select for countries..."/>
    </div>
    <div className="wrapper">
      {filteredCountries.map((country) => (
        <div key={country.cca3} className="card">
          <img className="img" src={country.flags.png} alt={`Flag of ${country.name.common}`} />
          <h2>{country.name.common}</h2>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
