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



// goals edit
function editButton(id){

    let newGoalName = document.querySelector('#newGoalName').value
    let newCurrentWeight = document.querySelector('#newCurrentWeight').value
    let newGoalWeight = document.querySelector('#newGoalWeight').value
    let newStartDate = document.querySelector('#newStartDate').value
    let newEndDate = document.querySelector('#newEndDate').value

    let goalBody = {}
    goalBody._id = id || null
    goalBody.goalName = newGoalName || null
    goalBody.currentWeight = newCurrentWeight || null
    goalBody.goalWeight = newGoalWeight || null
    goalBody.startDate = newStartDate || null
    goalBody.endDate = newEndDate || null

    fetch("/profileGoals", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(goalBody)
    })
    .then(res => {
        if(res.ok){return res.json()}
    })
    .then(data => {
        window.location.reload(true)
    })
}


// profile goals delete
function deleteButton(id){


    fetch("/profileExercises", {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            _id: id
        })
    })
    .then(res => {
        if(res.ok){return res.json()}
    })
    .then(data => {
        window.location.reload(true)
    })
}


// profile exercises delete

function deleteBtn(id){


    fetch("/profileGoals", {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            _id: id
        })
    })
    .then(res => {
        if(res.ok){return res.json()}
    })
    .then(data => {
        window.location.reload(true)
    })
}