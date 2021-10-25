import React from 'react';
import defores from '../images/deforestation.jpg';
import indust from '../images/indust.jpg';

function deforestation(){
    return(
        <>
        <div>
            <h1 style={{ color: 'red' }}>  Deforestation, Industrialization, and  Power Plants </h1>
        </div>
        <div>
        <img src={defores} width="1050" height="400" />
        <ColoredLine color="" />
        <li>Among the many gifts forests give us is one we desperately need: <b> help with slowing climate change.</b> Trees capture greenhouse gases (GHGs) 
        like carbon dioxide, preventing them from accumulating in the atmosphere and warming our planet. When we clear forests, we’re not only knocking out our best 
        ally in capturing the staggering amount of GHGs we humans create (which we do primarily by burning fossil fuels at energy facilities, and of course, in cars, 
        planes, and trains). We’re also creating emissions by cutting down trees: when trees are felled, they release into the atmosphere all the carbon they’ve been 
        storing. What the deforesters do with the felled trees—either leaving them to rot on the forest floor or burning them—creates further emissions. All told, 
        deforestation on its own causes about 10 percent of worldwide emissions.
        </li>
        <li>
        There’s no doubt about it: <b> the best thing we can do to fight climate change is keep forests standing. </b> Yet the need to feed a rapidly growing global 
        population—projected to reach 9 billion by 2050—is urgent. That’s why the Rainforest Alliance works with farmers to advance a variety of strategies, such as 
        crop intensification (growing more food on less land), and with traditional forest-dwellers to develop livelihoods that don’t hurt forests or ecosystems.
        We stand more of a chance in this fight with forests standing strong.
        </li>
        </div>
        <ColoredLine color="tomato" />
        <div>
        <img src={indust} width="1050" height="600" />
        <ColoredLine color="" />
        <li>         The world’s accounting system for carbon emissions, run by the United Nations, disregards capital investments in future coal-fired and natural-gas 
            power plants that will commit the world to several decades and billions of tons of greenhouse gas emissions, according to a new study from Princeton University
            and the University of California-Irvine published Aug. 26 in the journal Environmental Research Letters. </li>
        <li> Industrial revolution has marked a landmark achievement in history of technology and it has substantially changed every other aspect of human life and changed the 
            dimensions of modern world. The need to provide employment, livelihood and better life to meet human aspirations have been made easy due to accomplishment of industrial 
            revolution. Simultaneously rise of so many industries led to emission of pollutant gases, hazardous chemicals and industrial activities resulted into deforestation, 
            environmental degradation and pollution. Increasing population and rapid growth of urbanization has shifted its burden on industrial employment as well as more reliance 
            on finished goods of industries in the market has amounted to ferocious increment of so many industries which is one of the  principle reasons responsible for global 
            warming- prime reason for climate change.</li>
        </div>
        </>
    )

}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

export default deforestation
