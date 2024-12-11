import { useState } from "react";
import "./search.scss";

function Search() {
  const [query,setQuery] = useState({
    type:"buy",
    location:"",
    minPrice:0,
    maxPrice:0,
  })

  // not gonna change other properties, only type field would get altered!
  // that's why we used ...operator :)
  const switchType = (val) =>{
  setQuery((prev)=>({ ...prev, type:val}));
  }
  return (
    <div className="search">
      <div className="type">
        <button onClick={()=>switchType("buy")} className={query.type === "buy" ? "active" : ""}>Buy</button>
        <button onClick={()=>switchType("rent")} className={query.type === "rent" ? "active" : ""}>Rent</button>
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
        />
        <button>
          <img src="/icons8-search-30.png" alt="searchIcon" />
        </button>
      </form>
    </div>
  );
}
export default Search;
