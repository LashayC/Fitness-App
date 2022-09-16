const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const selectedMuscle = urlParam.get('muscle');

document.querySelectorAll(".muscle-groups svg g g[id]").forEach(function (group) {
    // FOR THE HOVER
    group.addEventListener('mouseover', function (el) {
        let id = el.path[1].id.toLowerCase()
        if (!id) id = el.path[2].id.toLowerCase()
        let label = document.querySelectorAll("label[for=" + id + "]")[0]
        if (label.classList)
            label.classList.add("hover")
        else
            label.className += ' ' + "hover"
    })
    group.addEventListener('mouseout', function (el) {
        let id = el.path[1].id.toLowerCase()
        if (!id) id = el.path[2].id.toLowerCase()
        let label = document.querySelectorAll("label[for=" + id + "]")[0]
        let clss = "hover"
        if (label.classList)
            label.classList.remove(clss)
        else
            label.className = label.className.replace(new RegExp('(^|\\b)' + clss.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    })
    // FOR THE CLICK
    group.addEventListener('click', function (el) {
        let id = el.path[1].id.toLowerCase()
        if (!id) id = el.path[2].id.toLowerCase()
        let input = document.getElementById(id)
        if (input.checked) {
            input.checked = false
        }
        else {
            input.checked = true
            submit();
        }
    });
})


// SUBMITS QUERY TO GET WORKOUT
function submit() {
    let form = document.getElementById('muscle-form');
   form.submit();

}

async function addWorkout(){
    
    let workout =  $(".modal-body #exercise").val();
    let date = document.querySelector('#date').value;
    let equipment = document.querySelector('#equipment').value;
    let bodypart = document.querySelector('#bodypart').value;
    let duration = document.querySelector('#duration').value;
    let intensity = document.querySelector('#intensity').value;
    let liftweight = document.querySelector('#liftweight').value;
    let reps = document.querySelector('#reps').value;
    let image = document.querySelector('#imageSrc').value;

    let data = {};
    data.name = workout;
    data.image = image;
    data.date = date;
    data.equipment = equipment;
    data.bodypart = bodypart;
    data.duration =duration;
    data.intensity =intensity;
    data.liftWeight = liftweight;
    data.reps =reps;

    fetch("/selection", {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(data)
    })
    .then(res => {
        if(res.ok){
            $('#exampleModal').modal('toggle');
            alert("Workout saved to profile", "info")
        }
    })
    .then(data => {
         $('#modal-form').trigger("reset");

    })
}

// UPDATES VALUES IN ADD NEW WORKOUT MODAL
$(document).on("click", "#add-workout-btn", function () {
    let data = $(this).data('id');
    $(".modal-body #exercise").val(data.name);
    $(".modal-body #equipment").val(data.equipment);
    $(".modal-body #image").attr("src", data.image);
    $(".modal-body #imageSrc").val(data.image);
    $(".modal-body #bodypart").val(selectedMuscle);
})

// SELECTS MUSCLE GROUP ON LOAD
$(document).ready(function () {
    let bodyPart = `#muscle-form input[value=${selectedMuscle}]`;
    $(bodyPart).prop("checked", true);
})

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const alert = (message, type) => { 
    const wrapper = document.createElement('div')  
    wrapper.innerHTML = [`<div class="alert alert-${type} 
    alert-dismissible" role="alert">`, `   <div>${message}</div>`, 
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
     '</div>'].join('')  
     alertPlaceholder.append(wrapper) }
     const alertTrigger = document.getElementById('liveAlertBtn')
     if (alertTrigger) { alertTrigger.addEventListener('click', () => { alert('Nice, you triggered this alert message!', 'success') }) 
}

