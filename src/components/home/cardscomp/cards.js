import React from 'react';
import Carditem from './carditem';
import './cards.css';
import CarPic from '../images/carsprint.jpg';
import Energy from '../images/energyprint.jpg';
import Food_print from '../images/foodprint.jpg';
import Climate_change from '../images/climatechange.jpg';

function cards() {
    return (
        <div className ='cards'>
            <h1> So what are the main causes of climate change? </h1>
            <div className = "cards__container">
                <div className="cards__wrapper">
                    <ul className= "cards__items">
                        <Carditem
                        src= {CarPic}
                        text= "Transportation is a major cause of climate change."
                        label =" Car pollution"
                        path='/vehicle_emission'
                        />
                        <Carditem
                        src= {Energy}
                        text= "Energy consumption contributes to climate change. "
                        label =" Car pollution"
                        path='/energy_emission'
                        />
                    </ul>
                    <ul className= "cards__items">
                        <Carditem
                        src= {Food_print}
                        text= "Food consumption, especially meat consumption. "
                        label =" Car pollution"
                        path='/food_emission'
                        />
                        <Carditem
                        src= {Climate_change}
                        text= "Deforestation, Industrialization, and Power  Plants.   "
                        label =" Car pollution"
                        path='/deforestation'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default cards
