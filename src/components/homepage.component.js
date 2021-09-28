import React from 'react';
import vid from "./home/videos/video-1.mp4";
import Cards from './home/cardscomp/cards.js';
import './home/button/button.css';
import './home/homedesign.css';


function homepage() {
    return (
        <>
         <div className = "home-container">
            <video src= {vid} autoPlay loop muted />
            <h2> There is no other habitable planet for life! </h2>
            <p> What are you waiting for? </p>
            <div className ="home-btns">
                <button className='get-btns btn--outline btn--large' onClick={() => window.location = "user/sign_up/"} >
                GET STARTED
                </button>
                <button className='survey-btns btn--primary btn--large' onClick={() => window.location = "/form"}>
                Take the survey!!
                </button>
            </div>
        </div>
        <div className = "cards-container">
            <h2> </h2>
            <Cards/>
                
            </div>
            Lets take a step forward
        </>
    )
}

export default homepage
