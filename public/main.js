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

  function getExercises (muscle){

    fetch("/selection",{
        method: 'get',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
            muscle: muscle
       })
    })
    .then(response => {
        if(response.ok){return response.json()}
    })
    .then(data => {
       let muscles = data
        window.location.reload(true)
    })
  }