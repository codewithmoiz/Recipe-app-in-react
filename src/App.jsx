import React, { useState, useEffect } from 'react';
import Card from './Components/Card';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipe from './Pages/Recipe';

const App = () => {
  const [foodData, setFoodData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('chicken');

  useEffect(() => {
    if (searchTerm) {
      async function getFood(food) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const res = await response.json();
          console.log(res.meals[1]);
          
          setFoodData(res.meals);  // Set meals data
        } catch (error) {
          console.error("Error fetching food data:", error.message);
        }
      }

      getFood(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Router>
      <Routes>
        {/* Route for the root path */}
        <Route path="/" element={
          <div id="main">
            <div className="header">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search a meal"
                  value={searchTerm}
                  onChange={handleInputChange}
                  required
                />
              </form>
            </div>
            <div className="cards-container">
              {foodData ? (
                foodData.map((meal, index) => (
                  <Card key={index} data={meal} />
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        } />
        
        {/* Route for the recipe page */}
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  );
};

export default App;
