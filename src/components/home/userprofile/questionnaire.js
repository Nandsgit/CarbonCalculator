import React, { Component } from 'react';

export default class Questionnaire extends Component {

    render() {
        return (
            <div>
                Hello Username, Lets get started with your questionnaire!
                <form class = "form">
                    <label id= "idFeild"> SurveyID: 
                        <input type ="text" name = "idFeild" placeholder= "ID" required />
                    </label>
                    <label for="birthdaytime">Date of Survey being taken :
                        <input type="datetime-local" id="date" name="datetime"></input>
                    </label>
                    <label id= "numMemFeild"> Members in House
                        <input type ="text" name = "numMemFeild" placeholder= "no. of mem" required />
                    </label>
                    <label id= "ContryFeild"> Country of residence: 
                        <input type ="text" name = "ContryFeild" placeholder= "Contry" required />
                    </label>
                    <label id= "numofCars"> Number of cars Owned
                        <input type ="text" name = "numofCars" placeholder= "numofCars" required />
                    </label>
                    <label id= "numofMilesperday"> Number of miles covered per day by car
                        <input type ="text" name = "numofCars" placeholder= "numofMilesperday" required />
                    </label>
                    <label id= "numofelectriccars"> Number of electric cars owned
                        <input type ="text" name = "numofelectriccars" placeholder= "numberofElectricCars" required />
                    </label>
                    <label id= "numofMilesperdayElectric"> Number of miles covered by electric vechile
                        <input type ="text" name = "numofMilesperdayElectric" placeholder= "numofMilesperdayElectric" required />
                    </label>
                    <label id= "numofMilesMothlyByPlane"> Number of miles covered by air per Month
                        <input type ="text" name = "numofMilesMothlyByPlane" placeholder= "numofMilesMothlyByPlane" required />
                    </label>
                    <label id= "avgIncomeYearly"> Average Income per Year 
                        <input type ="text" name = "avgIncomeYearly" placeholder= "avgIncomeYearly" required />
                    </label>
                    <label id= "avgElectricBillPerMonth"> Average Electricity Bill Per Month 
                        <input type ="text" name = "avgElectricBillPerMonth" placeholder= "avgElectricBillPerMonth" required />
                    </label>
                    <label id= "beefConsumbedPerWeekInLBS"> Average Beef/week/lbs
                        <input type ="text" name = "beefConsumbedPerWeekInLBS" placeholder= "beefConsumbedPerWeekInLBS" required />
                    </label>
                    <label id= "porkConsumbedPerWeekInLBS"> Average Pork/week/lbs
                        <input type ="text" name = "porkConsumbedPerWeekInLBS" placeholder= "porkConsumbedPerWeekInLBS" required />
                    </label>
                    <label id= "poultryConsumbedPerWeekInLBS"> Average Chicken/week/lbs
                        <input type ="text" name = "poultryConsumbedPerWeekInLBS" placeholder= "chickenConsumbedPerWeekInLBS" required />
                    </label>
                    <label id= "vegetablesConsumbedPerWeekInLBS"> Average Vegetables/week/lbs
                        <input type ="text" name = "VegetablesConsumbedPerWeekInLBS" placeholder= "VegetablesConsumbedPerWeekInLBS" required />
                    </label>
                    <label id= "cheeseConsumbedPerWeekInLBS"> Average Cheese/week/lbs
                        <input type ="text" name = "cheeseConsumbedPerWeekInLBS" placeholder= "cheeseConsumbedPerWeekInLBS" required />
                    </label>
                    <label id= "foodwasted"> Average foodwasted/week/lbs
                        <input type ="text" name = "foodwasted" placeholder= "foodwasted/week/lbs" required />
                    </label>
                    <label id= "recycle"> Do you recycle, Y or N?
                        <input type ="text" name = "recycle" placeholder= "recycle" required />
                    </label>
                    <input type="button" value ="sumbit" name = "submit" />
                    <input type="reset"/>
                </form>
            </div>
        )
    }
}    

