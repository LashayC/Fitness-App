// const labels = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
// ];

// const data = {
//     labels: labels,
//     datasets: [{
//         label: 'My First dataset',
//         backgroundColor: 'rgb(255, 99, 132)',
//         borderColor: 'rgb(255, 99, 132)',
//         data: [0, 10, 5, 2, 20, 30],
//     }]
// };

// const config = {
//     type: 'line',
//     data: data,
//     options: {}
// };

// const myChart = new Chart(
//     document.getElementById('myChart'),
//     config
// );



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

let goalsDiv = document.getElementById('goalsDiv')

// function favoriteBtn(id){
//    let favGoalCard = document.querySelector('#favoriteChecker')
//     console.log('')
//    if(!favGoalCard.classList.contains('favorite')){
//     favGoalCard.classList.add('favorite')
//    }else{
//     favGoalCard.classList.remove('favorite')
//    }

// }


goalsDiv.addEventListener('click', (e) => {
    if(e.target.id === 'favoriteBtn'){
        // let goalCardFav = e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1]
        
        // if(goalCardFav.classList.contains('favorite')){
        //     goalCardFav.classList.remove('favorite')
        // }else{
        //     goalCardFav.classList.add('favorite')

        // }
        
        // console.log('fav div classlist bool',e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].classList)

        if(goalCardFav.classList.contains('true')){
            //fetch sent to PUT false
        }else{
            //fetch sent to PUT true
        }

        fetch("/profileGoalsFavorite", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({})
        })
        .then(res => {
            if(res.ok){return res.json()}
        })
        .then(data => {
            window.location.reload(true)
        })

// When user clicks favorite
//Gets true or false value from db
//Then switches value based on 
    }
})

function completedWorkout(id, complete){

    
    if(complete == 'true'){
        fetch("/profileExerciseIncomplete", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                _id: id,
                completed: false
            })
        })
        .then(res => {
            if(res.ok){return res.json()}
        })
        .then(data => {
            window.location.reload(true)
        })
    }else if(complete == 'false'){
        fetch("/profileExerciseComplete", {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                _id: id,
                completed: true
            })
        })
        .then(res => {
            if(res.ok){return res.json()}
        })
        .then(data => {
            window.location.reload(true)
        })
    }
}
