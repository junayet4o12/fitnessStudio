import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';

// const options = {
//     method: 'GET',
//     url: 'https://low-carb-recipes.p.rapidapi.com/random',
//     headers: {
//       'X-RapidAPI-Key': '09b5c76cc3mshb8e97972427e2f7p146a2djsnf3c04fee812c',
//       'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
//     }
//   };

const SpecialRecipe = () => {
    const [recipe, setRecipe]= useState([])
    const [newRecipe, setNewRecipe] = useState(true)


        useEffect(()=>{
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(res => res.json())
            .then(data => setRecipe(data.meals))
        },[newRecipe])

        console.log(recipe);


  return (
    <div className='p-[10px] min-h-[100vh] bg-gradient-to-r from-[#000428] to-[#004e92] text-white'>
        <Helmet> 
            <title>Recipe - FitnessStudion</title>
        </Helmet>

        {/* <h1>{recipe[0].strMeal}</h1> */}
      {
      recipe && Object.keys(recipe).length > 0   &&
      (
        <div key={recipe.id} className='flex flex-col gap-8 my-[50px] w-[90vw] mx-auto'>
            <div className='w-full flex flex-col items-center'>
                 <img className='w-full h-[50vh] md:h-[70vh] object-cover rounded-xl' src={recipe[0].strMealThumb} alt={recipe[0].strMeal} />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-xl md:text-3xl font-bold'>{recipe[0].strMeal}</h1>
                <p className='font-[600]'>{recipe[0].strInstructions}</p>
            </div>
          <div className='bg-secondary bg-opacity-60 rounded-lg p-[30px] flex flex-col gap-3'>
            <h1 className='font-[700] text-2xl'>Source:</h1>
            <ol className='ml-[20px] font-[600] list-disc'>
                <li>Origion:    <span className='bmiNumber'>{recipe[0].strArea}</span></li>
                <li>Catagory:    <span className='bmiNumber'>{recipe[0].strCategory}</span></li>
                <li>video: <a target='_blank' href={recipe[0].strYoutube}> click me</a></li>
            </ol>
            </div>
            <div>
              <h1 className='text-xl font-bold'>Ingrediens:</h1>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient1} {recipe[0].strMeasure1}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient2} {recipe[0].strMeasure2}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient3} {recipe[0].strMeasure3}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient4} {recipe[0].strMeasure4}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient5} {recipe[0].strMeasure5}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient6} {recipe[0].strMeasure6}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient7} {recipe[0].strMeasure7}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient8} {recipe[0].strMeasure8}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient9} {recipe[0].strMeasure9}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient10} {recipe[0].strMeasure10}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient11} {recipe[0].strMeasure11}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient12} {recipe[0].strMeasure12}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient13} {recipe[0].strMeasure13}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient14} {recipe[0].strMeasure14}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient15} {recipe[0].strMeasure15}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient16} {recipe[0].strMeasure16}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient17} {recipe[0].strMeasure17}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient18} {recipe[0].strMeasure18}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient19} {recipe[0].strMeasure19}</p>
              <p className='bmiNumber ml-[25px]'>{recipe[0].strIngredient20} {recipe[0].strMeasure20}</p>
            </div>
            <button 
            className='w-full bg-secondary bg-opacity-70 rounded-xl text-xl text-white p-[10px]'
            onClick={()=> setNewRecipe(!newRecipe)}>New Recipe</button>
        </div>
      )
    }
    </div>
  )
}

export default SpecialRecipe
