import React, { useEffect, useState } from 'react'
import axios from 'axios'

const options = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
    params: {limit: '10'},
    headers: {
      'X-RapidAPI-Key': '09b5c76cc3mshb8e97972427e2f7p146a2djsnf3c04fee812c',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };


const WorkOuts = () => {

    const [exercise, setExercise] = useState([]) 

    useEffect(()=>{
      featchingData()
    },[])
  
    const featchingData = async () => {
    
      try {
        const response = await axios.request(options);
        setExercise(response.data); // Set the state with the parsed response data
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };


  return (
    <div>
      <div className='flex flex-col items-center gap-5 justify-center container my-[100px] mx-auto p-[10px]'>
    { exercise.map((item)=>
    <div key={item.id} className='flex flex-col md:flex-row gap-5 p-[20px] border-2 border-primary w-full rounded-md'>
      <div className='flex flex-col items-center'>
          <a href={item.gifUrl} target='_blank'>
            {/* <img src="./exerciseIcon.gif"/> */}
            <img className='rounded-xl' src={item.gifUrl}/>
          </a>
      </div>
      <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-[600] specialFont'>{item.name}</h1>
        <div className='flex flex-wrap gap-3'>
            <p className='border-2 border-primary rounded-3xl p-[5px] font-[500]'>Target: {item.target}</p>
            <p className='border-2 border-primary rounded-3xl p-[5px] font-[500]'>Body Part: {item.bodyPart}</p>
            <p className='border-2 border-primary rounded-3xl p-[5px] font-[500]'>Equipment: {item.equipment}</p>
        </div>
      <div className='flex flex-col'>
        <p className='text-xl font-[500]'>Secondary Muscles:</p>
          {
            item.secondaryMuscles.map((item, index)=>(<li key={index}>{item}</li>))
          }
      </div>
      <div>
        <p className='text-xl font-[500]'>Instructions:</p>
        {
          item.instructions.map((itme, index)=>(
            <p key={index}>{index+1}) {itme}</p>
          ))
        }
      </div>
      </div>
    </div>
    )}
    </div>
  );
    </div>
  )
}

export default WorkOuts
