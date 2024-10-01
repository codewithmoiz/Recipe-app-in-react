import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data }) => {
  return (
    <div className="card">
      <img src={data.strMealThumb} alt={data.strMeal} />
      <h1>{data.strMeal}</h1>
      <h4>Category: <span>{data.strCategory}</span></h4>
      <h4>Area: <span>{data.strArea}</span></h4>
      {/* Pass meal data as state */}
      <Link to="/recipe" state={{ meal: data }}>View Recipe</Link>
    </div>
  );
};

export default Card;
