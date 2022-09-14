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



// edit
function editButton(id){
    fetch("/profile", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            goalID: id,
            currentWeight: currentWeight,
            goalName: goalName,
            startDate: startDate,
            endDate: endDate
        })
    })
    .then(res => {
        if(res.ok){return res.json()}
    })
    .then(data => {
        window.location.reload(true)
    })
}


// delete
function deleteButton(id){


    fetch("/profile", {
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

