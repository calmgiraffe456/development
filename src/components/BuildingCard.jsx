export default function BuildingCard(props) {

    function correctText() {
        if (props.favoritesContains(props.name)) {
           return "Remove from Favorites";
        } else {
            return "Favorite";
        }
    }

    function handleClick() {
        if (correctText() === "Favorite") {
            props.addToFavorites(props.name, props.area);
        } else {
            props.removeFromFavorites(props.name, props.area);
        }
    }

    return (
        <div>
            <h3>{props.name}</h3>
            <img src={props.image}></img>
            <div className="building-text">
                <p>Campus Region: {props.region}</p>
                <p>{props.category}</p>
                <p>Constructed in {props.year}</p>
                <p>Area: {props.area} ft<sup>2</sup></p>
                <button onClick={() => handleClick()} id="favorite-button"> {correctText()}</button> 
            </div>
        </div>
    );
}