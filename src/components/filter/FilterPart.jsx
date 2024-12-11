import "./filterPart.scss"

function FilterPart(){
return(
   <div className="filterPart">
    <h1>Search results for <b>Canada</b></h1>
    <div className="topPart">
        <div className="item">
            <label htmlFor="city">Location</label>
            <input type="text" id="city" name="city" placeholder="Enter city location"></input>
        </div>
    </div>
    <div className="bottomPart">
    <div className="item">
            <label htmlFor="type">Type</label>
            <select name="type" id="type">
                <option value="any">any</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
            </select>
        </div>

        <div className="item">
            <label htmlFor="property">Property</label>
            <select name="property" id="property">
                <option value="any">any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
            </select>
        </div>

        <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input type="number" id="minPrice" name="minPrice" placeholder="any"></input>
        </div>

        <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input type="maxPrice" id="maxPrice" name="maxPrice" placeholder="any"></input>
        </div>

        <div className="item">
            <label htmlFor="city">Bedroom</label>
            <input type="bedroom" id="bedroom" name="bedroom" placeholder="any"></input>
        </div>
        <button>
            <img src="/icons8-search-30.png" alt="searchBtn" />
        </button>
    </div>
   </div>
)
}
export default FilterPart