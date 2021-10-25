import React from 'react';
import energycons from '../images/energycons.jpg';
import incomechart from '../images/income_Co2.jpg';

function energyemission(){
    return(
        <>
        <div>
            <h1 style={{ color: 'red' }}>  Carbon Emission by Households</h1>
            <b> Residential energy use accounts for roughly 20% of greenhouse gas (GHG) emissions in the United States.</b>
        </div>
        <div>
        Results from the 2015 Residential Energy Consumption Survey (RECS) introduced estimates of energy consumption for an expanded list of energy end uses.
        For electricity, the number of end uses estimated has expanded from 4 to 26 by adding estimates for equipment such as dishwashers, clothes washers, 
        clothes dryers, televisions, and lighting.
        <img src={energycons} width="850" height="500" />
        </div>
        <ColoredLine color="" />
        <div>
        <h1 style={{ color: 'red' }}>  Household carbon footprint, by income level</h1>
        <b> The more money a household has, the more average tons of carbon dioxide equivalent it emites per year. </b>
        <img src={incomechart} width="850" height="500" />
        <ColoredLine color="" />
        The average carbon footprint of the wealthiest households is over five times that of the poorest. Note that the average carbon footprint of the poorest 
        households (less than $5000 annual income) is higher than that of households with $5000–$9999 annual income. This is because the large number of households 
        with annual income lower than $5000 are college students whose expenditures are higher than those of households with annual income between $5000 and $9999. 
        Specifically, expenditures on education in households with less than $5000 annual income are more than twice as much as those for households with annual income between $5000 and $9999.
        </div>
        <div>
        <ColoredLine color="black" />
        <h1 style={{ color: 'green' }}> Tips for Reducing Household Footprint</h1>
        <ol>
            <li><b> Use Solar technology: </b>
            Installing and maintaining solar technology in residential homes used to be expensive. In recent years, however, it’s become more affordable and accessible, 
            particularly in the US. Solar panels provide energy directly to the home, reducing a homeowner’s need to rely on utility companies for power. Solar power, 
            in other words, is good for both the planet and your wallet.
            </li>
            <li> <b>  Heat and cool smartly: </b>
            Heating and cooling accounts for almost half your energy bill—about $1,000 a year! There is a lot you can do to drive down this cost. Simple steps like changing 
            air filters regularly, properly using a programmable thermostat, and having your heating and cooling equipment maintained annually by a licensed contractor can 
            save energy and increase comfort while helping to protect the environment. Depending on where you live, you can cut your annual energy bill by more than $200 by
            replacing your old heating and cooling equipment with ENERGY STAR–qualified equipment.
            </li>
            <li> <b> Reduce, reuse, recycle: </b>
            Reducing, reusing, and recycling in your home helps conserve energy and reduces pollution and greenhouse gas emissions from resource extraction, manufacturing, 
            and disposal. Also, composting your food and yard waste reduces the amount of garbage that you send to landfills and reduces greenhouse gas emissions. 
            </li>
            <li> <b> Use water efficiently:  </b>
            It takes lots of energy to pump, treat, and heat water, so saving water reduces greenhouse gas emissions. Saving water around the home is simple. Three percent 
            of the nation's energy is used to pump and treat water, so conserving water conserves energy that reduces greenhouse gas pollution. Reduce the amount of waste 
            you generate and the water you consume whenever possible. Pursue simple water-saving actions, such as not letting the water run while shaving or brushing teeth, 
            and save money while conserving water by using products with the WaterSense label.
            </li>
        </ol>
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

export default energyemission