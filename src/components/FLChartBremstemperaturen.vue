<!--Hauptersteller: Tom Bernauer-->

<template>
  <div class="chartBox">
    <canvas id="myChartBrakeSurfaceTemperaturefl"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const data = {
      labels: [],
      datasets: [{
        label: 'Brake Surface Temperature (FL)',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    const config = {
      type: 'line',
      data,
      options: {
        scales: {
          x: {
            type: 'realtime',
            realtime: {
              delay: 2000,
              onRefresh: chart => {
             
                fetch('https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte?type=brakeSurfaceTemperaturefl')
                  .then(response => response.json())
                  .then(apiData => {
                   
                    chart.data.labels.push(new Date().toLocaleTimeString());
                    chart.data.datasets[0].data.push(apiData.messwerte[0].brakeSurfaceTemperaturefl);
                  });
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const myChartBrakeSurfaceTemperaturefl = new Chart(
      document.getElementById('myChartBrakeSurfaceTemperaturefl'),
      config
    );
  }
};
</script>

<style scoped>
 .chartBox {
    width: 450px;
  padding: 10px;
  border-radius: 20px;
  border: solid 3px rgba(255, 99, 132, 1);
  }
</style>
