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

    let goalBody = {}
    goalBody._id = id || null
    goalBody.goalName = req.body.goalName || null
    goalBody.currentWeight = req.body.currentWeight || null
    goalBody.goalWeight = req.body.goalWeight || null
    goalBody.startDate = req.body.startDate || null
    goalBody.endDate = req.body.endDate || null

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