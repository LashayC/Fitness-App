
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
document.getElementById('myChart'),
config
);

// GET EXERCISES BY GROUP
async function getExercisesByGroup(muscle){
    const response = await fetch('https://api.api-ninjas.com/v1/exercises?muscle=' + muscle, {
        headers:{ 'x-API-Key' : process.env.API_KEY,},
        contentType: 'application/json'
    })
    const exercises = await response.json();
    console.log(exercises)
}

// GET CALORIES BURNED BY EXERCISE
async function getCaloriesBurned(activity){
    const response = await fetch('https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity, {
        headers:{ 'x-API-Key' : process.env.API_KEY,},
        contentType: 'application/json'
    })
    const calories = await response.json();
    console.log(calories)
}

// Calories BURNED CALCULATOR 
// (MET* weight in kg = calories/hour) 
//  1 LB = 0.453592 kg

//-------- MET VALUES -------------//
    //  Light Weight Training = 3.5
    //  Heavy Weight Training = 5
    //  Vigorous  Weight Training = 6 
    //  Running (7mph)= 11.5
    //  Brisk walking (3.5–4 mph): 5
    //  Strolling at a slow pace: 2.0