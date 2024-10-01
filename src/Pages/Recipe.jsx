import React from 'react';
import { useLocation } from 'react-router-dom';

const Recipe = () => {
  const location = useLocation();
  const { meal } = location.state || {};  // Retrieve the meal data from state

  // Extract ingredients and measurements from the meal object
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div>
      {meal ? (
        <div className='recipe-main'>
          <div className="recipe-banner">
            <div className="banner-content">
            <h1>{meal.strMeal}</h1>
          <h4 className='recipe-meta'>{meal.strCategory}, {meal.strArea}</h4>
            </div>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
          

          {/* Display ingredients */}
          <h4 className='ingredient'>Ingredients:</h4>
          <ul className='ingredients'>
            {getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

            <h4 className="recipe">Recipe</h4>
            <p className='recipe-content'>{meal.strInstructions}</p>
            <a className='video' href={meal.strYoutube} target='_blank'>Watch Video</a>

        </div>
      ) : (
        <p>No meal data available</p>
      )}
    </div>
  );
};

export default Recipe;
