
// PROFILE GOALS EDIT
function editButton(){

    let id =document.querySelector('#itemID').value;
    let newGoalName = document.querySelector('#newGoalName').value
    let newCurrentWeight = document.querySelector('#newCurrentWeight').value
    let newGoalWeight = document.querySelector('#newGoalWeight').value
    let newStartDate = document.querySelector('#newStartDate').value
    let newEndDate = document.querySelector('#newEndDate').value
    
    let goalBody = {}
    goalBody._id = id ;
    goalBody.goalName = newGoalName;
    goalBody.currentWeight = newCurrentWeight;
    goalBody.goalWeight = newGoalWeight ;
    goalBody.startDate = newStartDate;
    goalBody.endDate = newEndDate;

    fetch("/profileGoals", {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(goalBody)
    })
    .then(res => {
        if(res.ok){
            alert("goal updated")
            return res.json()
        }
    })
    .then(data => {
        window.location.reload(true)
    })
}


// PROFILE GOALS DELETE
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


// PROFILE EXERCISES DELETE
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


// PROFILE EXERCISES COMPLETION TOGGLE
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

$(document).on("click","#update-goal", function(){
    let data = $(this).data('id');
    $(".modal-body #itemID").val(data);

})