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

    let newGoalName = prompt("Please enter new goal name")
    let newCurrent = prompt("Please enter new current weight")
    let newGoal = prompt("Please enter new goal weight")
    let newStartDate = prompt("Please enter new start date")
    let newEndDate = prompt("Please enter new end date")

    fetch("/goals", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            _id: id,
            current: newCurrent,
            goal: newGoal,
            start: newStartDate,
            end: newEndDate
        })
    })
    .then(res => {
        if(res.ok){return res.json()}
    })
    .then(data => {
        window.location.reload(true)
    })
}


// goals delete
function deleteButton(id){


    fetch("/goals", {
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

