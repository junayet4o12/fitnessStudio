import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';

const options = {
    method: 'GET',
    url: 'https://low-carb-recipes.p.rapidapi.com/random',
    headers: {
      'X-RapidAPI-Key': '09b5c76cc3mshb8e97972427e2f7p146a2djsnf3c04fee812c',
      'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
    }
  };

const SpecialRecipe = () => {
    const [recipe, setRecipe]= useState({})
    const [newRecipe, setNewRecipe] = useState(true)


        useEffect(()=>{
            axios.request(options)
            .then(response => {
              // Set the state with the retrieved data
              setRecipe(response.data);
              console.log(recipe);
            })
            .catch(error => {
                console.error('Error fetching data from the API:', error);
            });
        },[newRecipe])


  return (
    <div className='p-[10px] min-h-[100vh]'>
        <Helmet> 
            <title>Recipe - FitnessStudion</title>
        </Helmet>
      {
      recipe && Object.keys(recipe).length > 0   &&
      (
        <div key={recipe.id} className='flex flex-col gap-8 my-[50px] w-[90vw] mx-auto'>
            <div className='w-full flex flex-col items-center'>
                 <img className='w-full h-[50vh] md:h-[70vh] object-cover rounded-xl' src={recipe.image} alt={recipe.name} />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-xl md:text-3xl font-bold'>{recipe.name}</h1>
                <p className='font-[600]'>{recipe.description}</p>
            </div>
          <div className='bg-secondary bg-opacity-60 rounded-lg p-[30px] flex flex-col gap-3'>
            <h1 className='font-[700] text-2xl'>Preparation time:</h1>
            <ol className='ml-[20px] font-[600] list-disc'>
                <li>Total:    <span className='bmiNumber'>{recipe.cookTime + recipe.prepareTime} min</span></li>
                <li>Cooktime:    <span className='bmiNumber'>{recipe.cookTime} min</span></li>
                <li>Preparetime: <span className='bmiNumber'>{recipe.prepareTime} min</span></li>
            </ol>
          </div>
            <div className='flex flex-col gap-3'>
                <h1 className='font-[700] text-2xl'>Ingredients</h1>
                <ol className='ml-[20px] font-[600] list-disc'>
                    {recipe.ingredients.map((ingredient, index) => (
                    <li className='bmiNumber' key={index}>
                            {ingredient.name} : {ingredient.servingSize.qty} {ingredient.servingSize.units}
                            </li>
                        ))}
                    </ol>
            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='font-[700] text-2xl'>Instructions</h1>
            <ol className='ml-[20px] gap-3 flex flex-col list-decimal list-inside '>
                {recipe.steps.map((step, index)=>(
                <li  key={index} className='font-[600]'>{step}</li>
                ))}
            </ol>
            </div>
            <div className='flex flex-col gap-6'>
                <h1 className='font-[700] text-2xl'>Nutrician</h1>
                <table className='w-full'>
                   <tr className='border-b-2 border-secondary'>
                    <td className='bmiNumber font-[600]'>calories:</td>
                    <td className='bmiNumber font-[600]'>{recipe.nutrients.caloriesKCal}</td>
                   </tr>
                   <tr className='border-b-2 border-secondary'>
                    <td className='bmiNumber font-[600]'>Fats:</td>
                    <td className='bmiNumber font-[600]'>{recipe.nutrients.fat}</td>
                   </tr>
                   <tr className='border-b-2 border-secondary'>
                    <td className='bmiNumber font-[600]'>Protein:</td>
                    <td className='bmiNumber font-[600]'>{recipe.nutrients.protein}</td>
                    <td className='bmiNumber font-[600]'>{recipe.nutrients.carb}</td>
                   </tr>
                </table>
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
