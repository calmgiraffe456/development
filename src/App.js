import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import buildingData from './assets/building-data.json';
import BuildingCard from './components/BuildingCard';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function App() {
  const [totalArea, setTotalArea] = useState(0);
  const [typeCat, setTypeCat] = useState("All");
  const [typeRegion, setTypeRegion] = useState("All");
  const [sortType, setSortType] = useState("Oldest to Newest");
  const [typeFavorites, setTypeFavorites] = useState("All Buildings");
  const [favorites, setFavorites] = useState([]);

  function addToFavorites(name, area) {
    if (favoritesContains(name) == false) {
      const newFavorites = favorites;
      newFavorites.unshift(name);
      setFavorites(newFavorites); 
      setTotalArea(totalArea + area);
    }
  } 
  
  function removeFromFavorites(name, area) { 
    if (favoritesContains(name) == true) {
      const favoriteIndex = favorites.indexOf(name);
      const newFavorites = favorites
      newFavorites.splice(favoriteIndex, 1);
      setFavorites(newFavorites);
      setTotalArea(totalArea - area);
    }
  }

  const favoritesContains = name => {
    for (var i = 0; i < favorites.length; i++) {
      if (favorites[i] === name) {
        return true;
      }
    }
    return false;
  };

  const selectFilterTypeCategory = eventKey => {
    setTypeCat(eventKey);
  };

  const selectFilterTypeRegion = eventKey => {
    setTypeRegion(eventKey);
  };

  const selectFilterTypeFavorites = eventKey => {
    setTypeFavorites(eventKey);
  }

  const matchesFilterTypeCat = item => {
    if (typeCat === "All") {
      return true;
    } else if (typeCat === item.category) {
      return true;
    } else {  
      return false;
    }
  }

  const matchesFilterTypeRegion = item => {
    if (typeRegion === "All") {
      return true;
    } else if (typeRegion === item.region) {
      return true;
    } else {
      return false;
    }
  }

  const matchesFilterTypeFavorites = item => {
    if (typeFavorites === "Favorite Buildings") {
      if (favoritesContains(item.name)) {
        return true;
      } else {
        return false;
      }
    } else { // type is all
      return true;
    }
  }

  const selectSortType = eventKey => {
    setSortType(eventKey);
  };

  const findSortType = () => {
    if (sortType === "Oldest to Newest") {
      return buildingData.sort((a, b) => (a.year > b.year) ? 1 : -1);
    } else if (sortType === "Newest to Oldest") {
      return buildingData.sort((a, b) => (a.year < b.year) ? 1 : -1);
    } else if (sortType === "Smallest to Largest") {
      return buildingData.sort((a, b) => (a.area > b.area) ? 1 : -1);
    } else { // sort typeCat will be largest to smallest
      return buildingData.sort((a, b) => (a.area < b.area) ? 1 : -1);
    }
  };

  const reset = () => {
    setTypeCat("All");
    setTypeRegion("All");
    setSortType("Oldest to Newest");
    setTypeFavorites("All Buildings");
  }

  findSortType();
  const filteredDataCat = buildingData.filter(matchesFilterTypeCat);
  const filteredDataRegion = filteredDataCat.filter(matchesFilterTypeRegion);
  const filteredDataFav = filteredDataRegion.filter(matchesFilterTypeFavorites);
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Brown Building Browser</h1>
      </header>

      <div className='everything'>
        <div className='controls'>
          <h5>Sort:</h5>
          <DropdownButton title={sortType} onSelect={selectSortType} id="dropdown">
            <Dropdown.Item eventKey="Oldest to Newest">Oldest to Newest</Dropdown.Item>
            <Dropdown.Item eventKey="Newest to Oldest">Newest to Oldest</Dropdown.Item>
            <Dropdown.Item eventKey="Smallest to Largest">Smallest to Largest</Dropdown.Item>
            <Dropdown.Item eventKey="Largest to Smallest">Largest to Smallest</Dropdown.Item>
          </DropdownButton>
          <br></br>
          <h5>Building Category:</h5>
          <DropdownButton title={typeCat} onSelect={selectFilterTypeCategory} id="dropdown">
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="Academic">Academic</Dropdown.Item>
            <Dropdown.Item eventKey="Dining Hall">Dining Hall</Dropdown.Item>
            <Dropdown.Item eventKey="Dorm">Dorm</Dropdown.Item>
            <Dropdown.Item eventKey="Library">Library</Dropdown.Item>
          </DropdownButton>
          <br></br>
          <h5>Region of Campus:</h5>
          <DropdownButton title={typeRegion} onSelect={selectFilterTypeRegion} id="dropdown">
            <Dropdown.Item eventKey="All">All</Dropdown.Item>
            <Dropdown.Item eventKey="Main Green">Main Green</Dropdown.Item>
            <Dropdown.Item eventKey="Sciences Quad">Sciences Quad</Dropdown.Item>
            <Dropdown.Item eventKey="Pembroke">Pembroke</Dropdown.Item>
            <Dropdown.Item eventKey="Northwest">Northwest</Dropdown.Item>
            <Dropdown.Item eventKey="Wriston Quad">Wriston Quad</Dropdown.Item>
          </DropdownButton>
          <br></br>
          <h5>View:</h5>
          <DropdownButton title={typeFavorites} onSelect={selectFilterTypeFavorites} id="dropdown">
            <Dropdown.Item eventKey="All Buildings">All</Dropdown.Item>
            <Dropdown.Item eventKey="Favorite Buildings">Favorites</Dropdown.Item>
          </DropdownButton>
          <br></br>
          <button id="reset" onClick={reset}>Reset</button>
          <br></br>
          <h6>Total Area of Favorites: {totalArea}</h6>    
        </div>
        <div className="building-card-container">
          {filteredDataFav.map((item) => (
            <div className='building-with-button'>
              <BuildingCard name={item.name} image={item.image} region={item.region} category={item.category} year={item.year} area={item.area} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} favoritesContains={favoritesContains}></BuildingCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
