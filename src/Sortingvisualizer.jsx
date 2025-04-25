import React from 'react'
import './Sortingvisualizer.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {getMergeSortAnimations} from './sortingalgo';
const Sortingvisualizer = () => {

    // Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'white';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const actual = 'green';

    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS ; i++) {
            newArray.push(getRandomArbitrary(5, 430));
        }
        setArray(newArray);
    };
    
    const mergeSort =()=> {
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
      return (
        <>
          <div className='navigation'>
          Sorting Visualizer
          </div>
          <div className='buttons'>
            <button onClick={resetArray}>Generate Array</button>
            <button onClick={mergeSort}>Merge Sort</button>
          </div>
          <div className="array-container">
              {array.map((value, idx) => (
                  <div
                      className="array-bar"
                      key={idx} style={{height:`${value}px`}}></div>
              ))}
          </div>
        </>
          
      )
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
export default Sortingvisualizer