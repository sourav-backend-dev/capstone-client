import FilterPart from "../../components/filter/FilterPart";
import { listData } from "../../lib/dummy";

import "./listingPage.scss";
import Card from "../../components/card/card";
import Map from "../../components/map/Map";

function ListingPage() {
  const data = listData;

  return (
    <div className="listingPage">
      <div className="listContainer">
        <div className="wrapper">
          <FilterPart />
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListingPage;
