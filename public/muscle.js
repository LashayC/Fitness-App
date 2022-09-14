const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const selectedMuscle = urlParam.get('muscle');

document.querySelectorAll(".muscle-groups svg g g[id]").forEach(function (group) {
    // For the hover
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
    // For the click
    group.addEventListener('click', function (el) {
        let id = el.path[1].id.toLowerCase()
        if (!id) id = el.path[2].id.toLowerCase()
        let input = document.getElementById(id)
        if (input.checked){
            input.checked = false
        } 
        else {
            input.checked = true
            submit();
        }
    });
})

 
// Submits Form 
function submit() {
    let form = document.getElementById('muscle-form');
    form.submit(); 
}

// Updates Values in Add New Workout Modal
$(document).on("click","#add-workout-btn", function(){
    let data = $(this).data('id');
    $(".modal-body #exercise").val(data.name);
    $(".modal-body #equipment").val(data.equipment);
    $(".modal-body #image").attr("src", data.image);
    $(".modal-body #imageSrc").val(data.image);
    $(".modal-body #bodypart").val(selectedMuscle);  
})

// SELECTS MUSCLE GROUP ON LOAD
$(document).ready(function(){
    let bodyPart = `#muscle-form input[value=${selectedMuscle}]`;
    $(bodyPart).prop("checked", true);
})