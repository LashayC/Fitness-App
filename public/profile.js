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