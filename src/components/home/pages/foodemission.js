import React from 'react';
import foodcons from '../images/foodconsump.jpg';

function foodemission(){
    return(
        <>
        <div>
            <h1 style={{ color: 'red' }}>  Food consumption contibutes to climate change</h1>
            <b> Food is responsible for approximately 26% of global GHG emissions. </b>
           <li>
                <b> Livestock and fisheries account for 31% of food emissions. </b> 
                Livestock – animals raised for meat, dairy, eggs and seafood production – contribute to emissions in several ways. Ruminant livestock – mainly cattle – for 
                example, produce methane through their digestive processes (in a process known as ‘enteric fermentation’). Manure management, pasture management, and fuel 
                consumption from fishing vessels also fall into this category. This 31% of emissions relates to on-farm ‘production’ emissions only: it does not include land 
                use change or supply chain emissions from the production of crops for animal feed: these figures are included separately in the other categories.
            </li> 
            <li>
                <b> Crop production accounts for 27% of food emissions: </b> 
                21% of food’s emissions comes from crop production for direct human consumption, and 6% comes from the production of animal feed. They are the direct 
                emissions which result from agricultural production – this includes elements such as the release of nitrous oxide from the application of fertilizers 
                and manure; methane emissions from rice production; and carbon dioxide from agricultural machinery.
            </li> 
            <li>
                <b> Land use accounts for 24% of food emissions: </b>
                Twice as many emissions result from land use for livestock (16%) as for crops for human consumption (8%).3Agricultural expansion results in the 
                conversion of forests, grasslands and other carbon ‘sinks’ into cropland or pasture resulting in carbon dioxide emissions. ‘Land use’ here is 
                the sum of land use change, savannah burning and organic soil cultivation (plowing and overturning of soils). 
            </li> 
            <li>
                <b> Supply chains account for 18% of food emissions: </b>
                Whilst supply chain emissions may seem high, at 18%, it’s essential for reducing emissions by preventing food waste. Food waste emissions are 
                large: one-quarter of emissions (3.3 billion tonnes of CO2eq) from food production ends up as wastage either from supply chain losses or consumers.
            </li> 
            
        </div>
        <ColoredLine color="blue" />
        <img src={foodcons} width="1050" height="900" />
        <div>
        In the visualization we see GHG emissions from 29 different food products – from beef at the top to nuts at the bottom. For each product you can see from which 
        stage in the supply chain its emissions originate. This extends from land use changes on the left, through to transport and packaging on the right. In this comparison 
        we look at the total GHG emissions per kilogram of food product. CO2 is the most important GHG, but not the only one – agriculture is a large source of the greenhouse 
        gases methane and nitrous oxide. To capture all GHG emissions from food production researchers therefore express them in kilograms of ‘carbon dioxide equivalents’. 
        This metric takes account not just CO2 but all greenhouse gases.
        </div>
        <ColoredLine color="" />
        <div style={{ height: '10%' }}>
            <h1 style={{ color: 'green' }}>  <b>  Tips for Reducing Your Food Footprint </b></h1>
            <ol>
                <li><b> Stop wasting food </b>  Food waste is a major contributor to greenhouse gas emissions. That’s because food that’s thrown away decomposes in landfills 
                and emits methane, a particularly potent greenhouse gas</li>
                <li><b> Ditch the plastic </b>  Using less plastic is an important part of transitioning to an environmentally friendly lifestyle. Plastic wrapping, plastic bags, 
                and plastic storage containers are commonly used by consumers and the food industry alike to pack, ship, store, and transport food. </li>
                <li><b> Eat less meat</b>  Research shows that reducing your meat intake is one of the best ways to lower your carbon footprint. This is because the emissions 
                from livestock production — especially beef and dairy cattle — represent 14.5% of the globe’s human-induced greenhouse gas emissions </li>
                <li><b> Try plant-based protein </b>  Eating more plant-based protein can dramatically cut your greenhouse gas emissions. For reference, a serving of meat 
                is around 3 ounces (85 grams). If you regularly eat more than that each day, try swapping in more plant-based proteins, such as beans, tofu, nuts, and seeds.</li>
                <li><b>  Cut back on dairy </b>  Cutting back on dairy products, including milk and cheese, is another way to reduce your carbon footprint. In fact, because 
                cheese takes so much milk to produce, it’s associated with greater greenhouse gas emissions than animal products like pork, eggs, and chicken (20Trusted Source). 
                To get started, try eating less cheese and replacing dairy milk with plant-based alternatives like almond or soy milk. </li>
                <li><b> Don’t eat excess calories </b> Eating more calories than your body needs may promote weight gain and related illnesses. What’s more, it’s linked 
                to higher greenhouse gas emissions. Your calorie needs depend on your height, age, and activity level. If you’re unsure whether you’re consuming too many 
                calories, consult a dietitian or healthcare professional. </li>
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

export default foodemission