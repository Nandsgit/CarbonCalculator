import React from 'react';
import transport from '../images/transportation_data.jpg';

function vehiclesemission(){
    return(
        <>
        <div>
            <h1 style={{ color: 'red' }}>  Carbon Emission by transportation </h1>
            The Transportation sector includes the movement of people and goods by cars, trucks, trains, ships, airplanes, and other vehicles. 
            The majority of greenhouse gas emissions from transportation are carbon dioxide (CO2) emissions resulting from the combustion of petroleum-based products, 
            like gasoline, in internal combustion engines. The largest sources of transportation-related greenhouse gas emissions include passenger cars, medium- and heavy-duty trucks, 
            and light-duty trucks, including sport utility vehicles, pickup trucks, and minivans. These sources account for over half of the emissions from the transportation sector. 
            The remaining greenhouse gas emissions from the transportation sector come from other modes of transportation, including commercial aircraft, ships, boats, and trains, 
            as well as pipelines and lubricants.
        </div>
        <ColoredLine color="blue" />
        <li>
            Relatively small amounts of methane (CH4) and nitrous oxide (N2O) are emitted during fuel combustion. In addition, a small amount of hydrofluorocarbon (HFC) 
            emissions are included in the Transportation sector. These emissions result from the use of mobile air conditioners and refrigerated transport.
        </li> 
        <ColoredLine color="" />
        <h2>2018 U.S. Transportation Sector GHG Emissions by United States Environment Protection Agency </h2>
        <img src={transport} width="1000" height="500" />
        <ColoredLine color="" />
        <div>
        The transportation sector is one of the largest contributors to anthropogenic U.S. greenhouse gas (GHG) emissions. 
        According to the Inventory of U.S. Greenhouse Gas Emissions and Sinks 1990–2018 (the national inventory that the U.S. prepares 
        annually under the United Nations Framework Convention on Climate Change), transportation accounted for the largest portion (28%) of total 
        U.S. GHG emissions in 2018. Cars, trucks, commercial aircraft, and railroads, among other sources, all contribute to transportation end-use sector emissions.
        </div>
        <ColoredLine color="" />
        <h1 style={{ color: 'green' }} > Reducing Emissions from Transportation</h1>
        <li>
            <b> Fuel Switching: </b> Using fuels that emit less CO2 than fuels currently being used. Alternative sources can include biofuels; hydrogen; electricity from renewable sources, 
            such as wind and solar.
        </li> 
        <li>
            <b> Improving Fuel Efficiency: </b> Using advanced technologies, design, and materials to develop more fuel-efficient vehicles.
        </li> 
        <li>
            <b> Improving Operating Practices: </b> Adopting practices that minimize fuel use. Improving driving practices and vehicle maintenance.
        </li> 
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

const element = <h1 style={{ color: 'red' }}>Hello world</h1>


export default vehiclesemission