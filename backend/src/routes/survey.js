const router = require('express').Router();

require('dotenv').config();

const { Mongoose } = require('mongoose');
let Result = require('../models/survey.model');

function calculateFootprint(survey_result){
  var co2 = 0;
  var family_size = 1;
  var diff = 0;
  var question_co2_vals= {
                          "Q1":0,
                          "Q2":0,
                          "Q3":0,
                          "Q4":0,
                          "Q5":0,
                          "Q6":0,
                          "Q7":0,
                          "Q8":0,
                          "Q9":0,
                          "Q10":0,
                          "Q11":0,
                          "Q12":0,
                          "Q13":0,
                          "Q14":0,
                          "Q15":0,
                          "Q16":0
  }

  for(question in survey_result){
    console.log(question);
    console.log(survey_result[question]);
    switch (question){
      case "Q1": //country
        break;
      case "Q2": //family size
        family_size = survey_result[question];
        break;
      case "Q3": // num gas cars
        const gas_cars = survey_result[question];
        break;
      case "Q4": // num miles for gas cars: miles * avg co2 per mile * 52 weeks
		diff = survey_result[question] * 404 * 52;
        co2 += diff;
		    question_co2_vals["Q4"] = diff;
        break;

      case "Q5": // num electric cars
        const electric_cars = survey_result[question];
        break;
      case "Q6": // num miles for electric cars: miles * avg co2 per mile * 52 weeks
		diff = survey_result[question] * 89 * 52;
        co2 += diff;
		    question_co2_vals["Q6"] = diff;
        break;
      case "Q7": // num miles for public transit: miles * grams of co2 per mile / avg num passengers
		diff = survey_result[question] * 204 / 20;
        co2 += diff;
		    question_co2_vals["Q7"] = diff;
        break;
      case "Q8": // num miles for flight: miles * grams of co2 per mile / avg num passengers
		diff = survey_result[question] * 24040 / 130;
        co2 += diff;
        question_co2_vals["Q8"] = diff;
        break;
      case "Q9": // electric bill: bill / price per kWh * grams of co2 per kWh * 12 months / family size 
		diff = survey_result[question] / 0.1319 * 417 * 12 / family_size;
        co2 += diff;
		    question_co2_vals["Q9"] = diff;
        break;
      case "Q10": // gas bill: bill / price per cubic foot/ * grams of co2 per cubic foot * 12 months / family size
		diff = survey_result[question] / 0.92 * 454 * 12 / family_size;
        co2 += diff;
		    question_co2_vals["Q10"] = diff;
        break;
      case "Q11": // lb beef: pounds of beef * fraction to make it kg * 27 kg of co2 per pound * 12 months* 1000 to make it grams / family size
		diff = survey_result[question] * 0.454 * 27 * 12 * 1000 / family_size;
        co2 += diff;
	      question_co2_vals["Q11"] = diff;
        break;
      case "Q12": // lb pork: pounds of pork * fraction to make it kg * 12.1 kg of co2 per pound * 12 months* 1000 to make it grams / family size
		diff = survey_result[question] * 0.454 * 12.1 * 12 * 1000 / family_size;
        co2 += diff;
		    question_co2_vals["Q12"] = diff;
        break;
      case "Q13": // lb poultry:  pounds of poultry * fraction to make it kg * 6.9 kg of co2 per pound * 12 months* 1000 to make it grams / family size
		diff =survey_result[question] * 0.454 * 6.9 * 12 * 1000 / family_size;
        co2 += diff;
		    question_co2_vals["Q13"] = diff;
        break;
      case "Q14": // lb lamb:  pounds of lamb * fraction to make it kg * 6.9 kg of co2 per pound * 12 months* 1000 to make it grams / family size
		diff = survey_result[question] * 0.454 * 39.2 * 12 * 1000 / family_size;
        co2 += diff;
		    question_co2_vals["Q14"] = diff;
        break;
      case "Q15": // lb seafood:  pounds of seafood * fraction to make it kg * 11.9 kg of co2 per pound * 12 months* 1000 to make it grams / family size
		diff = survey_result[question] * 0.454 * 11.9 * 12 * 1000 / family_size;
        co2 += diff;
		    question_co2_vals["Q15"] = diff;
        break;
      case "Q16": // recycle: average co2 saved by recycling plastic (most recycled material)
		diff = 35560;
        if (survey_result[question]){
          co2 -= diff;
		      question_co2_vals["Q16"] = 0;
        }else{
          question_co2_vals["Q16"] = diff;
        }
        break;
    }
  }
  console.log("what the heck!");
  co2 = Math.round(((co2/ 1000 / 1000)*1000 + Number.EPSILON))/1000; //returning in metric tons with 3 decimal places
  console.log(co2);
  console.log(question_co2_vals);
  return [co2,JSON.parse(JSON.stringify(question_co2_vals))]; 
}

router.route('/result').post((req, res) => {
    const username = req.body.username;
    const form = req.body.form;
    const co2 = calculateFootprint(form)[0];
    const form_vals = calculateFootprint(form)[1];
  const newForm = new Result({
    "username": username,
    "form": form,
    "form_vals": form_vals,
    "co2": co2
  });

  newForm.save(function(err, result){
                   if(err) {
                      response = { error: true, message: "Error adding data" };
                   } else {
                      response = { error: false, message: "Data added", id: result._id };
                      res.status(200).send(result);

                  }
              });
  
});

router.route('/fetchAllSurveys').post((req, res) => {
    const username = req.body.username;
    console.log(username);
    Result.find({ "username": username }, {"_id": 1, "co2": 1, "createdAt": 1})
        .sort({'createdAt': 'descending'})
        .then(result => {
            res.status(200).send(result);
            console.log(result);
        })
        .catch(err => {
            res.status(501).send();
            console.log(err);
        });
})

router.route('/global/fetchAllSurveys').post((req, res) => {
    Result.find({}, {"_id": 1, "co2": 1, "createdAt": 1, "username": 1})
        .sort({'createdAt': 'descending'}).limit(100)
        .then(result => {
            res.status(200).send(result);
            console.log(result);
        })
        .catch(err => {
            res.status(501).send();
            console.log(err);
        });
})

router.route('/fetchID').get((req, res) => {
    const id = req.query.id;
    console.log(id);
    Result.findById(id)
        .then(result => {
            if(result === null) {
                res.status(404).send();
            } else {
                res.status(200).send(result);
                console.log(result);
            }
        })
        .catch(err => {
            res.status(500).send();
            console.log(err);
        })
})

router.route('/calculateRecommendations').get((req, res) => {
    const id = req.query.id;
    console.log(id);
    Result.findById(id)
        .then(result => {
            if(result === null) {
                res.status(404).send();
            } else {
                // grab all calculated co2 emissions data
                let co2_breakdown = result.form_vals;
                let array = [];
                for(let i in co2_breakdown)
                {
                    array.push([co2_breakdown[i], i]);
                }
                // sort from greatest to least
                array = array.sort((a, b) => {
                    return b[0] - a[0];
                });
                console.table(array);
                // generate recommendations for top three
                let recommendedQuestions = [];
                const recommendationArray = [];
                recommendationArray[0] = "No Recommendation Available.";
                recommendationArray[1] = "Ahh, food unfortunately accounts for about 26% of global emissions. Here's a couple things to try out: " +
                    "1. Stop throwing away food. 2. Eat less meat and/or try plant-based protein. 3. Try to eat the calories needed and nothing more. Too much calories can lead" +
                    " to various health problems. Please consult a dietitian or healthcare professional to figure this one out."
                recommendationArray[2] = "We strongly recommend doing the 3 Rs: reduce, reuse, recycle. Yes, that used Amazon Shipping Box that is lying around is good " +
                    "enough to be reused as a mini storage container. By doing the 3 Rs, we can significantly cut back on carbon emissions.";
                recommendationArray[3] = "Energy bills.. We hope that they are not too expensive. There are things to try: " +
                    "1. Consider getting solar panels on the roof. It helps lower the cost of the electric bill. " +
                    "2. Consider these heating/cooling tips: Keep the thermostat at a reasonable temperature and use the windows " +
                    "more often, have a licensed contractor inspect home heating/cooling system, and if the house is really old, " +
                    "consider having a licensed contractor look at the home's insulation material. Heating and cooling in a home " +
                    "accounts for nearly half of the energy bill so by maintaining the heating/cooling aspects of the house, you can" +
                    "save quite a lot of money on the energy bill."
                let i = 0;
                while(i < 3) {
                    let recommendation = '';
                    switch(array[i][1]) {
                        case "Q1":
                            recommendation = recommendationArray[0];
                            break;
                        case "Q2":
                            recommendation = recommendationArray[0];
                            break;
                        case "Q3":
                            recommendation = recommendationArray[0] + " Just asking how many gasoline powered cars you have.";
                            break;
                        case "Q4":
                            recommendation = "We suggest trying to take public transportation or carpool more often, or if the car is used a lot, consider getting a hybrid or electric car. It would save money on gas." +
                                "If getting an electric or hybrid vehicle is too expensive, try some of these tips: " +
                                "maintaining proper tire pressure, maintaining air filters, consider keeping the A/C off and the windows down when driving, " +
                                "try to not idle with the engine on when waiting for someone in the parking lot, and/or try to consider not being aggressive on the gas and brake pedals. " +
                                "The last two tips will help save money and keep the car running smoothly. Also, who doesn't want to save money.";
                            break;
                        case "Q5":
                            recommendation = recommendationArray[0] + " Just asking how many electric cars you have.";
                            break;
                        case "Q6":
                            recommendation = "Just keep using and provide proper maintenance on your hybrid/electric vehicle to keep it operating smoothly. Tips include: " +
                                "maintaining proper tire pressure, maintaining air filters, consider keeping the A/C off and the windows down when driving, " +
                                "try to not idle with the engine on when waiting for someone in the parking lot, and/or try to consider not being aggressive on the gas and brake pedals." +
                                "The last two tips will help save money and keep the car running smoothly. Also, who doesn't want to save money.";
                            break;
                        case "Q7":
                            recommendation = "Just keep using public transportation.";
                            break;
                        case "Q8":
                            recommendation = "We suggest to keep flying to a minimum like family vacations or necessary business trips";
                            break;
                        case "Q9":
                            recommendation = recommendationArray[3];
                            break;
                        case "Q10":
                            recommendation = recommendationArray[3];
                            break;
                        case "Q11":
                            recommendation = recommendationArray[1];
                            break;
                        case "Q12":
                            recommendation = recommendationArray[1];
                            break;
                        case "Q13":
                            recommendation = recommendationArray[1];
                            break;
                        case "Q14":
                            recommendation = recommendationArray[1];
                            break;
                        case "Q15":
                            recommendation = recommendationArray[1];
                            break;
                        case "Q16":
                            recommendation = recommendationArray[2];
                            break;
                        default:
                            recommendation = "Please notify WebMaster through Feedback that you see this message at the survey recommendations section."
                            break;
                    }
                    recommendedQuestions.push([array[i][1], recommendation]);
                    i++;
                }
                console.table(recommendedQuestions);
                // bonus -> check Q16 is not the list but is not zero
                i = 0;
                let foundQ16 = false;
                // check if Q16 is not already in recommendation
                console.log("Searching recommendations for Q16");
                while(i < 3) {
                    if("Q16" === recommendedQuestions[i][0]) {
                        foundQ16 = true;
                    }
                    i++;
                }
                // otherwise search the whole sorted array
                console.log("Searching whole survey for Q16")
                i = 0;
                while(i < 16 && !foundQ16) {
                    if("Q16" === array[i][1]) {
                        foundQ16 = true;
                        if(array[i][0] !== 0) {
                            recommendedQuestions.push([array[i][1], recommendationArray[2]])
                        }
                    }
                    i++;
                }
                res.status(200).send(recommendedQuestions);
            }
        })
        .catch(err => {
            res.status(500).send();
            console.log(err);
        })
})

module.exports = router;
