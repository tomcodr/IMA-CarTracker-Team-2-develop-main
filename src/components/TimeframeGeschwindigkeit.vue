<!--Hauptersteller: Tom Bernauer-->

<template>
  <div class="chartBox">
    <div class="chartContainer">
      <canvas ref="myChart"></canvas>
    </div>
    <div class="legendContainer">
      <div class="legendItem">
        <div class="legendColor"></div>
        <i class="bx bx-bar-chart"></i> Durchschnitt: {{ durchschnittWert.toFixed(3) }}
      </div>
      <div class="legendItem">
        <div class="legendColor"></div>
        <i class="bx bx-arrow-from-bottom"></i>  Minimum: {{ minimumWert.toFixed(3) }}
      </div>
      <div class="legendItem">
        <div class="legendColor"></div>
        <i class="bx bx-arrow-from-top"></i> Maximum: {{ maximumWert.toFixed(3) }}
      </div>
    </div>
    <div v-if="isLoading" class="spinner"></div>

    <label for="datetimeStart">Startzeit:</label>
    <input class="datePicker" @input="debouncedFilter" type="datetime-local" id="datetimeStart" v-model="datetimeStart" step="1">
    <label for="datetimeEnd">Endzeit:</label>
    <input class="datePicker" @input="debouncedFilter" type="datetime-local" id="datetimeEnd" v-model="datetimeEnd" step="1">
    <button class="updateButton" @click="updateChart">Aktualisieren</button>
    <button class="resetButton" @click="resetZoom"><i class='bx bx-reset' style="font-size: 24px;"></i></button>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce';

export default {
  data() {
    return {
      isLoading: false,
      datetimeStart: '2024-01-09T16:48:50',
      datetimeEnd: '2024-01-10T16:48:50',
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Speed Values',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      durchschnittWert: 0,
      minimumWert: 0,
      maximumWert: 0,
    };
  },
  methods: {
    async fetchData() {
  this.isLoading = true;

  const apiEndpoint = 'https://cartrackerapi.onrender.com/api/v1/fahrzeuge/67c012ef-39f7-48c1-8d7a-092fcad45c08/messwerte';
  const queryParams = `von=${encodeURIComponent(this.datetimeStart)}&bis=${encodeURIComponent(this.datetimeEnd)}&type=airflowspeed`;
  const url = `${apiEndpoint}?${queryParams}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.message === "Data not found") {
      console.warn("No data found for the specified date range.");
      return;
    }

           this.chartData.labels = data.messwerte.map(entry => {

  const date = new Date(entry.timestamp);


  const hours = date.getHours();
  const minutes = date.getMinutes();


  const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return formattedTime;
});

this.chartData.datasets[0].data = data.messwerte.map(entry => entry.airflowspeed);

    const durchschnitt = data.durchschnitte[0];
    this.durchschnittWert = durchschnitt.airflowspeed_durchschnitt;
    this.minimumWert = durchschnitt.airflowspeed_minimum;
    this.maximumWert = durchschnitt.airflowspeed_maximum;

    this.myChart.data = this.chartData;
    this.myChart.update();
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    this.isLoading = false;
    
  }


    },
    filterData() {
      this.fetchData();
    },
    updateChart() {
      this.fetchData();
    },
    resetZoom() {
      this.myChart.resetZoom();
    },
  },
  mounted() {
  this.myChart = new Chart(this.$refs.myChart, {
    type: 'line',
    data: this.chartData,
    options: {
      scales: {
        
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
            threshold: 10,
          },
          zoom: {
            mode: 'x',
            wheel: {
              enabled: true
            },
            drag: {
              enabled: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              threshold: 100
            },
            pinch: {
              enabled: true,
            },
          }
        },
      },
    },
  });


  this.fetchData();
},

  computed: {
    debouncedFilter: _debounce(function () {
      this.filterData();
    }, 500),
  },
};
</script>

  
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins' sans-serif;
}

.legendContainer {
  display: flex; 
}

.legendItem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
  color: #fff;
}

.chartBox {
  width: 700px;
  padding: 20px;
  border-radius: 20px;
  border: solid 3px rgba(75, 192, 192, 1);
}

.datePicker,
.updateButton,
.resetButton {
  height: 32px;
  font-size: 12px;
  display: inline-block;
  vertical-align: middle;
}

.datePicker {
  border: 1px solid rgba(75, 192, 192, 1);
  border-radius: 4px;
  background-color: rgba(75, 192, 192, 1);
  color: #fff;
  margin-right: 40px; 
  margin-left: -60px; 
}

input {
  color-scheme: dark;
}


.updateButton,
.resetButton {
  background-color: rgba(75, 192, 192, 1); 
  border: none;
  color: #fff;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-left: 50px;
}

.spinner {
  border: 4px solid rgba(54, 162, 235, 0.1);
  border-top: 4px solid rgba(75, 192, 192, 1);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 80%;
  left: 85%;
  margin-top: -15px;
  margin-left: -15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>