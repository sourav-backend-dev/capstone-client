import "./card.scss";
import { Link } from "react-router-dom";
function Card({ item }){
    
return(
    <div className="card">
        <div className="imgContainer">
            <img src={item.img} alt="property's photo" />
        </div>
        <div className="txtContainer">
            {/* <h2 className="title">
            <Link to={`/${item.id}`}> {item.title} </Link>
            </h2> */}
            <a className="title" href="">
            <h2>
                {item.title}
            </h2>
            </a>
           
          <p className="address">
           <span>{item.address}</span>
          </p>
          <p className="price">${item.price}</p>
          <div className="bottom">
            <div className="features">
                <div className="feature">
                <span>{item.bathroom} bathroom</span>
                </div>
                <div className="feature">
                <span>{item.bedroom} bedroom</span>
                </div>
            </div>
          </div>
        </div>
    </div>
)
}
export default Card;